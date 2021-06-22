import { Router } from 'express';
import { listUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/users.controller';

const router = Router();

router.route('/')
    .get(listUsers)
    .post(createUser)

router.route('/:userId')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)
    

export default router;