import express, {Request, Response} from "express";
import * as userModel from "../models/user";
import { User, BasicUser} from "../types/users";
import bcrypt from 'bcrypt';
import { registrationSchema }  from '../helpers/validation_schema';

export async function register(req: Request, res: Response): Promise<Response> {
    //TODO code from register new user
    try {
        const data = await registrationSchema.validateAsync({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });
        const newUser: User = data;

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        newUser.password = password;
        userModel.existUser(newUser.email, (err: Error, res: any) => {
            console.log(res);
        });
        /*userModel.create(newUser, (err: Error, userId: number) => {
            if (err) throw err;
            //res.status(200).json({"message": `User: ${newUser.name} created successfully!`});
            console.log(userId);
            if (err) {
                return res.status(500).json({"message": err.message});
            }
            res.status(200).json({"userId": userId, "data": newUser});
        });*/
        
    } catch (err){
        res.json(err);
        console.error(err);
    }
    return res.json('Register'); 
    /*const newUser: User = req.body;
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    newUser.password = password;
    userModel.create(newUser, (err: Error, userId: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"orderId": userId, "data": newUser});
    });*/
    
}

export function login(req: Request, res: Response): Response {
    // TODO code for login
    /*const email = req.body.email;
    userModel.existUser(email, (err: Error, user: string) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        if(user != "") {
            // TODO Access to Welcome
            console.log('Welcome to API');
        } else {
            // TODO redirect to /login
            console.log('/auth/login');
            res.redirect('http://localhost/auth/login');
        }
    });*/
    return res.json('Login'); 
 }