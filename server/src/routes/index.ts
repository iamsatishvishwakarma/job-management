import { Router } from 'express';
import logRoutes from './logs.route';

const router = Router();

router.use('/v1/logs', logRoutes);

export default router;
