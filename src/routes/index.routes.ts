import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { categoryRouter } from './category.routes';
import { taskRouter } from './task.routes';
import { verifyToken } from '../middleware/validateToken';
const router = Router();

router.use('/auth', authRouter);
router.use('/users', verifyToken, userRouter);
router.use('/categories', verifyToken, categoryRouter);
router.use('/tasks', verifyToken, taskRouter);

export default router;