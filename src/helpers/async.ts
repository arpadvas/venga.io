import { Router, Request, Response, NextFunction } from "express";

export function asyncWrap(fn: (req: Request, res: Response, next: NextFunction) => any): (req: Request, res: Response, next: NextFunction) => any {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => {
      if (err.errors) {
        if (err.errors.email) {
          res.json({ succes: false, message: err.errors.email.properties.message });
        }
        if (err.errors.name) {
          res.json({ succes: false, message: err.errors.name.properties.message });
        }
        if (err.errors.password) {
          res.json({ succes: false, message: err.errors.password.properties.message });
        }
      } else {
        res.json({ succes: false, message: `Error occured: ${err.message}` });
      }
      next(err);
    });
  };
}