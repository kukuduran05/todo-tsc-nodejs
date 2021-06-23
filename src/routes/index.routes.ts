import express, {Request, Response} from "express";
import * as userModel from "../models/user";
import { User, BasicUser} from "../types/users";
import bcrypt from 'bcrypt';

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    const newUser: User = req.body;
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    newUser.password = password;
    userModel.create(newUser, (err: Error, userId: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"orderId": userId, "data": newUser});
    });
});

authRouter.post("/login", async (req: Request, res: Response) => {
    const email = req.body.email;
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
    });
});

export {authRouter};
