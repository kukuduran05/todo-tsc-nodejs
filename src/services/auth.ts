import { getRepository  } from 'typeorm';
import { Users } from '../entity/users';
import Jwt from "jsonwebtoken";
import { match } from '../utils/hashing';


export async function create(name: string, lastname: string, email: string, password: string) {
    const userRepository = getRepository(Users);
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
        return results;
    }
    return {msg: 'Username already exists!'};
}

export async function login(email: string, password: string) {
    const user = await getRepository(Users).findOne({'email': email});
    if(user){
        let isPasswordMatching = await match(password, user.password);
        if(isPasswordMatching === true) {
            // Create Token
            let secret:any = process.env.TOKEN_SECRET;
            const token = Jwt.sign({
                id: user.userId,
                email: user.email
            }, secret, {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            })

            return {
                user: email, token
            };
        }
    }
    const info = {
        msg: 'User not found!'
    }
    return info;
}
