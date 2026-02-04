import { Worker } from 'bullmq';
import { redis } from '@/configs/redis.config';
import { workerErrorHandler } from '@/middlewares/worker.error.handler.middleware';
import { BATCH_STATUS, CHUNK_STATUS } from '@/constants/enum.constant';
import { bulkUpsertImportFeeds } from '@/services/import.feeds/import.feed.service';
import {
  getBatchKey,
  getChunkKey,
  getChunkMetaKey,
  getFailedChunkKey,
} from './utils/helpers';
import { upsertImportFeedLogs } from '@/services/logs/feed.import.log.service';
import { ImportFeedLogType } from '@/types/models/import.feed.log.model';
import { broadcast } from '@/socket/emitter';

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const QUEUE_NAME = 'db-processor';
const CHUNK_TTL_SECONDS = 60 * 60; // 1 hour

/* -------------------------------------------------------------------------- */
/*                               HELPER METHODS                               */
/* -------------------------------------------------------------------------- */

/**
 * Get all chunk numbers from Redis
 */
async function getChunkNumbers(batchId: string): Promise<number[]> {
  const meta = await redis.hgetall(getChunkMetaKey(batchId));

  return Object.keys(meta)
    .filter((k) => k.endsWith(':status'))
    .map((k) => Number(k.split(':')[1]))
    .sort((a, b) => a - b);
}

/**
 * Read jobs from a chunk
 */
async function readChunkData(batchId: string, chunkNo: number) {
  const raw = await redis.lrange(getChunkKey(batchId, chunkNo), 0, -1);

  return raw.map((item) => JSON.parse(item)).flat();
}

/**
 * Update chunk status in Redis
 */
async function updateChunkStatus(
  batchId: string,
  chunkNo: number,
  data: Record<string, string>,
) {
  const metaKey = getChunkMetaKey(batchId);
  const chunkKey = getChunkKey(batchId, chunkNo);

  await redis
    .multi()
    .hset(metaKey, {
      [`chunk:${chunkNo}:status`]: data.status,
      [`chunk:${chunkNo}:inserted`]: data.inserted || '0',
      [`chunk:${chunkNo}:updated`]: data.updated || '0',
      [`chunk:${chunkNo}:failed`]: data.failed || '0',
      [`chunk:${chunkNo}:completedAt`]:
        data.completedAt || Date.now().toString(),
    })
    .expire(metaKey, CHUNK_TTL_SECONDS)
    .expire(chunkKey, CHUNK_TTL_SECONDS)
    .exec();
}

/**
 * Save failed records for retry
 */
async function saveFailedRecords(
  batchId: string,
  chunkNo: number,
  records: unknown[],
) {
  if (!records.length) return;

  await redis.rpush(
    getFailedChunkKey(batchId, chunkNo),
    ...records.map((r) => JSON.stringify(r)),
  );

  await redis.expire(getFailedChunkKey(batchId, chunkNo), CHUNK_TTL_SECONDS);
}

/**
 *  Get active batch id
 */
async function getActiveBatchId(): Promise<string | null> {
  let cursor = '0';
  let latestBatch: string | null = null;

  do {
    const [next, keys] = await redis.scan(
      cursor,
      'MATCH',
      'batch:*',
      'COUNT',
      100,
    );

    cursor = next;

    for (const key of keys) {
      if (key.includes(':chunk')) continue;
      const status = await redis.hget(key, 'status');
      if (status === BATCH_STATUS.PROCESSING) {
        latestBatch = key.replace('batch:', '');
      }
    }
  } while (cursor !== '0');

  return latestBatch;
}

/* -------------------------------------------------------------------------- */
/*                              CORE PROCESSOR                                */
/* -------------------------------------------------------------------------- */

async function processBatchStreaming(batchId: string): Promise<void> {
  const chunkNumbers = await getChunkNumbers(batchId);
  let totalInserted = 0;
  let totalUpdated = 0;
  let totalFailed = 0;
  let totalImportData = 0;

  for (const chunkNo of chunkNumbers) {
    try {
      /* ---------------------------- Read Chunk ---------------------------- */

      const jobs = await readChunkData(batchId, chunkNo);

      if (!jobs.length) continue;

      /* --------------------------- Bulk Insert ---------------------------- */
      const result = await bulkUpsertImportFeeds(jobs);

      totalInserted += result.inserted;
      totalUpdated += result.updated;
      totalFailed += result.failed;
      totalImportData += result.inserted + result.updated + result.failed;

      /* ----------------------- Update Chunk Status ------------------------- */

      await updateChunkStatus(batchId, chunkNo, {
        status: CHUNK_STATUS.COMPLETED,
        inserted: result.inserted.toString(),
        updated: result.updated.toString(),
        failed: result.failed.toString(),
        completedAt: Date.now().toString(),
      });

      /* ------------------------ Save Failures ------------------------------ */

      await saveFailedRecords(batchId, chunkNo, result.failedRecords);
    } catch (error) {
      /* -------------------------- Error State ------------------------------ */

      await updateChunkStatus(batchId, chunkNo, {
        status: CHUNK_STATUS.FAILED,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /* ------------------------- Final Batch Summary -------------------------- */

  const batchKey = getBatchKey(batchId);
  await redis
    .multi()
    .hset(batchKey, {
      status: BATCH_STATUS.COMPLETED,
      inserted: totalInserted.toString(),
      updated: totalUpdated.toString(),
      failed: totalFailed.toString(),
      totalImportData: totalImportData.toString(),
      completedAt: Date.now().toString(),
    })
    .expire(batchKey, CHUNK_TTL_SECONDS)
    .exec();
  const data = await redis.hgetall(batchKey);
  const newData = {
    ...data,
    batchId,
  };
  broadcast({
    type: 'import-feed',
    payload: newData,
  });
  await upsertImportFeedLogs([newData] as unknown as ImportFeedLogType[]);
}

/* -------------------------------------------------------------------------- */
/*                                  WORKER                                    */
/* -------------------------------------------------------------------------- */

new Worker(
  QUEUE_NAME,
  async () => {
    try {
      const batchId = await getActiveBatchId();

      if (!batchId) {
        console.log('✅ No active batch found');
        return;
      }

      if (!batchId) {
        throw new Error('Missing batchId');
      }

      await processBatchStreaming(batchId);
    } catch (error) {
      workerErrorHandler('BATCH_PROCESSOR', error);
      throw error;
    }
  },
  {
    connection: redis,
    concurrency: 1,
  },
);
