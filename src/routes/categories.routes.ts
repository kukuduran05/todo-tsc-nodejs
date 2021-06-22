import { Router } from 'express';
import { listCategories, createCategory, getCategory, deleteCategory, updateCategory } from '../controllers/categories.controller';

const router = Router();

router.route('/')
    .get(listCategories)
    .post(createCategory)

router.route('/:categoryId')
    .get(getCategory)
    .delete(deleteCategory)
    .put(updateCategory)
    

export default router;