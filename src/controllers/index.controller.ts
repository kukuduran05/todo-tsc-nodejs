import { Request, Response } from 'express'

export function home(req: Request, res: Response): Response {
   return res.json('Welcome to the Api Login'); 
}