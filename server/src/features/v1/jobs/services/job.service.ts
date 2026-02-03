import { IJob } from "../types/job.type";
import { JobModel } from "../models/job.model";
import { IImportLog } from "@/features/v1/loggers/types/job.logger.type";

export const InsertAndSyncJobsService = async (data: IJob[], totalJobs: number): Promise<IImportLog> => {
  try {
    const newData = data.map((job) => ({
      updateOne: {
        filter: { externalId: job.externalId },
        update: { $set: job },
        upsert: true,
      },
    }));

    const result = await JobModel.bulkWrite(newData, { ordered: false });

    const inserted = result.upsertedCount || 0;
    const updated = result.modifiedCount || 0;
    const matched = result.matchedCount || 0;

    const totalProcessed = inserted + updated + matched;
    const failedCount = totalJobs - totalProcessed;

    let status: 'COMPLETED' | 'PARTIAL' | 'FAILED' = 'COMPLETED';
    if (totalProcessed === 0) status = 'FAILED';
    else if (failedCount > 0) status = 'PARTIAL';

    return {
      timestamp: new Date(),
      totalFetched: totalJobs,
      totalImported: totalProcessed,
      newJobs: inserted,
      updatedJobs: updated,
      failedJobs: [],
      status: status
    };

  } catch (bulkError: any) {
    const res = bulkError.result;
    const inserted = res?.nUpserted || 0;
    const updated = res?.nModified || 0;
    const matched = res?.nMatched || 0;
    const totalProcessed = inserted + updated + matched;

    const errors = bulkError.writeErrors || [];

    let status: 'COMPLETED' | 'PARTIAL' | 'FAILED' = 'PARTIAL';
    if (totalProcessed === 0) status = 'FAILED';

    return {
      timestamp: new Date(),
      totalFetched: totalJobs,
      totalImported: totalProcessed,
      newJobs: inserted,
      updatedJobs: updated,
      failedJobs: errors.map((e: any) => ({
        jobData: e.op?.u?.$set || {},
        reason: e.errmsg || "Unknown Error"
      })),
      status: status
    };
  }
};