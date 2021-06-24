import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { getAllUsers, getOneUser, deleteUser, updateUser} from '../controllers/users.controller';
import { createCategory, getAllCategories, getOneCategory, deleteCategory, updateCategory} from '../controllers/categories.controller';
import { createTask, getAllTasks, getOneTask, deleteTask, updateTask} from '../controllers/tasks.controller';

const router = Router();

router.route('/register')
    .post(register);

router.route('/login')
    .post(login);

router.route('/users')
    .get(getAllUsers);

router.route('/users/:userId')
    .get(getOneUser)
    .delete(deleteUser)
    .put(updateUser);

router.route('/categories')
    .post(createCategory)
    .get(getAllCategories)

router.route('/categories/:categoryId')
    .get(getOneCategory)
    .delete(deleteCategory)
    .put(updateCategory)

router.route('/tasks')
    .post(createTask)
    .get(getAllTasks)

router.route('/tasks/:taskId')
    .get(getOneTask)
    .delete(deleteTask)
    .put(updateTask)

export default router;