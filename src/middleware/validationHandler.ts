import Boom from "@hapi/boom";
import { Response, NextFunction} from 'express';

export function validationHandler(schema: any, check:any='body'){
    return async function (req: any, res: Response, next: NextFunction) {
        try {
            const value = await schema.validateAsync(req[check]);
            next();
        }
        catch (err) {
            res.send(Boom.badRequest(err.message));
        }
    };
}