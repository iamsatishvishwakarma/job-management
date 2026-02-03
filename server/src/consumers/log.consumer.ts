import { Worker } from "bullmq"
import { jobImportQueue, jobLogQueue } from "@/queues/job.queue"
import { JOB_NAME } from "@/constants/queue"
import logger from "@/utils/logger"
import { insertJobsLogService } from "@/features/v1/loggers/services/job.log.service"

export const jobLogConsumer = new Worker(
  jobLogQueue.name,
  async (job) => {
    if (job.name === JOB_NAME.LOG) {
      try {
        const result = await insertJobsLogService(job.data)
        if (!result) {
          logger.error("REDIS_LOG_ERROR", { meta: { result } })
          throw new Error("REDIS_LOG_ERROR")
        }
        return result
      } catch (error) {
        logger.error("REDIS_LOG_ERROR", { meta: { error } })
        throw new Error("REDIS_LOG_ERROR")
      }
    }
  },
  {
    connection: jobImportQueue.opts.connection,
    concurrency: 1,
  }
)
