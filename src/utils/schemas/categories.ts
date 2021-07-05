import joi from "joi";

const categoryIdSchema = joi.number().max(11);
const categoryTitle = joi.string().max(150);
const categoryDescription = joi.string().max(1000);

export const createCategorySchema = joi.object({
    title: categoryTitle.required(),
    description: categoryDescription
})

export const updateCategorySchema = joi.object({
    title: categoryTitle,
    description: categoryDescription
})