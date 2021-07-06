import express from "express";
import { createUserSchema, loginUserSchema } from '../utils/schemas/users';
import { validationHandler } from '../middleware/validationHandler';
import * as Auth from '../controllers/auth.controller';

export const authRouter = express.Router();

// Register
authRouter.post("/register", validationHandler(createUserSchema), Auth.register);

// Login
authRouter.post("/login", validationHandler(loginUserSchema), Auth.login);