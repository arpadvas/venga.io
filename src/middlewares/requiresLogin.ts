import * as express from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../config/reader";

export default async function requiresLogin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const token: any = req.headers["authorization"];
    if (token) {
        jwt.verify(token, config.token_secret, function(err: any, decoded: any): void {
            if (err) {
                res.json({ succes: false, message: "You are not eligible to access this route! Token is invalid!" });
            } else {
                (<any>req)["decoded"] = decoded;
                next();
            }
        });
    } else {
        res.json({ succes: false, message: "You are not eligible to access this route! Token does not exist!" });
    }
}