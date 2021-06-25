import * as Joi from 'joi';

export const registrationSchema = Joi.object().keys({
    name: Joi.string().required(),
    lastname: Joi.string(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required(),
});
  