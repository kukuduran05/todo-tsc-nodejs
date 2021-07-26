import express from "express";
import { createUserSchema, loginUserSchema } from '../utils/schemas/users';
import { validationHandler } from '../middleware/validationHandler';
import * as Auth from '../controllers/auth.controller';

export const authRouter = express.Router();

/**
 * @swagger
 * schemes:
 * - http
 * description: Endpoints for authentication
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: The email for login
 *              password:
 *                  type: string
 *                  description: The password for login in clear text
 *          example:
 *              email: karla.solis@hotmail.com
 *              password: secret
 * 
 *      User:
 *          type: object
 *          properties:
 *              userId:
 *                  type: integer
 *                  description: The auto-generated id of user
 *              name:
 *                  type: string
 *                  description: The name of the user
 *              lastname:
 *                  type: string
 *                  description: The lastname of the user
 *              email:
 *                  type: string
 *                  description: The email of the user
 *              password:
 *                  type: string
 *                  description: The password of the user
 *          example:
 *              name: karla
 *              lastname: solis
 *              email: karla.solis@hotmail.com
 *              password: secret
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Register an user
 *      tags: 
 *          - Auth
 *      description: "If you don't have an account you can create one."
 *      operationId: registerUser
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The User was created successfully
 *          500:
 *              description: Some server error
 */
// Register
authRouter.post("/register", validationHandler(createUserSchema), Auth.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Logs user into the system
 *      tags: 
 *          - Auth
 *      description: ""
 *      operationId: loginUser
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: The Login was successfully, was generated the access token
 *          500:
 *              description: Some server error
 */
// Login
authRouter.post("/login", validationHandler(loginUserSchema), Auth.login);
