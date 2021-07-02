
import Boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
    const {
        output : { statusCode, payload },
    } = err;
    res.status(statusCode || 500);
    res.json(err.message);
}