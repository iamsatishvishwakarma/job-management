import { Router } from "express";
import { getAllImportLog } from "@/features/v1/loggers/api/job.log.controller";


const router = Router();
router.get('/import-logs', getAllImportLog);

export default router;