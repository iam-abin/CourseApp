import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors"; 


export interface IPayload {
    userId: number;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IPayload;
        }
    }
}

export const auth =  (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    if (!token) throw new NotAuthorizedError("UnAuthorized Request");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as IPayload; 

        req.user = decoded;
        console.log("req.user", req.user);

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
  
};
