import express, { NextFunction, Request, response, Response } from "express";
import { createUserSchema, loginUserSchema } from '../utils/schemas/users';
import { User } from "interfaces/users";
import * as Service from "../services/queries";
import Boom from "@hapi/boom";
import { hash, match } from '../utils/hashing';
//import bcrypt from "bcrypt";
import { validationHandler } from '../middleware/validationHandler';
import Jwt from "jsonwebtoken";
import { string } from "joi";


export const authRouter = express.Router();

const table = 'users';

// Register
authRouter.post("/register", validationHandler(createUserSchema), async(req: Request, res: Response, next: NextFunction) => {
    // Check if the user is on the DB
    const isEmailExist: any = await Service.findOne(table, 'email', req.body.email);
    if (isEmailExist.length > 0) {
        res.json({
            message: "Username already exists!"
        })
    }
    // Get data from req.body
    const newUser: User = req.body;
    // Encripting password
    const pass = await hash(req.body.password);
    newUser.password = pass;
    const fields = Object.keys(newUser);
    let vals = Object.values(newUser);
    try {
        const savedUser = await Service.save(table, fields, vals);
        res.json({
            message: "User created!",
            data: savedUser
        });
    } catch (err) {
        next(Boom.badRequest(err.message));
    }   
});

// Login
authRouter.post("/login", validationHandler(loginUserSchema), async(req: Request, res: Response, next: NextFunction) => {
    // Check if the user is on the DB
    const isEmailExist: any = await Service.findOne(table, 'email', req.body.email);
    if (isEmailExist.length == 0) {
        res.json({
            message: "Username does not exists!"
        })
    }
    // Get data from req.body
    const user: User = req.body;

    let isPasswordMatching = await match(user.password, isEmailExist[0].password);
    if(isPasswordMatching == true) {
        // Create Token
        let secret:any = process.env.TOKEN_SECRET;
        
        const token = Jwt.sign({
            email: user.email,
            password: user.password
        }, secret)
        
        res.header('auth-token', token).json({
            error: null,
            data: {token}
        })
    } else {
        next(Boom.badRequest('Password incorrect!'));
    }
});

authRouter.post("/logout", async(req: Request, res: Response, next: NextFunction) => {
    res.setHeader('auth-token', ['Authorization=;Max-age=0']);
    res.send(200);
});