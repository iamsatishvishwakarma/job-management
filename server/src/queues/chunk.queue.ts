import { Queue } from "bullmq";

import { bullConnection } from "@/configs/bull.config";

export const chunkQueue = new Queue("chunk-queue", bullConnection);
