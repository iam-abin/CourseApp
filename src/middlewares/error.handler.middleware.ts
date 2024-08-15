import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const message = err.message || "Internal Server Error";
    if(err instanceof CustomError){
        
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }
    console.log(err.stack);
    res.status(500).send({
        errors: [{ message: err.message }]
    });
};
