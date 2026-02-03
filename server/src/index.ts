import config from '@/configs/app.config'
import app from '@/app';
import http from 'http';
import logger from '@/utils/logger';
import databaseServices from '@/services/database-services';
import "@/consumers/index"
import { startCronProducers } from '@/schedulers/cron.producer';

const server = http.createServer(app);


server.listen(config.PORT);
(async () => {
  try {
    // Database Connection
    const connection = await databaseServices.connect().then(async (connection) => {
      console.log("🚀 BullMQ Worker & Scheduler is running");
      startCronProducers();
      return connection
    })
    logger.info(`DATABASE_CONNECTION`, {
      meta: {
        CONNECTION_NAME: connection.name
      }
    })

    logger.info(`APPLICATION_STARTED`, {
      meta: {
        PORT: config.PORT,
        SERVER_URL: config.SERVER_URL
      }
    })
  } catch (err) {
    logger.error(`APPLICATION_ERROR`, { meta: err })

    server.close((error) => {
      if (error) {
        logger.error(`APPLICATION_ERROR`, { meta: error })
      }

      process.exit(1)
    })
  }
})()
