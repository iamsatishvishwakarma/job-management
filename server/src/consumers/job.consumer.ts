import { Worker } from "bullmq"
import { jobImportQueue, jobLogQueue } from "@/queues/job.queue"
import { InsertAndSyncJobsService } from "@/features/v1/jobs/services/job.service"
import { JOB_NAME } from "@/constants/queue"
import logger from "@/utils/logger"

export const jobConsumer = new Worker(
  jobImportQueue.name,
  async (job) => {
    if (job.name === JOB_NAME.IMPORT) {
      const result = await InsertAndSyncJobsService(job.data, job.data.length)
      try {
        const log = await jobLogQueue.add(JOB_NAME.LOG, {
          ...result,
          parentJobId: job.id,
          timestamp: new Date()
        });
        if (!log?.id) logger.error("REDIS_LOG_ERROR", { meta: { log } })
      } catch (logError) {
        logger.error("REDIS_LOG_ERROR", { meta: { logError } })
      }
      return result
    }
  },
  {
    connection: jobImportQueue.opts.connection,
    concurrency: 1,
  }
)
