export interface ImportFeedLogType {
  batchId: string;
  status: string;
  totalFetchedData: number;
  totalImportData: number;
  inserted: number;
  updated: number;
  failed: number;
  startedAt: Date;
  completedAt: Date;
}
