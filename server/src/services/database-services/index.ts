import mongoose from 'mongoose';

import config from '@/configs/app.config';
import { setupHourlyImport } from '@/producers/hourly.import.producer';

export default {
  connect: async () => {
    try {
      await mongoose.connect(config.DATABASE_URL as string);
      await setupHourlyImport();
      return mongoose.connection;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  },
};
