import { Router } from 'express'
import { home } from '../controllers/index.controller'

const router = Router();

router.route('/')
    .get(home);

export default router;