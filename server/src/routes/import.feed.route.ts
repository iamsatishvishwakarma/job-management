import { getPaginatedImportFeedLog } from '@/controllers/logs/import.feed.log.controller';
import { Router } from 'express';

const router = Router();

router.get('/import-logs', getPaginatedImportFeedLog);

export default router;
