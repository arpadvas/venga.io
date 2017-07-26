import { Router, Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/user";
import { User } from "../schemas/user";

import App from "../App";

export class AuthRouter {
  router: Router;

  /**
   * Initialize the AuthRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * Register new user account.
   */
  public registerUser(req: Request, res: Response, next: NextFunction): void {
    if (req.body.email && req.body.name && req.body.password) {
        const user = new User({email: req.body.email, name: req.body.name, password: req.body.password});
        user.save((err) => {
            if (err) {
                return next(err);
            }
            res.json({ success: true, message: "User has been saved.", user: user });
        });
    } else {
            res.json({ succes: false, message: "Make sure name, email and password were provided." });
    }
  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init(): void {
    this.router.post("/register", this.registerUser);
  }

}

// Create the AuthRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;