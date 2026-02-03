import { Queue } from "bullmq"
import { bullConnection } from "@/configs/bull.config"
import { QUEUEN_AME } from "@/constants/queue"

export const jobImportQueue = new Queue(QUEUEN_AME.JOBS, bullConnection)

export const jobLogQueue = new Queue(QUEUEN_AME.LOGS, bullConnection)