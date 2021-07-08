import joi from "joi";

const taskIdSchema = joi.number().max(11);
const taskTitleSchema = joi.string().max(150);
const taskDescriptionSchema = joi.string().max(500);
const taskCategoriesSchema = joi.array();

export const createTaskSchema = joi.object({
    title: taskTitleSchema.required(),
    description: taskDescriptionSchema,
    categories:  taskCategoriesSchema,
})

export const updateTaskSchema = joi.object({
    title: taskTitleSchema,
    description: taskDescriptionSchema,
    categories:  taskCategoriesSchema
})
