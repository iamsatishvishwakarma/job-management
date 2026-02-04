import mongoose, { Schema, Document } from 'mongoose';

import { ImportFeedType } from '@/types/models/import.feed.model';

export interface IJobDocument extends ImportFeedType, Document {}

const ImportFeedSchema: Schema = new Schema(
  {
    batchId: { type: String, required: true },
    chunkNo: { type: Number, required: true },
    externalId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    link: { type: String, required: true },
    pubDate: { type: Date, default: null },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    company: { type: String, trim: true, default: 'Unknown' },
    location: { type: String, trim: true, default: 'Remote' },
    jobType: { type: String, lowercase: true, trim: true },
    media: {
      url: { type: String },
      type: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

ImportFeedSchema.index({ title: 'text', company: 'text' });

export const ImportFeed = mongoose.model<IJobDocument>('ImportFeed', ImportFeedSchema);
