import express, { NextFunction, Request, Response } from "express";
import { hash } from "../utils/hashing";
import * as Service from '../services/queries';
import { User } from "interfaces/users";
import { validationHandler } from "../middleware/validationHandler";
import { createUserSchema, updateUserSchema } from "../utils/schemas/users";
import Boom from "@hapi/boom";
import { RowDataPacket } from "mysql";

export const userRouter = express.Router();

// New User
userRouter.post("/", validationHandler(createUserSchema), async(req: Request, res: Response, next: NextFunction) => {
    // Get data from req.body
    const newUser: User = req.body;
    // Encripting password
    const pass = await hash(req.body.password);
    newUser.password = pass;
    // Check if the user is on the DB
    await Service.findOne('users', 'email', newUser.email)
    .then(user => {
        let flag = Service.userExist(user)
        if (flag == true) {
            res.json({
                message: "Username already exists!"
            })
        } else {
            const fields = Object.keys(newUser);
            let vals = Object.values(newUser);
            Service.save('users', fields, vals)
            .then(user => {
                res.json({
                    message: "User created!",
                    data: user
                });
            })
            .catch(err => next(Boom.badRequest(err.message)));
        } 
    })
    .catch(err => next(Boom.badRequest(err.message)));
});

// Get All Users
userRouter.get("/", async(req: Request, res: Response, next: NextFunction) => {
    let fields:any = [
        'userId',
        'name',
        'lastname',
        'email'
    ];
    await Service.findAll('users', fields)
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
    await Service.findOne('users', 'userId', idUser, fields)
    .then(user => res.send(user))
    .catch(err => next(Boom.badRequest(err.message)));
});

// Update User
userRouter.put("/:idUser", validationHandler(updateUserSchema) , async(req: Request, res: Response, next: NextFunction) => {
    const idUser = parseInt(req.params.idUser);
    await Service.findOne('users', 'userId', idUser)
    .then(async user => {
        let flag = Service.userExist(user)
        if (flag == false) {
            res.json({
                message: "Username does not exist!"
            })
        } else {
            let userData = (<RowDataPacket> user);
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
            Service.updateRecord('users', 'userId', keys, values, idUser)
            .then(user => {
                res.json({
                    message: 'User Updated',
                    data: user
                });
            })
            .catch(err => next(Boom.badRequest(err.message)));
        }
    })
    .catch(err => next(Boom.badRequest(err.message)));
});

// Delete User
userRouter.delete("/:idUser", async(req: Request, res: Response, next: NextFunction) => {
    const idUser = parseInt(req.params.idUser);
    await Service.findOne('users', 'userId', idUser)
    .then(user => {
        let flag = Service.userExist(user)
        flag == false ? res.json({
            message: "Username does not exist!"
        }) : deleteUser('users', 'userId', idUser, req, res, next);
    })
    .catch(err => next(Boom.badRequest(err.message)));
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