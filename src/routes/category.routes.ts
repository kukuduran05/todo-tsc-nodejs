import express from "express";
import { validationHandler } from "../middleware/validationHandler";
import { createCategorySchema, updateCategorySchema } from '../utils/schemas/categories';
import * as Categories from '../controllers/category.controller';

export const categoryRouter = express.Router();

/**
 * @swagger
 * components:
 *  parameters:
 *      categoryId:
 *          in: path
 *          name: categoryId
 *          required: true
 *          schema:
 *              type: string
 *          description: The category Id
 *  schemas:
 *      Category:
 *          type: object
 *          properties:
 *              categoryId:
 *                  type: integer
 *                  description: The auto-generated id of category
 *              title:
 *                  type: string
 *                  description: The title from the category
 *              description:
 *                  type: string
 *                  description: The description from the category
 *          example:
 *              title: Home
 *              description: Home Category
 */

/**
 * @swagger
 * /categories:
 *  post:
 *      summary: Create Category
 *      tags: 
 *          - Categories
 *      description: "Create new category."
 *      operationId: createCategory
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The Category was created successfully
 *          500:
 *              description: Some server error
 */
// New Category
categoryRouter.post("/", validationHandler(createCategorySchema), Categories.createCategory);

/** 
 * @swagger
 * /categories:
 *  get:
 *      summary: List of categories
 *      tags: 
 *          - Categories
 *      description: "Get list of categories"
 *      operationId: getCategories
 *      parameters: []
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The categories list is appear
 *          500:
 *              description: Some server error
*/
// Get All Categories
categoryRouter.get("/", Categories.getCategories);

/** 
 * @swagger
 * /categories/{categoryId}:
 *  get:
 *      summary: Get category by Id
 *      tags: 
 *          - Categories
 *      description: ""
 *      operationId: getCategory
 *      parameters:
 *          - $ref: "#/components/parameters/categoryId"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The category information is appear
 *          500:
 *              description: Some server error
 *          400:
 *              description: The category was not found
*/
// Get one Category
categoryRouter.get("/:idCategory", Categories.getCategory);

/** 
 * @swagger
 * /categories/{categoryId}:
 *  put:
 *      summary: Update the category by id
 *      tags: 
 *          - Categories
 *      description: ""
 *      operationId: updateCategory
 *      parameters:
 *          - $ref: "#/components/parameters/categoryId"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Category"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The category was updated
 *          500:
 *              description: Some server error
 *          404:
 *              description: The category was not found
 *  
*/
// Update Category
categoryRouter.put("/:idCategory", validationHandler(updateCategorySchema) , Categories.updateCategory);

/**
 * @swagger
 * /categories/{categoryId}:
 *  delete:
 *      summary: Delete category
 *      tags: 
 *          - Categories
 *      description: ""
 *      operationId: deleteCategory
 *      parameters:
 *          - $ref: "#/components/parameters/categoryId"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The category was deleted
 *          404:
 *              description: The category was not found
 */
// Delete Category
categoryRouter.delete("/:idCategory", Categories.deleteCategory);