import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { categoryRouter } from './category.routes';
import { taskRouter } from './task.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/tasks', taskRouter);

export default router;