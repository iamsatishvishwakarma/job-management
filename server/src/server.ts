import http from 'http';

import app from '@/app';
import config from '@/configs/app.config';
import databaseServices from '@/services/database-services';
import logger from '@/utils/logger';
import '@/workers/index';
import { initWS } from '@/socket/manager';
const server = http.createServer(app);

initWS(server);

server.listen(config.PORT);
(async () => {
  try {
    // Database Connection
    const connection = await databaseServices.connect();
    logger.info(`DATABASE_CONNECTION`, {
      meta: {
        CONNECTION_NAME: connection.name,
      },
    });

    logger.info(`APPLICATION_STARTED`, {
      meta: {
        PORT: config.PORT,
        SERVER_URL: config.SERVER_URL,
      },
    });
  } catch (err) {
    logger.error(`APPLICATION_ERROR`, { meta: err });

    server.close((error) => {
      if (error) {
        logger.error(`APPLICATION_ERROR`, { meta: error });
      }

      process.exit(1);
    });
  }
})();
