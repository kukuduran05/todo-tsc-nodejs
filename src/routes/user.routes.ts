import express from "express";
import { validationHandler } from "../middleware/validationHandler";
import { createUserSchema, updateUserSchema } from "../utils/schemas/users";
import * as Users from '../controllers/user.controller';

export const userRouter = express.Router();

// New User
userRouter.post("/", validationHandler(createUserSchema), Users.createUser);
// Get All Users
userRouter.get("/", Users.getUsers);
// Get one user
userRouter.get("/:idUser", Users.getUser);
// Update User
userRouter.put("/:idUser", validationHandler(updateUserSchema) , Users.updateUser);
// Delete User
userRouter.delete("/:idUser", Users.deleteUser);
