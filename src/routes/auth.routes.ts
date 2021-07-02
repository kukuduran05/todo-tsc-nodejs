import express, { NextFunction, Request, Response } from "express";
import { createUserSchema } from '../utils/schemas/users';
import { User } from "interfaces/users";
import * as Service from "../services/queries";
import Boom from "@hapi/boom";
import { hash } from '../utils/hashing';
import { validationHandler } from '../middleware/validationHandler';

export const authRouter = express.Router();

// Register
authRouter.post("/register", validationHandler(createUserSchema), async(req: Request, res: Response, next: NextFunction) => {
    // Get data from req.body
    const newUser: User = req.body;
    // Encripting password
    const pass = await hash(req.body.password);
    newUser.password = pass;
    // Check if the user is on the DB
    await Service.findOne('users', 'email', newUser.email)
    .then(user => {
        let flag = Service.userExist(user)
        if (flag == true) {
            res.json({
                message: "Username already exists!"
            })
        } else {
            const fields = Object.keys(newUser);
            let vals = Object.values(newUser);
            Service.save('users', fields, vals)
            .then(user => {
                res.json({
                    message: "User created!",
                    data: user
                });
            })
            .catch(err => next(Boom.badRequest(err.message)));
        } 
    })
    .catch(err => next(Boom.badRequest(err.message)));
});

// Login
authRouter.post("/login", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create Login');
});