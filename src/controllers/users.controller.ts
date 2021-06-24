import express, {Request, Response} from "express";

export async function getAllUsers(req: Request, res: Response): Promise<Response> {
    //TODO code for get all users
    return res.json('Get all users');
}

export async function getOneUser(req: Request, res: Response): Promise<Response> {
    //TODO code for get a specific user
    return res.json('Get only one user');
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    //TODO code for delete a specific user
    return res.json('Delete user');
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    //TODO code for delete a specific user
    return res.json('Update user');
}