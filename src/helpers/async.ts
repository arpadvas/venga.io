import { Router, Request, Response, NextFunction } from "express";

export function asyncWrap(fn: (req: Request, res: Response, next: NextFunction) => any): (req: Request, res: Response, next: NextFunction) => any {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}