import { NextFunction, Request, Response } from "express";

export function timeGlobal(req: Request, res: Response, next: NextFunction) {
    console.log(`metodo ${req.method} en la ruta ${req.url} a la hora ${new Date}`);
        next();
}