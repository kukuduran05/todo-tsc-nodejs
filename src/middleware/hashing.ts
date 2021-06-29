import { NextFunction, Request, Response } from 'express';
import bcrypt from "bcrypt";

export async function hash(password: string) {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    return pass;
}