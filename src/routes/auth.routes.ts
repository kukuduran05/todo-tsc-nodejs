import express from "express";
import { createUserSchema, loginUserSchema } from '../utils/schemas/users';
import { validationHandler } from '../middleware/validationHandler';
import * as Auth from '../controllers/auth.controller';

export const authRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string,
 *                  description: The name of the user
 *              lasname:
 *                  type: string,
 *                  description: The lastname of the user
 *              email:
 *                  type: string,
 *                  description: The email of the user
 *              password:
 *                  type: string,
 *                  description: The password of the user
 *          required:
 *              - name
 *              - email
 *              - password
 *          example:
 *              name: Karla,
 *              lastname: Solis
 *              email: Karla.Solis@hotmail.com
 *              password: Secret
 *          UserNotFound:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                      description: A message for the not found user
 *              example:
 *                  msg:
 *                      User was not found
 * 
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string,
 *                  description: The email of the user
 *              password:
 *                  type: password
 *                  description: The password of the user
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: Karla.Solis@hotmail.com
 *              password: Secret
 *          UserNotFound:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                      description: A message for the not found user
 *              example:
 *                  msg:
 *                      User was not found
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users endpoint
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Create a new account for new users
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user was successfully created
 *          500:
 *              description: Some server error
 */
// Register
authRouter.post("/register", validationHandler(createUserSchema), Auth.register);


/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Create an access login
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: The access login was successfully
 *          500:
 *              description: Some server error
 */
// Login
authRouter.post("/login", validationHandler(loginUserSchema), Auth.login);
