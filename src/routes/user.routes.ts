import express, { NextFunction, Request, Response } from "express";
import { hash } from "../utils/hashing";
import * as Service from '../services/queries';
import { User } from "interfaces/users";
import { validationHandler } from "../middleware/validationHandler";
import { createUserSchema, updateUserSchema } from "../utils/schemas/users";
import Boom from "@hapi/boom";
import { RowDataPacket } from "mysql";

export const userRouter = express.Router();

const table = 'users';

// New User
userRouter.post("/", validationHandler(createUserSchema), async(req: Request, res: Response, next: NextFunction) => {
    // Check if the user is on the DB
    const isEmailExist: any = await Service.findOne(table, 'email', req.body.email);
    if (isEmailExist.length > 0) {
        res.json({
            message: "Username already exists!"
        })
    }
    // Get data from req.body
    const newUser: User = req.body;
    // Encripting password
    const pass = await hash(req.body.password);
    newUser.password = pass;
    const fields = Object.keys(newUser);
    let vals = Object.values(newUser);
    try {
        const savedUser = await Service.save(table, fields, vals);
        res.json({
            message: "User created!",
            data: savedUser
        });
    } catch (err) {
        next(Boom.badRequest(err.message));
    }
});

// Get All Users
userRouter.get("/", async(req: Request, res: Response, next: NextFunction) => {
    let fields:any = [
        'userId',
        'name',
        'lastname',
        'email'
    ];
    await Service.findAll(table, fields)
    .then(userList => res.send(userList))
    .catch(err => next(Boom.badRequest(err.message)));
});

// Get one user
userRouter.get("/:idUser", async(req: Request, res: Response, next: NextFunction) => {
    const idUser = parseInt(req.params.idUser);
    let fields:any = [
        'userId',
        'name',
        'lastname',
        'email'
    ];
    await Service.findOne(table, 'userId', idUser, fields)
    .then(user => res.send(user))
    .catch(err => next(Boom.badRequest(err.message)));
});

// Update User
userRouter.put("/:idUser", validationHandler(updateUserSchema) , async(req: Request, res: Response, next: NextFunction) => {
    // Check if the user is on the DB
    const idUser = parseInt(req.params.idUser);
    const isEmailExist: any = await Service.findOne(table, 'userId', idUser);
    if (isEmailExist.length == 0) {
        res.json({
            message: "Username does not exist!"
        })
    }
    try {
        let userData = (<RowDataPacket> isEmailExist);
        const name = req.body.name ? req.body.name : userData[0].name;
        const lastname = req.body.lastname ? req.body.lastname : userData[0].lastname;
        const email = req.body.email ? req.body.email : userData[0].email;
        const password = req.body.password ? req.body.password : userData[0].password;
        const userBody = {
            name: name,
            lastname: lastname,
            email: email,
            password: password
        }
        // Encripting password
        const pass = await hash(userBody.password);
        userBody.password = pass;
        const values = Object.values(userBody);
        const keys = Object.keys(userBody);
        await Service.updateRecord(table, 'userId', keys, values, idUser)
        .then(user => {
            res.json({
                message: 'User Updated',
                data: user
            })
        })
    } catch(err) {
        next(Boom.badRequest(err.message));
    }

});

// Delete User
userRouter.delete("/:idUser", async(req: Request, res: Response, next: NextFunction) => {
    // Check if the user is on the DB
    const idUser = parseInt(req.params.idUser);
    const isEmailExist: any = await Service.findOne(table, 'userId', idUser);
    if (isEmailExist.length == 0) {
        res.json({
            message: "Username does not exist!"
        })
    }
    try {
        deleteUser(table, 'userId', idUser, req, res, next);
    } catch (err) {
        next(Boom.badRequest(err.message));
    }
});

function deleteUser(table: string, field: string, id: any, req: Request, res: Response, next: NextFunction){
    Service.deleteRecord(table, field, id)
    .then(user => {
        res.json({
            message: "User deleted!"
        });
    })
    .catch(err => next(Boom.badRequest(err.message)));
}