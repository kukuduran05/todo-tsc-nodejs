import { Request, Response } from 'express';
// DB
import { connect } from '../database'
//Interfaces
import { User } from '../interface/Users';

export async function listUsers(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const cats = await conn.query('SELECT * FROM users');
        return res.json(cats[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createUser(req: Request, res: Response) {
    const newUser: User = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO users SET ?', [newUser]);
    res.json({
        message: 'New User Created'
    });
}

export async function getUser(req: Request, res: Response) {
    const id = req.params.userId;
    const conn = await connect();
    const users = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json(users[0]);
}

export async function deleteUser(req: Request, res: Response) {
    const id = req.params.userId;
    const conn = await connect();
    await conn.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({
        message: 'User deleted'
    });
}

export async function updateUser(req: Request, res: Response) {
    const id = req.params.userId;
    const updatePost: User = req.body;
    const conn = await connect();
    await conn.query('UPDATE users set ? WHERE id = ?', [updatePost, id]);
    res.json({
        message: 'User Updated'
    });
}