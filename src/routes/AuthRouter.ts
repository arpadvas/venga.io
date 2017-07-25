import { Router, Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/user";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";

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
    res.send("hello from auth router");
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