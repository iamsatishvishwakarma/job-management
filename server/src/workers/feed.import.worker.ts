import { Worker } from 'bullmq';
import { redis } from '@/configs/redis.config';
import { workerErrorHandler } from '@/middlewares/worker.error.handler.middleware';
import { importFeedData } from '@/services/import.feeds/import.feed.service';
import { chunkArray } from '@/utils/functions/chunker';
import {
  createBatchId,
  getBatchKey,
  getChunkKey,
  getChunkMetaKey,
} from './utils/helpers';
import { broadcast } from '@/socket/emitter';

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const QUEUE_NAME = 'import-parent';
const CHUNK_SIZE = 10;
const CHUNK_TTL_SECONDS = 60 * 60; // 1 hour

async function saveBatchMeta(batchId: string, totalFetchedData: number) {
  await redis.hset(getBatchKey(batchId), {
    status: 'PROCESSING',
    totalFetchedData,
    startedAt: Date.now().toString(),
  });
  broadcast({
    type: 'import-feed',
    payload: {
      batchId,
      status: 'PROCESSING',
      totalFetchedData,
      startedAt: Date.now().toString(),
    },
  });
}

async function saveChunksToRedis(batchId: string, chunks: unknown[][]) {
  const pipeline = redis.pipeline();

  chunks.forEach((chunk, index) => {
    const chunkNo = index + 1;
    const chunkKey = getChunkKey(batchId, chunkNo);

    pipeline.rpush(chunkKey, JSON.stringify(chunk));
    pipeline.expire(chunkKey, CHUNK_TTL_SECONDS);

    pipeline.hset(getChunkMetaKey(batchId), {
      [`chunk:${chunkNo}:status`]: 'PROCESSING',
      [`chunk:${chunkNo}:startedAt`]: Date.now().toString(),
    });
  });

  await pipeline.exec();
}

/* -------------------------------------------------------------------------- */
/*                               HELPER METHODS                                */
/* -------------------------------------------------------------------------- */

function injectChunkMetadata(chunks: any[][], batchId: string) {
  return chunks.map((chunk, index) => {
    const chunkNo = index + 1;
    return chunk.map((item) => ({
      ...item,
      chunkNo,
      batchId,
    }));
  });
}

/* -------------------------------------------------------------------------- */
/*                               WORKER LOGIC                                 */
/* -------------------------------------------------------------------------- */

async function importParentHandler() {
  const batchId = createBatchId();

  const { results } = await importFeedData(batchId);

  const allJobs = results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.data);

  if (!allJobs.length) return;

  await saveBatchMeta(batchId, allJobs.length);

  const rawChunks = chunkArray(allJobs, CHUNK_SIZE);
  const chunksWithMeta = injectChunkMetadata(rawChunks, batchId);
  await saveChunksToRedis(batchId, chunksWithMeta);
}

/* -------------------------------------------------------------------------- */
/*                                  WORKER                                    */
/* -------------------------------------------------------------------------- */

new Worker(
  QUEUE_NAME,
  async () => {
    try {
      await importParentHandler();
    } catch (error) {
      workerErrorHandler('IMPORT_PARENT', error);
      throw error;
    }
  },
  {
    connection: redis,
    concurrency: 1,
  },
);
