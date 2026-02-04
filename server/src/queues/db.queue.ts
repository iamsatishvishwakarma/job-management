import { Queue } from "bullmq";

import { bullConnection } from "@/configs/bull.config";

export const dbQueue = new Queue("db-processor", bullConnection);
