import mongoose, { Schema } from "mongoose"
import { IJob } from "@/models/types/job.types"

const jobSchema: Schema<IJob> = new mongoose.Schema(
  {
    jobId: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: "Other"
    },
    raw: {
      type: Object
    },
  },
  { timestamps: true }
)

export default mongoose.model<IJob>('Job', jobSchema);
