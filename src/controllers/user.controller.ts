import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/users';
import Boom from '@hapi/boom';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getRepository(Users).find({
            select: ['userId', 'name', 'lastname', 'email']
        });
        return res.json(users);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getRepository(Users).findOne({
            select: ['userId', 'name', 'lastname', 'email'],
            where: { 'userId': req.params.idUser}
        });
        return res.json(user);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getRepository(Users).findOne({'email': req.body.email});
        if (!user) {
            let newUser = new Users();
            newUser.name = req.body.name;
            newUser.lastname = req.body.lastname;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            const userData = getRepository(Users).create(newUser);
            const results = await getRepository(Users).save(userData);
            return res.json(results);
        }
        return res.json({msg: 'Username already exists!'});
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getRepository(Users).findOne(req.params.idUser);
        if (user) {
          const userData = getRepository(Users).merge(user, req.body);
          const results = await getRepository(Users).save(userData);
          return res.json(results);
        }
        return res.json({msg: 'User not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getRepository(Users).findOne(req.params.idUser);
        if (user) {
            const results = await getRepository(Users).delete(req.params.idUser);
            return res.json(results);
        }
        return res.json({msg: 'User not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
};