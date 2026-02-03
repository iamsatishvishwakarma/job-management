export interface IImportLog {
  timestamp: Date;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: {
    jobData: any; // Ya specific ID
    reason: string;
  }[];
  status: 'COMPLETED' | 'FAILED' | 'PARTIAL' |'IN_PROGRESS';
}
