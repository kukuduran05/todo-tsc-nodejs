import express, { NextFunction, Request, Response } from "express";
import { hash } from "../utils/hashing";
import * as Service from '../services/queries';
import { User } from "interfaces/users";
import { validationHandler } from "../middleware/validationHandler";
import { createUserSchema, updateUserSchema } from "../utils/schemas/users";

export const userRouter = express.Router();

// New User
userRouter.post("/", validationHandler(createUserSchema), async(req: Request, res: Response, next: NextFunction) => {
    // Get data from req.body
    const newUser: User = req.body;
    try {
        // Encripting password
        const pass = await hash(req.body.password);
        newUser.password = pass;
        // Check if the user is on the DB
        const query = `SELECT * FROM users WHERE email = "${newUser.email}"`;
        const userExist:any = await Service.findByEmail(query);
        if(userExist == 0){
            // Create new user
            const query = `INSERT INTO users (name, lastname, email, password) VALUES (?)`;
            const values = [
                newUser.name,
                newUser.lastname,
                newUser.email,
                newUser.password
            ];
            const userCreated: any = await Service.save(query, [values]);
            res.json({
                message: 'User Created',
                data: userCreated
            });
        } else {
            res.json({
                message: 'Username already exists!'
            })
        }
    } catch(error) {
        next(error);
    } 
    res.json('Create User');
});

// Get All Users
userRouter.get("/", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userList = await Service.findAll('users');
        res.json(userList);
    } catch (err) {
        next(err)
    }
});

// Get one user
userRouter.get("/:idUser", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const idUser = parseInt(req.params.idUser);
        const user = await Service.findOne('users', 'userId', idUser);
        res.send(user);
    } catch (err) {
        next (err)
    }
});

// Update User
userRouter.put("/:idUser", validationHandler(updateUserSchema) ,async(req: Request, res: Response, next: NextFunction) => {
    try {
        const idUser = parseInt(req.params.idUser);
        const user:any = await Service.findOne('users', 'userId', idUser);

        if(user == 0){
            res.json({
                message: "Username does not exist!"
            })
        } else {
            const name = req.body.name ? req.body.name : user[0].name;
            const lastname = req.body.lastname ? req.body.lastname : user[0].lastname;
            const email = req.body.email ? req.body.email : user[0].email;
            const password = req.body.password ? req.body.password : user[0].password;
            const userBody = {
                name: name,
                lastname: lastname,
                email: email,
                password: password
            }

            // Encripting password
            const pass = await hash(userBody.password);
            userBody.password = pass;
            console.log(userBody);

            const query = `UPDATE users SET name = (?),
            lastname = (?),
            email = (?), 
            password = (?) 
            WHERE userId = (?)`;
            const values = [
                userBody.name,
                userBody.lastname,
                userBody.email,
                userBody.password,
                idUser
            ];
            const userUpdated = await Service.updateRecord(query, values);
            res.json({
                message: 'User Updated',
                data: userUpdated
            });
        }
    } catch (error) {
        next(error);
    }
});

// Delete User
userRouter.delete("/:idUser", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const idUser = parseInt(req.params.idUser);
        const userExist:any = await Service.findOne('users', 'userId', idUser);
        if(userExist == 0) {
            res.json({
                message: "Username does not exist!"
            })
        } else {
            const userId = parseInt(req.params.idUser);
            const user = await Service.deleteRecord('users', 'userId', userId);
            res.json({
                message: "User Deleted",
                data: user
            });
        }
    } catch (err) {
        next (err)
    }
});