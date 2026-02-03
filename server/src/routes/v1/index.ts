import { Router } from 'express';
import loggerRoutes from '@/features/v1/loggers/routes';

const router = Router();

router.use('/logs', loggerRoutes);


export default router;
