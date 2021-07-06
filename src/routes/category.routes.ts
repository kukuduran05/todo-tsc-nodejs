import express from "express";
import { validationHandler } from "../middleware/validationHandler";
import { createCategorySchema, updateCategorySchema } from '../utils/schemas/categories';
import * as Categories from '../controllers/category.controller';

export const categoryRouter = express.Router();

// New Category
categoryRouter.post("/", validationHandler(createCategorySchema), Categories.createCategory);
// Get All Categories
categoryRouter.get("/", Categories.getCategories);
// Get one Category
categoryRouter.get("/:idCategory", Categories.getCategory);
// Update Category
categoryRouter.put("/:idCategory", validationHandler(updateCategorySchema) , Categories.updateCategory);
// Delete Category
categoryRouter.delete("/:idCategory", Categories.deleteCategory);