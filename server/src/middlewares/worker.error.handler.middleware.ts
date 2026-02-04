import logger from '@/utils/logger';

export const workerErrorHandler = async (
  jobName = 'WORKER_ERROR',
  error: Error | unknown,
): Promise<void> => {
  await logger.error(jobName, {
    meta: error,
  });
};
