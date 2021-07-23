import { NextFunction, Request, Response } from 'express';
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
