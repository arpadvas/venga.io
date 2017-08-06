import { Router, Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../schemas/user";
import { asyncWrap } from "../helpers/async";


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
  public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.body.email && req.body.name && req.body.password) {
        const user = new User({email: req.body.email, name: req.body.name, password: req.body.password});
        const userEntry = await user.save();
        if (userEntry) {
          res.json({ success: true, message: "User has been saved.", user: userEntry });
        } else {
          res.json({ succes: false, message: "There was an error while saving user." });
        }
    } else {
            res.json({ succes: false, message: "Make sure name, email and password were provided." });
    }
  }

  /**
   * GET all Users.
   */
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
      const users = await User.find({});
      if (!users || users.length === 0) {
        return next(new Error("Could not find any user entry."));
      } else {
        res.send(users);
      }
  }

  /**
   * Check if email is already taken.
   */
  public async checkEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
      if (!req.params.email) {
        res.json({ succes: false, message: "Email was not provided." });
      } else {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
          res.json({ succes: false, message: "Email is already taken." });
        } else {
          res.json({ succes: true, message: "Email is available." });
        }
      }
  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init(): void {
    this.router.post("/register", asyncWrap(this.registerUser));
    this.router.get("/users", asyncWrap(this.getAll));
    this.router.get("/checkEmail/:email", asyncWrap(this.checkEmail));
  }

}

// Create the AuthRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;