export interface IChunkLogType {
  batchId: String;
  chunkNo: Number;
  status: String;
  inserted: Number;
  updated: Number;
  failed: Number;
  completedAt?: Date;
  startedAt?: Date;
}
