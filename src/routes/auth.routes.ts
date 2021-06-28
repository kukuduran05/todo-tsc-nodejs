import express, { Request, Response } from "express";
import { errorHandler } from "helpers/handle_errors";

export const authRouter = express.Router();

// Register
authRouter.post("/register", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create Register');
});

// Login
authRouter.post("/login", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create Login');
});