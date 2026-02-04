import { dbQueue } from '@/queues/db.queue';
import { feedImportQueue } from '@/queues/feed.import.queue';

export async function setupHourlyImport() {
  await feedImportQueue.add(
    'HOURLY_IMPORT',
    {},
    {
      repeat: {
        immediately: true,
        every: 5000, // 1 hour
      },
      removeOnComplete: {
        count: 1000,
        age: 24 * 3600,
      },
    },
  );

  await dbQueue.add(
    'HOURLY_IMPORT_DB',
    {},
    {
      repeat: {
        immediately: true,
        every: 5000, // 1 hour
      },
      removeOnComplete: {
        count: 2000,
        age: 24 * 3600,
      },
    },
  );
}
