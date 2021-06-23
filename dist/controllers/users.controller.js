"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DB
//import { connect } from '../database'
//Interfaces
//import { User } from '../models/Users';
//export async function listUsers(req: Request, res: Response) {
//try {
/*
const conn = await connect();
const users = await conn.query('SELECT * FROM users', function(error, results, fields){
    if (error) {
        throw error;
    }
    console.log(results);
});
conn.end(); */
/*const sql = `SELECT * FROM users`;
const users = conn.query(sql, function (err, result) {
    if (err) throw err;
    return result;
});
console.log(users);*/
/*}
catch (e) {
    console.log(e)
}*/
//}
/*
export async function createUser(req: Request, res: Response) {
    /*const newUser: User = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO users SET ?', [newUser]);
    res.json({
        message: 'New User Created'
    });
}

export async function getUser(req: Request, res: Response) {
    /*const id = req.params.userId;
    const conn = await connect();
    const users = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json(users[0]);
    res.json({
        message: 'get one user'
    });
}

export async function deleteUser(req: Request, res: Response) {
    /*const id = req.params.userId;
    const conn = await connect();
    await conn.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({
        message: 'User deleted'
    });
    res.json({
        message: 'User deleted'
    });
}

export async function updateUser(req: Request, res: Response) {
    /*const id = req.params.userId;
    const updatePost: User = req.body;
    const conn = await connect();
    await conn.query('UPDATE users set ? WHERE id = ?', [updatePost, id]);
    res.json({
        message: 'User Updated'
    });
    res.json({
        message: 'User updated'
    });
}*/ 
//# sourceMappingURL=users.controller.js.map