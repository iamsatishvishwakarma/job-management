import { Router } from "express";
import { InsertJobs } from "@/features/v1/jobs/api/job.controller";


const router = Router();
router.get('/', InsertJobs);

export default router;