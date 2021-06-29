import express, { NextFunction, Request, Response } from "express";
import { registrationSchema } from '../helpers/validation_schema';
import { errorMiddleware, successfullMiddleware } from '../middleware/error';
import { User } from "interfaces/users";
import bcrypt from "bcrypt";
import MySQL from "../services/database";
import { RowDataPacket } from "mysql2";
import { hash } from '../middleware/hashing';

export const authRouter = express.Router();

// Register
authRouter.post("/register", async(req: Request, res: Response, next: NextFunction) => {
    try {
        // Get data from req.body
        const data = await registrationSchema.validateAsync({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });
        const newUser: User = data;
        // Encripting password
        const pass = await hash(req.body.password);
        newUser.password = pass;
        // Check if the user is on the DB
        try {
            const query = `SELECT * FROM users WHERE email = ${MySQL.escape(newUser.email)}`;
            MySQL.query(query, (err: Error, results:any) => {
                if (err) {console.log(err)}
                const user = (<RowDataPacket> results);
                if (user) {
                    res.send({status: 400, message: "Already exists another user with this email, try with another account!"})
                } else {
                    // Create user
                    try {
                        const query = `INSERT INTO users (name, lastname, email, password)
                        VALUES (${MySQL.escape(newUser.name)}, ${MySQL.escape(newUser.lastname)}, ${MySQL.escape(newUser.email)}, ${MySQL.escape(newUser.password)})`
                        MySQL.query(query, (err: Error, results:Object[]) => {
                            if (err) {console.log(err)}
                            const user = (<RowDataPacket> results);
                            const message = {
                                message: {
                                    insertId: user.insertId,
                                    name: newUser.name,
                                    lastname: newUser.lastname,
                                    email: newUser.email
                                }
                            }
                            successfullMiddleware(message, req, res, next)
                        });
                    } catch (error) {
                        errorMiddleware(error, req, res, next);
                    }
                }
            });
        } catch (error) {
            errorMiddleware(error, req, res, next);
        }
    } catch (error) {
        error.status = 400;
        errorMiddleware(error, req, res, next);
    }
});

// Login
authRouter.post("/login", async(req: Request, res: Response) => {
    // TODO aqui va el modelo
    res.json('Create Login');
});