import { Router } from 'express';
const router = Router();

import { getUsers, createUser } from '../controllers/auth.controller'

router.route('/users')
    .get(getUsers)
    .post(createUser)

export default router;