import express, { Request, Response } from "express";

export const userRouter = express.Router();

// New User
userRouter.post("/", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create User');
});

// Get All Users
userRouter.get("/", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Users List');
});

// Get one user
userRouter.get("/:idUser", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Get one user');
});

// Update User
userRouter.put("/:idUser", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Update user');
});

// Delete User
userRouter.delete("/:idUser", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Delete user');
});