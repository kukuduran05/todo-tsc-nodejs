"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DB
/*
import { connect } from '../database'
//Interfaces
//import { Category } from '../models/Categories';

export async function listCategories(req: Request, res: Response): Promise<Response | void> {
    try {
        /*const conn = await connect();
        const cats = await conn.query('SELECT * FROM categories');
        return res.json(cats[0]);
        res.json({
            message: 'Category list'
        });
        console.log("categories list");
    }
    catch (e) {
        console.log(e)
    }
}

export async function createCategory(req: Request, res: Response) {
    /*const newCat: Category = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO categories SET ?', [newCat]);
    res.json({
        message: 'New Category Created'
    });
    res.json({
        message: 'category created'
    });
    console.log("new category");
}

export async function getCategory(req: Request, res: Response) {
    /*const id = req.params.categoryId;
    const conn = await connect();
    const cats = await conn.query('SELECT * FROM categories WHERE id = ?', [id]);
    res.json(cats[0]);
    res.json({
        message: 'get one category'
    });
    console.log("get category");
    
}

export async function deleteCategory(req: Request, res: Response) {
    /*const id = req.params.categoryId;
    const conn = await connect();
    await conn.query('DELETE FROM categories WHERE id = ?', [id]);
    res.json({
        message: 'Category deleted'
    });
    res.json({
        message: 'Category deleted'
    });
    console.log("delete category");
}

export async function updateCategory(req: Request, res: Response) {
    /*const id = req.params.categoryId;
    const updatePost: Category = req.body;
    const conn = await connect();
    await conn.query('UPDATE categories set ? WHERE id = ?', [updatePost, id]);
    res.json({
        message: 'Category Updated'
    });
    console.log("update category");
    res.json({
        message: 'Category Updated'
    });
}*/ 
//# sourceMappingURL=categories.controller.js.map