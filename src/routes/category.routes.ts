import express, { Request, Response } from "express";

export const categoryRouter = express.Router();

// New User
categoryRouter.post("/", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create Category');
});

// Get All Categories
categoryRouter.get("/", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Categories List');
});

// Get one Category
categoryRouter.get("/:idCategory", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Get one Category');
});

// Update Category
categoryRouter.put("/:idCategory", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Update Category');
});

// Delete Category
categoryRouter.delete("/:idCategory", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Delete Category');
});