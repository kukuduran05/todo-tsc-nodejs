import { Request, Response } from 'express';
import { getRepository  } from 'typeorm';
import { hash, match } from '../utils/hashing';
import { Users } from '../entity/users';
import Jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<Response> => {
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

export const login = async (req: Request, res: Response ): Promise<Response> => {
    const user = await getRepository(Users).findOne({'email': req.body.email});
    if(user){
        const loginUser = req.body;
        let isPasswordMatching = await match(loginUser.password, user.password);
        if(isPasswordMatching === true) {
            // Create Token
            let secret:any = process.env.TOKEN_SECRET;
            const token = Jwt.sign({
                id: user.userId,
                email: user.email
            }, secret)

            return res.header('auth-token', token).json({
                error: null,
                data: {token}
            })
        }
    }
    return res.json({msg: 'User not found!'});
}