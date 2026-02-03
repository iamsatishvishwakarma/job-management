import { CRON_NAME, JOB_NAME } from "@/constants/queue"
import { jobImportQueue } from "@/queues/job.queue"
import { getAllJobsService } from "@/services/job/job.fetcher.service"

const DURATION = 30000

export const startCronProducers = async () => {
  await jobImportQueue.upsertJobScheduler(
    CRON_NAME.IMPORT_TRIGGER,
    { every: DURATION },
    {
      name: JOB_NAME.IMPORT,
      data: await getAllJobsService(),
    }
  )
}
