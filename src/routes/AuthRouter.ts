import { Router, Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../schemas/user";
import { asyncWrap } from "../helpers/async";
import { authenticateUser } from "../helpers/auth";
import * as jwt from "jsonwebtoken";
import { config } from "../config/reader";
import requiresLogin from "../middlewares/requiresLogin";


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
          const token = await jwt.sign({userId: userEntry._id}, config.token_secret, {expiresIn: config.token_expire});
          res.json({ success: true, message: "User has been saved.", token: token, user: { email: userEntry.email } });
      }
    } else {
            res.json({ success: false, message: "Make sure name, email and password were provided." });
    }
  }

  /**
   * Login user.
   */
  public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.body.email && req.body.password) {
        const user: IUserModel = await User.findOne({ email: req.body.email });
        if (user) {
          const isAuthenticated = await authenticateUser(req.body.password, user.password);
          if (isAuthenticated) {
            const token = await jwt.sign({userId: user._id}, config.token_secret, {expiresIn: config.token_expire});
            res.json({ success: true, message: "Successfully logged in.", token: token, user: { email: user.email } });
          } else {
            res.json({ success: false, message: "Wrong password has been provided!" });
          }
        } else {
          res.json({ success: false, message: "There is no user registered with the email provided!" });
        }
    } else {
            res.json({ success: false, message: "Make sure email and password were provided." });
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
        res.json({ success: false, message: "Email was not provided." });
      } else {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
          res.json({ success: false, message: "Email is already taken." });
        } else {
          res.json({ success: true, message: "Email is available." });
        }
      }
  }

  /**
   * Get actual user profile.
   */
  public async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
      if ((<any>req)["decoded"]) {
        const user = await User.findOne({ _id: (<any>req)["decoded"].userId }).select("name email");
        if (user) {
          res.json({ success: true, user: user });
        } else {
          res.json({ success: false, message: "User is not found!" });
        }
      } else {
        res.json({ success: false, message: "Token has not been provided!" });
      }
  }

  /**
   * Get actual user profile.
   */
  public async getUserDetailsForNavbar(req: Request, res: Response, next: NextFunction): Promise<void> {
      if ((<any>req)["decoded"]) {
        const user = await User.findOne({ _id: (<any>req)["decoded"].userId }).select("name");
        if (user) {
          res.json({ success: true, user: user });
        } else {
          res.json({ success: false, message: "User is not found!" });
        }
      } else {
        res.json({ success: false, message: "Token has not been provided!" });
      }
  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init(): void {
    this.router.post("/register", asyncWrap(this.registerUser));
    this.router.post("/login", asyncWrap(this.loginUser));
    this.router.get("/users", asyncWrap(this.getAll));
    this.router.get("/checkEmail/:email", asyncWrap(this.checkEmail));
    this.router.get("/profile", requiresLogin, asyncWrap(this.getProfile));
    this.router.get("/userDetailsForNavbar", requiresLogin, asyncWrap(this.getUserDetailsForNavbar));
  }

}

// Create the AuthRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;