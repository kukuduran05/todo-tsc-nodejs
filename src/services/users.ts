import { getRepository } from 'typeorm';
import { Users } from '../entity/users';
import { hash } from '../utils/hashing';

export async function findAll() {
    const userRepository = getRepository(Users);
    const users = await userRepository.find({
        select: ['userId', 'name', 'lastname', 'email']
    });
    return users;
}

export async function find(id: string) {
    const select: string[] = ['userId', 'name', 'lastname', 'email'];
    const user = await findOneUser(id, select);
    console.log(user);
    if (user === undefined) {
        return {msg: "User not found!"}
    }
    return user;
}

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
        return {status: 200, msg: 'Username already exists!'};
}

export async function update(idUser: string, data: any) {
    const userRepository = getRepository(Users);
    const select: any[] = ['userId', 'name', 'lastname', 'email', 'password'];
        const existUser = await findOneUser(idUser, select);
        if (existUser) {
            const userData = userRepository.merge(existUser, data);
            userData.password = await hash(userData.password);
            const results = await userRepository.save(userData);
            return results;
        }
        return {status: 200, msg: 'User not found!'};
}

export async function deleteUser(idUser: string) {
    const userRepository = getRepository(Users);
    const select: any[] = ['userId', 'name', 'lastname', 'email'];
    const existUser = await findOneUser(idUser, select);
    if (existUser) {
        await userRepository.delete(idUser);
        return {msg: `User ${existUser.email} was deleted!`};
    }
    return {msg: 'User not found!'};
}

async function findOneUser(idUser: string, selectQuery: any) {
    const userRepository = getRepository(Users);
    const user = await userRepository.findOne({
        select: selectQuery,
        where: { 'userId': idUser}
    });
    return user;
}