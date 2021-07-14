import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Categories } from '../entity/categories';
import Boom from '@hapi/boom';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryRepository = getRepository(Categories);
        const categories = await categoryRepository.find({
            select: ['categoryId', 'title', 'description'],
            where: { 'userUserId': req.user.id }
        });
        return res.json(categories);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryRepository = getRepository(Categories);
        const { idCategory } = req.params;
        const category = await categoryRepository.findOne({
            select: ['categoryId', 'title', 'description'],
            where: {
                'categoryId': idCategory,
                'userUserId': req.user.id
            }
        });
        return res.json(category);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if the category is on the DB
        const categoryRepository = getRepository(Categories);
        const { title, description } = req.body;
        const category = await categoryRepository.findOne({
            where: { 'userUserId': req.user.id, 'title': title }
        });
        if (category === undefined) {
            let newCategory = new Categories();
            newCategory.title = title;
            newCategory.description = description;
            newCategory.userUserId = req.user.id;
            const categoryData = categoryRepository.create(newCategory);
            const results = await categoryRepository.save(categoryData);
            return res.json(results);
        }
        return res.json({msg: 'Category already exists!'});
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if the category is on the DB
        const categoryRepository = getRepository(Categories);
        const category = await categoryRepository.findOne({
            where: { 'categoryId': req.params.idCategory ,'userUserId': req.user.id }
        });
        if (category) {
            const categoryData = categoryRepository.merge(category, req.body);
            const results = await categoryRepository.save(categoryData);
            return res.json(results);    
        }
        return res.json({msg: 'Category not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if the category is on the DB
        const categoryRepository = getRepository(Categories);
        const { idCategory } = req.params;
        const category = await categoryRepository.findOne({
            where: {
                'categoryId': idCategory,
                'userUserId': req.user.id
            }
        });
        if (category) {
            await categoryRepository.delete(idCategory);
            return res.json({msg: `Category ${category.title} was deleted!`});
        }
        return res.json({msg: 'Category not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
};