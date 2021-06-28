import express, { Request, Response } from "express";

export const taskRouter = express.Router();

// New Task
taskRouter.post("/", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create Task');
});

// Get All Tasks
taskRouter.get("/", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Tasks List');
});

// Get one Task
taskRouter.get("/:idTask", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Get one Task');
});

// Update Task
taskRouter.put("/:idTask", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Update Task');
});

// Delete Task
taskRouter.delete("/:idTask", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Delete Task');
});