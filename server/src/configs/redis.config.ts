import IORedis from "ioredis";

import config from "@/configs/app.config";
import logger from "@/utils/logger";

// Redis Connection
export const redis = new IORedis({
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
  password: config.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

// Redis Connection Check
redis.on("connect", () => {
  logger.info("✅ Redis Connected", {
    meta: {
      host: redis.options.host,
      port: redis.options.port,
    },
  });
});

// Redis Connection Error
redis.on("error", (err) => {
  logger.error("❌ Redis Connection Error", {
    meta: {
      host: redis.options.host,
      port: redis.options.port,
      error: err,
    },
  });
});
