import { NextFunction, Request, Response } from 'express';
import Boom from '@hapi/boom';
import * as UsersService from '../services/users';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UsersService.findAll();
        return res.json(users);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idUser } = req.params;
        const user = await UsersService.find(idUser);
        return res.json(user);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, lastname, email, password } = req.body;
        const results = await UsersService.create(name, lastname, email, password);
        return res.json(results);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idUser } = req.params;
        const data = req.body;
        const results = await UsersService.update(idUser, data);
        return res.json(results);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idUser } = req.params;
        const results = await UsersService.deleteUser(idUser);
        return res.json(results);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
};