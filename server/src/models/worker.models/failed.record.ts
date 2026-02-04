import mongoose from "mongoose";

export const FailedRecord = mongoose.model(
  "FailedRecord",
  new mongoose.Schema({
    batchId: String,
    chunkNo: Number,
    record: Object,
    error: String,
  }),
);
