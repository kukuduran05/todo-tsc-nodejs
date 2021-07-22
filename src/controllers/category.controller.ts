import { NextFunction, Request, Response } from 'express';
import Boom from '@hapi/boom';
import * as CategoriesService from '../services/categories';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await CategoriesService.findAll(req.user.id);
        return res.json(categories);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idCategory } = req.params;
        const category = await CategoriesService.find(req.user.id, idCategory);
        return res.json(category);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description } = req.body;
        const newCat = await CategoriesService.create(title, description, req.user.id);
        return res.json(newCat);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idCategory } = req.params;
        const data = req.body;
        const results = await CategoriesService.update(idCategory, req.user.id, data);
        return res.json(results);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idCategory } = req.params;
        const results = await CategoriesService.deleteCategory(idCategory, req.user.id);
        return res.json(results);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
};

