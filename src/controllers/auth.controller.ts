import { NextFunction, Request, Response } from 'express';
import { getRepository  } from 'typeorm';
import { match } from '../utils/hashing';
import { Users } from '../entity/users';
import Jwt from "jsonwebtoken";
import Boom from '@hapi/boom';

export const register = async (req: Request, res: Response, next: NextFunction) => {
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

export const login = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const { email, password} = req.body;
        const user = await getRepository(Users).findOne({'email': email});
        if(user){
            let isPasswordMatching = await match(password, user.password);
            if(isPasswordMatching === true) {
                // Create Token
                let secret:any = process.env.TOKEN_SECRET;
                const token = Jwt.sign({
                    id: user.userId,
                    email: user.email
                }, secret)
    
                return res.header('auth-token', token).json({
                    data: {token}
                })
            }
        }
        return res.json({msg: 'User not found!'});
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
}