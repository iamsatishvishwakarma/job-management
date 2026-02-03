import { Document } from "mongoose"

export interface IJob extends Document {
  jobId: string
  title: string
  company: string
  location: string
  url?: string | null
  category?: string
  raw?: Record<string, any>
  createdAt?: Date
  updatedAt?: Date
}