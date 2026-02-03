import mongoose, { Schema, Document } from 'mongoose';
import { IImportLog } from '@/features/v1/loggers/types/job.logger.type';

export interface IJobDocument extends IImportLog, Document { }

const ImportLogSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  totalFetched: { type: Number, default: 0 },
  totalImported: { type: Number, default: 0 },
  newJobs: { type: Number, default: 0 },
  updatedJobs: { type: Number, default: 0 },
  failedJobs: [
    {
      jobData: { type: Object },
      reason: { type: String },
      failedAt: { type: Date, default: Date.now }
    }
  ],
  status: {
    type: String,
    enum: ['COMPLETED', 'FAILED', 'IN_PROGRESS'],
    default: 'IN_PROGRESS'
  }
}, { timestamps: true });

// Indexing for History Tracking
ImportLogSchema.index({ timestamp: -1 });

export const ImportLog = mongoose.model<IImportLog>('import_logs', ImportLogSchema);