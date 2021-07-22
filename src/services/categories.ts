import { getRepository } from "typeorm";
import { Categories } from '../entity/categories';

export async function findAll(userId: number) {
    const categoryRepository = getRepository(Categories);
    const categories = await categoryRepository.find({
        select: ['categoryId', 'title', 'description'],
        where: { 'userUserId': userId }
    });
    return categories;
}

export async function find(userId: number, idCategory: string) {
    const category = await findOneCategory(userId, idCategory);
    if (category === undefined) {
        return { msg: "Category is not found!" };
    }
    return category;
}

export async function create(title: string, description: string, userId: number) {
    // Check if the category is on the DB
    const categoryRepository = getRepository(Categories);
    const category = await categoryRepository.findOne({
        where: { 'userUserId': userId, 'title': title }
    });

    if (category === undefined) {
        let newCategory = new Categories();
        newCategory.title = title;
        newCategory.description = description;
        newCategory.userUserId = userId;
        const categoryData = categoryRepository.create(newCategory);
        const results = await categoryRepository.save(categoryData);
        return results;
    }
    return {msg: 'Category already exists!'};
}

export async function update(idCategory: string, userId: number, data: any) {
    const category = await findOneCategory(userId, idCategory)
    if (category) {
        const categoryRepository = getRepository(Categories);
        const categoryData = categoryRepository.merge(category, data);
        const results = await categoryRepository.save(categoryData);
        return results;
    }
    return {msg: 'Category not found!'};
}


export async function deleteCategory(idCategory: string, userId: number) {
    const categoryRepository = getRepository(Categories);
    const category = await findOneCategory(userId, idCategory);
        if (category) {
            await categoryRepository.delete(idCategory);
            return {msg: `Category ${category.title} was deleted!`};
        }
        return {msg: 'Category not found!'};
}

const findOneCategory = async(userId: number, idCategory: string) => {
    const categoryRepository = getRepository(Categories);
    const category = await categoryRepository.findOne({
        select: ['categoryId', 'title', 'description'],
        where: {
            'categoryId': idCategory,
            'userUserId': userId
        }
    });
    return category;
}