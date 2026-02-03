import mongoose, { Schema, Document } from 'mongoose';
import { IJob } from '@/features/v1/jobs/types/job.type';

export interface IJobDocument extends IJob, Document { }

const JobSchema: Schema = new Schema(
  {
    externalId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: { type: String, required: true, trim: true },
    link: { type: String, required: true },
    pubDate: { type: Date, default: Date.now },
    description: { type: String, default: "" },
    content: { type: String, default: "" },
    company: { type: String, trim: true, default: "Unknown" },
    location: { type: String, trim: true, default: "Remote" },
    jobType: { type: String, lowercase: true, trim: true },
    media: {
      url: { type: String },
      type: { type: String },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Search performance improve karne ke liye indexes
JobSchema.index({ title: 'text', company: 'text' });

export const JobModel = mongoose.model<IJobDocument>('Job', JobSchema);