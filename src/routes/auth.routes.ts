import express, { NextFunction, Request, Response } from "express";
//import { registrationSchema } from '../helpers/validation_schema';
import { createUserSchema } from '../utils/schemas/users';
import { User } from "interfaces/users";
//import MySQL from "../services/database";
import * as Service from "../services/queries";
import { hash } from '../utils/hashing';
import { validationHandler } from '../middleware/validationHandler';

export const authRouter = express.Router();

// Register
authRouter.post("/register", validationHandler(createUserSchema), async(req: Request, res: Response, next: NextFunction) => {
    // Get data from req.body
    const newUser: User = req.body;
    try {
        // Encripting password
        const pass = await hash(req.body.password);
        newUser.password = pass;
        // Check if the user is on the DB
        const query = `SELECT * FROM users WHERE email = "${newUser.email}"`;
        const userExist:any = await Service.findByEmail(query);
        if(userExist == 0){
            // Create new user
            const query = `INSERT INTO users (name, lastname, email, password) VALUES (?)`;
            const values = [
                newUser.name,
                newUser.lastname,
                newUser.email,
                newUser.password
            ];
            const userCreated: any = await Service.save(query, [values]);
            res.json({
                message: 'User Created',
                data: userCreated
            });
        } else {
            res.json({
                message: 'Username already exists!'
            })
        }
    } catch(error) {
        next(error);
    } 
});

// Login
authRouter.post("/login", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create Login');
});