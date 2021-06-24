import express, {Request, Response} from "express";

export async function createTask(req: Request, res: Response): Promise<Response> {
    //TODO code for create task
    return res.json('Create task');
}

export async function getAllTasks(req: Request, res: Response): Promise<Response> {
    //TODO code for get all tasks
    return res.json('Get all tasks');
}

export async function getOneTask(req: Request, res: Response): Promise<Response> {
    //TODO code for get a specific task
    return res.json('Get only one task');
}

export async function deleteTask(req: Request, res: Response): Promise<Response> {
    //TODO code for delete a specific task
    return res.json('Delete task');
}

export async function updateTask(req: Request, res: Response): Promise<Response> {
    //TODO code for delete a specific task
    return res.json('Update task');
}