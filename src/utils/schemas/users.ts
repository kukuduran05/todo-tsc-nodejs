import joi from "joi";

const userIdSchema = joi.number().max(11);
const userNameSchema = joi.string().max(150);
const userLastnameSchema = joi.string().max(150);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().min(4);

export const createUserSchema = joi.object({
    name: userNameSchema.required(),
    lastname: userLastnameSchema,
    email:  userEmailSchema.required(),
    password: userPasswordSchema.required()
})

export const updateUserSchema = joi.object({
    name: userNameSchema,
    lastname: userLastnameSchema,
    email:  userEmailSchema,
    password: userPasswordSchema
})