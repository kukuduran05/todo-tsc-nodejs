import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/users';
import Boom from '@hapi/boom';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = getRepository(Users);
        const users = await userRepository.find({
            select: ['userId', 'name', 'lastname', 'email']
        });
        return res.json(users);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idUser } = req.params;
        const user = await findOneUser(idUser);
        return res.json(user);
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = getRepository(Users);
        const { name, lastname, email, password } = req.body;
        const existUser = await userRepository.findOne({'email': email});
        if (!existUser) {
            var newUser = {
                name,
                lastname,
                email,
                password
            }
            const userData = userRepository.create(newUser);
            const results = await userRepository.save(userData);
            return res.json(results);
        }
        return res.json({msg: 'Username already exists!'});
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = getRepository(Users);
        const { idUser } = req.params;
        const existUser = await findOneUser(idUser);
        if (existUser) {
          const userData = userRepository.merge(existUser, req.body);
          const results = await userRepository.save(userData);
          return res.json(results);
        }
        return res.json({msg: 'User not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = getRepository(Users);
        const { idUser } = req.params;
        const existUser = await findOneUser(idUser);
        if (existUser) {
            await userRepository.delete(idUser);
            return res.json({msg: `User ${existUser.email} was deleted!`});
        }
        return res.json({msg: 'User not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
};

const findOneUser = async(idUser: string) => {
    const userRepository = getRepository(Users);
    const user = await userRepository.findOne({
        select: ['userId', 'name', 'lastname', 'email'],
        where: { 'userId': idUser}
    });
    return user;
}