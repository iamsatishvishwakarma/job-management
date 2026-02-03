import { redisConnection } from "@/configs/redis.config"

export const bullConnection = {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: { age: 24 * 3600 },
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 }
  }
}