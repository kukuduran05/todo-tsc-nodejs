import { NextFunction, Request, Response } from 'express';
import { getRepository  } from 'typeorm';
import { match } from '../utils/hashing';
import { Users } from '../entity/users';
import Jwt from "jsonwebtoken";
import Boom from '@hapi/boom';
import * as AuthService from '../services/auth';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, lastname, email, password } = req.body;
        const newUser = await AuthService.create(name, lastname, email, password);
        return res.json(newUser);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const login = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const { email, password} = req.body;
        const results = await AuthService.login(email, password);
        return res.json(results);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

// verify the token and return it if it's valid
export const verifyToken = async (req: Request, res: Response , next: NextFunction) => {
    // check header or url parameters or post parameters for token
    var token:any = req.query.token;
    const results = AuthService.verify(token);
    return res.json(results);
}