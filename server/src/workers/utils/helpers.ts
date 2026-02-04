import mongoose from 'mongoose';

export const createBatchId = () =>
  `batch_${new mongoose.Types.ObjectId().toString()}`;

export const getBatchKey = (batchId: string) => `batch:${batchId}`;

export const getChunkKey = (batchId: string, chunkNo: number) =>
  `batch:${batchId}:chunk:${chunkNo}`;

export const getChunkMetaKey = (batchId: string) => `batch:${batchId}:chunks`;

export const getFailedChunkKey = (batchId: string, chunkNo: number) =>
  `batch:${batchId}:chunk:${chunkNo}:failed`;
