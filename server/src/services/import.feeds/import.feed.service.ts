import { _JOB_FEEDS } from '@/constants/job.feeds.constant';
import { importFeedMapper } from '@/utils/functions/import.feed.mapper';
import { parseXML } from '@/utils/functions/parse.xml';
import { MongoBulkWriteError, WriteError } from 'mongodb';
import { ImportFeedType } from '@/types/models/import.feed.model';
import { ImportFeed } from '@/models/import.feed.model';
import axios from 'axios';
import { normalizeWriteErrors } from '@/utils/functions/bull.insert.error.normlizer';
import { workerErrorHandler } from '@/middlewares/worker.error.handler.middleware';

export const importFeedData = async (batchId: string) => {
  const fetchAndParse = async ({
    url,
    name,
  }: {
    url: string;
    name: string;
  }) => {
    try {
      const response = await axios.get(url, { timeout: 6000 });
      const parsedData = await parseXML(response.data);
      return {
        url,
        batchId,
        status: 'fulfilled',
        count: parsedData.length,
        data: parsedData.map((item) => importFeedMapper(item, name)),
        error: null,
      };
    } catch (err) {
      return {
        url,
        batchId,
        status: 'rejected',
        count: 0,
        data: [],
        error: err instanceof Error ? err.message : String(err),
      };
    }
  };

  const summary = {
    processedAt: new Date(),
    results: await Promise.all(_JOB_FEEDS.map((feeds) => fetchAndParse(feeds))),
  };

  return summary;
};

export async function bulkUpsertImportFeeds(jobs: ImportFeedType[]) {
  const operations = jobs.map((job) => ({
    updateOne: {
      filter: { externalId: job.externalId},
      update: { $set: job },
      upsert: true,
    },
  }));

  try {
    const result = await ImportFeed.bulkWrite(operations, {
      ordered: false,
    });

    return {
      inserted: result.upsertedCount,
      updated: result.modifiedCount,
      failed: 0,
      failedRecords: [],
    };
  } catch (error) {
    if (error instanceof MongoBulkWriteError) {
      const writeErrors = normalizeWriteErrors(
        error?.writeErrors as WriteError[],
      );
      const failedIndexes = writeErrors.map((e: { index: number }) => e.index);
      const failedRecords = failedIndexes.map((index: number) => jobs[index]);

      return {
        inserted: error.result?.upsertedCount ?? 0,
        updated: error.result?.modifiedCount ?? 0,
        failed: failedRecords.length,
        failedRecords,
      };
    }
    await workerErrorHandler('BULK_UPSERT_IMPORT_FEED', error);
    throw error;
  }
}
