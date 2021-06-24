import express, {Request, Response} from "express";

export async function createCategory(req: Request, res: Response): Promise<Response> {
    //TODO code for create category
    return res.json('Create category');
}

export async function getAllCategories(req: Request, res: Response): Promise<Response> {
    //TODO code for get all categories
    return res.json('Get all categories');
}

export async function getOneCategory(req: Request, res: Response): Promise<Response> {
    //TODO code for get a specific category
    return res.json('Get only one category');
}

export async function deleteCategory(req: Request, res: Response): Promise<Response> {
    //TODO code for delete a specific category
    return res.json('Delete category');
}

export async function updateCategory(req: Request, res: Response): Promise<Response> {
    //TODO code for delete a specific category
    return res.json('Update category');
}