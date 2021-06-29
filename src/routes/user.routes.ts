import express, { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import MySQL from "../services/database";
import bcrypt from "bcrypt";
import { errorMiddleware, successfullMiddleware } from '../middleware/error';
import * as Service from '../services/queries';

export const userRouter = express.Router();

// New User
userRouter.post("/", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create User');
});

// Get All Users
userRouter.get("/", async(req: Request, res: Response, next: NextFunction) => {
    Service.findAll('users', req, res, next);
});

// Get one user
userRouter.get("/:idUser", async(req: Request, res: Response, next: NextFunction) => {
    const data = {
        id: req.params.idUser,
        table: 'users',
        field: 'userId'
    }
    Service.findOne(data, req, res, next);
});

// Update User
userRouter.put("/:idUser", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const idUser = req.params.idUser;
        const user = req.body;
        // Encripting password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(user.password, salt);
        user.password = password;
        const query = `UPDATE users SET name = ${MySQL.escape(user.name)},
            lastname = ${MySQL.escape(user.lastname)},
            email = ${MySQL.escape(user.email)}, 
            password = ${MySQL.escape(user.password)} 
            WHERE userId = ${MySQL.escape(idUser)}`;
        MySQL.query(query, (err: Error, results: any) => {
            if (err) {console.log(err)}
            //const userUpdated = (<RowDataPacket> results);
            const data = {
                data: `User ${user.name} with Id ${idUser} was updated successfully!`
            }
            successfullMiddleware(data, req, res, next);
        });
    } catch (error) {
        errorMiddleware(error, req, res, next);
    }
});

// Delete User
userRouter.delete("/:idUser", async(req: Request, res: Response, next: NextFunction) => {
    const data = {
        id: req.params.idUser,
        table: 'users',
        field: 'userId'
    }
    Service.findOne(data, req, res, next);
});