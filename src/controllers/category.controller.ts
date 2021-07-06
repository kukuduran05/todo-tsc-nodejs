import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Categories } from '../entity/categories';

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
    const categories = await getRepository(Categories).find({
        select: ['categoryId', 'title', 'description'],
        where: { 'userUserId': req.user.id }
    });
    return res.json(categories);
}

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
    const category = await getRepository(Categories).findOne({
        select: ['categoryId', 'title', 'description'],
        where: {
            'categoryId': req.params.idCategory,
            'userUserId': req.user.id
        }
    });
    return res.json(category);
}

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    // Check if the category is on the DB
    // const category = await getRepository(Categories).findOne({
    //     where: { 'title': req.body.title }
    // });
    const category = await getRepository(Categories).findOne({
        where: { 'userUserId': req.user.id, 'title': req.body.title }
    });

    if (category === undefined) {
        let newCategory = new Categories();
        newCategory.title = req.body.title;
        newCategory.description = req.body.description;
        newCategory.userUserId = req.user.id;
        const categoryData = getRepository(Categories).create(newCategory);
        const results = await getRepository(Categories).save(categoryData);
        return res.json(results);
    }
    return res.json({msg: 'Category already exists!'});
}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
    // Check if the category is on the DB
    const category = await getRepository(Categories).findOne({
        where: { 'categoryId': req.params.idCategory ,'userUserId': req.user.id }
    });
    if (category) {
        const categoryData = getRepository(Categories).merge(category, req.body);
        const results = await getRepository(Categories).save(categoryData);
        return res.json(results);    
    }
    return res.json({msg: 'Category not found!'});
}

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    // Check if the category is on the DB
    const category = await getRepository(Categories).findOne({
        where: {
            'categoryId': req.params.idCategory,
            'userUserId': req.user.id
        }
    });
    if (category) {
        const results = await getRepository(Categories).delete(req.params.idCategory);
        return res.json(results);
    }
    return res.json({msg: 'Category not found!'});
};