import express, { NextFunction, Request, Response } from "express";
import { Category } from "../interfaces/categories";
import { validationHandler } from "../middleware/validationHandler";
import * as Service from '../services/queries';
import { createCategorySchema, updateCategorySchema } from '../utils/schemas/categories';
import Boom from "@hapi/boom";

export const categoryRouter = express.Router();

const table = 'categories';

// New User
categoryRouter.post("/", validationHandler(createCategorySchema) ,async(req: Request, res: Response, next: NextFunction) => {
    // Get Current UserID
    const currentUserId = await Service.getCurrentUser(req);
    let conditions = `AND title = '${req.body.title}'`;
    // Check if the category is on the DB
    const categoryExist: any = await Service.findOne(table, 'userId', currentUserId.id, [], conditions);
    if (categoryExist.length > 0) {
        return res.json({
            message: "Category already exists, please try with other title!"
        });
    }

    // Get data from req.body
    const newCategory: Category = req.body;
    newCategory.userId = currentUserId.id;
    const fields = Object.keys(newCategory);
    const vals = Object.values(newCategory);
    try {
        const savedCategory = await Service.save(table, fields, vals);
        res.json({
            message: "Category created!",
            data: savedCategory
        });
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
});

// Get All Categories
categoryRouter.get("/", async(req: Request, res: Response, next: NextFunction) => {
    // Get Current UserID
    const currentUserId = await Service.getCurrentUser(req);
    let fields: any = [
        'categoryId',
        'title',
        'description'
    ];
    let conditions = `WHERE userId = '${currentUserId.id}'`
    try {
        const categories = await Service.findAll(table, fields, conditions)
        res.json(categories);
    } catch (err){
        return next(Boom.badRequest(err.message));
    }
});

// Get one Category
categoryRouter.get("/:idCategory", async(req: Request, res: Response, next: NextFunction) => {
    // Get Current UserID
    const currentUserId = await Service.getCurrentUser(req);
    const idCategory = parseInt(req.params.idCategory);
    let fields: any = [
        'title',
        'description'
    ];
    try {
        let conditions = `AND userId = '${currentUserId.id}'`
        const category = await Service.findOne(table, 'categoryId', idCategory, fields, conditions);
        res.json(category);
    } catch (err){
        return next(Boom.badRequest(err.message));
    }
});

// Update Category
categoryRouter.put("/:idCategory", async(req: Request, res: Response, next: NextFunction) => {
    // Check if the user is on the DB
    const currentUserId = await Service.getCurrentUser(req);
    const idCategory = parseInt(req.params.idCategory);
    let conditions = `AND userId = '${currentUserId.id}'`;
    const isCategoryExist: any = await Service.findOne(table, 'categoryId', idCategory, [], conditions);
    if (isCategoryExist.length == 0) {
        return res.json({
            message: "Category does not exist!"
        })
    }
    try {
        // TODO UPDATE CATEGORY
        return res.json({
            message: "Category is udpated"
        })
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
});

// Delete Category
categoryRouter.delete("/:idCategory", async(req: Request, res: Response, next: NextFunction) => {
    // Check if the user is on the DB
    const currentUserId = await Service.getCurrentUser(req);
    const idCategory = parseInt(req.params.idCategory);
    let conditions = `AND userId = '${currentUserId.id}'`;
    const isCategoryExist: any = await Service.findOne(table, 'categoryId', idCategory, [], conditions);
    if (isCategoryExist.length == 0) {
        return res.json({
            message: "Category does not exist!"
        })
    }
    try{
        deleteCategory(table, 'categoryId', idCategory, req, res, next);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
});

function deleteCategory(table: string, field: string, id: any, req: Request, res: Response, next: NextFunction) {
    Service.deleteRecord(table, field, id)
    .then(user => {
        return res.json({
            message: "Category deleted!"
        });
    })
    .catch(err => next(Boom.badRequest(err.message)));
}