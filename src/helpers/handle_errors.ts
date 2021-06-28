import { Request, Response, NextFunction } from "express";

// Handle Errors
declare module 'express-serve-static-core' {
    interface Response {
        error: (code: number, message: string) => Response,
        success: (code: number, message: string, result: any) => Response
    }
}

export const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    res.error = (statusCode: number, errorMessage: string) => res.status(statusCode).json(errorMessage);
    res.success = (statusCode: number, message: string, result: any) => res.status(statusCode).json({
        message,
        result
    });
    return next();
};
