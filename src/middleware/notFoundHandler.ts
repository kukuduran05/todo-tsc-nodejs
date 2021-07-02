import Boom from '@hapi/boom';
import { Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response) {
  const {
    output: { statusCode, payload },
  } = Boom.notFound();

  res.status(statusCode).json(payload);
}