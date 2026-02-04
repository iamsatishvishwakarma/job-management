import { Queue } from "bullmq";

import { bullConnection } from "@/configs/bull.config";

export const feedImportQueue = new Queue("import-parent", bullConnection);
