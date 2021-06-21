import { Request, Response } from 'express';

//DB
import { connect } from '../database';

import { User } from '../interface/user';

export async function getUsers(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const users = await conn.query('SELECT * FROM users');
    return res.json(users[0]);
}

export async function createUser(req: Request, res: Response) {
    const newUser: User = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO users SET ?', [newUser]);
    return res.json({
        message: 'User Created'
    });
}
