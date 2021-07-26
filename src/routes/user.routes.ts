import express from "express";
import { validationHandler } from "../middleware/validationHandler";
import { createUserSchema, updateUserSchema } from "../utils/schemas/users";
import * as Users from '../controllers/user.controller';

export const userRouter = express.Router();

/**
 * @swagger
 * tags:
 * - name: Users
 * description: Endpoints for user operations
 * components:
 *  securitySchemes:
 *      token:
 *          type: apiKey
 *          in: header
 *          name: auth-token
 *  parameters:
 *      userId:
 *          in: path
 *          name: userId
 *          required: true
 *          schema:
 *              type: string
 *          description: the user id
 */

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Create user
 *      tags: ["Users"]
 *      description: "Create new user account."
 *      operationId: createUser
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The User was created successfully
 *          500:
 *              description: Some server error
 */
// New User
userRouter.post("/", validationHandler(createUserSchema), Users.createUser);

/**
 * @swagger
 * /users:
 *  get:
 *      summary: List of users
 *      tags: ["Users"]
 *      description: "Get list of users"
 *      operationId: getUsers
 *      parameters: []
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The users list is appear
 *          500:
 *              description: Some server error
 */
// Get All Users
userRouter.get("/", Users.getUsers);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *      summary: Get user by Id
 *      tags: ["Users"]
 *      description: ""
 *      operationId: getUser
 *      parameters:
 *          - $ref: "#/components/parameters/userId"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The user information is showed
 *          500:
 *              description: Some server error
 *          400:
 *              description: The user was not found
 */
// Get one user
userRouter.get("/:idUser", Users.getUser);

/**
 * @swagger
 * /users/{userId}:
 *  put:
 *      summary: Update the user by id
 *      tags: ["Users"]
 *      description: ""
 *      operationId: updateUser
 *      parameters:
 *          - $ref: "#/components/parameters/userId"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The user was updated
 *          500:
 *              description: Some server error
 *          404:
 *              description: The user was not found
 *      
 */
// Update User
userRouter.put("/:idUser", validationHandler(updateUserSchema) , Users.updateUser);

/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *      summary: Delete user
 *      tags: ["Users"]
 *      description: ""
 *      operationId: deleteUser
 *      parameters:
 *          - $ref: "#/components/parameters/userId"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The user was deleted
 *          404:
 *              description: The user was not found
 */
// Delete User
userRouter.delete("/:idUser", Users.deleteUser);
