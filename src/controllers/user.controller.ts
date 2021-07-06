import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from '../utils/hashing';
import { Users } from '../entity/users';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find({
        select: ['userId', 'name', 'lastname', 'email']
    });
    return res.json(users);
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(Users).findOne({
        select: ['userId', 'name', 'lastname', 'email'],
        where: { 'userId': req.params.idUser}
    });
    return res.json(user);
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(Users).findOne({'email': req.body.email});
    if (!user) {
        let newUser = new Users();
        newUser.name = req.body.name;
        newUser.lastname = req.body.lastname;
        newUser.email = req.body.email;
        // Encripting password
        const pass = await hash(req.body.password);
        newUser.password = pass;
        const userData = getRepository(Users).create(newUser);
        const results = await getRepository(Users).save(userData);
        return res.json(results);
    }
    return res.json({msg: 'Username already exists!'});
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(Users).findOne(req.params.idUser);
    if (user) {
      const userData = getRepository(Users).merge(user, req.body);
      // Encripting password
      const pass = await hash(userData.password);
      userData.password = pass;
      const results = await getRepository(Users).save(user);
      return res.json(results);
    }
    return res.json({msg: 'User not found!'});
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(Users).findOne(req.params.idUser);
    if (user) {
        const results = await getRepository(Users).delete(req.params.idUser);
        return res.json(results);
    }
    return res.json({msg: 'User not found!'});
};