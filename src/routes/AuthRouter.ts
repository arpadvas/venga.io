import { Router, Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../schemas/user";
import { asyncWrap } from "../helpers/async";
import { authenticateUser } from "../helpers/auth";
import { generateActivateToken } from "../helpers/random";
import { transporter } from "../helpers/mailer";
import * as jwt from "jsonwebtoken";
import { config } from "../config/index";
import requiresLogin from "../middlewares/requiresLogin";
import { SentMessageInfo } from "nodemailer";


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
        const activateToken = generateActivateToken();
        const user = new User({email: req.body.email, name: req.body.name, password: req.body.password, activateToken: activateToken});
        const userEntry = await user.save();
        if (userEntry) {
          const token = await jwt.sign({userId: userEntry._id}, config.token_secret, {expiresIn: config.token_expire});
          res.json({ success: true, message: "User has been saved.", token: token, user: { email: userEntry.email } });
          const mailOptions: {from: string, to: string, subject: string, text: any} = {
              from: config.mail.user,
              to: req.body.email,
              subject: "Activation code",
              text: `Hello ${req.body.name}, Please find your activation code enclosed: ${activateToken}.`
          };
          transporter.sendMail(mailOptions, function(err: Error, res: SentMessageInfo): void {
            if (err) {
                console.log(err);
            } else {
                console.log("Email sent.");
            }
          });
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
   * Resend activation code.
   */
  public async resendActCode(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      if (req.body.password) {
        const tempUser: IUserModel = await User.findOne({ _id: (<any>req)["decoded"].userId }).select("password");
        if (tempUser) {
          const isAuthenticated = await authenticateUser(req.body.password, tempUser.password);
          if (isAuthenticated) {
            const user: IUserModel = await User.findOne({ _id: (<any>req)["decoded"].userId }).select("name email activateToken");
            if (user) {
              const activateToken = generateActivateToken();
              user.activateToken = activateToken;
              const userUpdate = await user.save();
              if (userUpdate) {
                res.json({ success: true, message: "Activation code has been sent!" });
                const mailOptions: {from: string, to: string, subject: string, text: any} = {
                  from: config.mail.user,
                  to: user.email,
                  subject: "Activation code",
                  text: `Hello ${user.name}, Please find your activation code enclosed: ${activateToken}.`
                };
                transporter.sendMail(mailOptions, function(err: Error, res: SentMessageInfo): void {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log("Email sent.");
                  }
                });
              } else {
                res.json({ success: false, message: "There was an error while saving account!" });
              }
            }
          } else {
            res.json({ success: false, message: "Authentication failed!" });
          }
        } else {
          res.json({ success: false, message: "There is no user registered with the details provided!" });
        }
      } else {
        res.json({ success: false, message: "Password has not been provided!" });
      }
    } else {
      res.json({ success: false, message: "Token has not been provided!" });
    }
  }

  /**
   * Activate user.
   */
  public async activateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      if (req.body.token) {
        const user: IUserModel = await User.findOne({ _id: (<any>req)["decoded"].userId }).select("name email activateToken active");
        if (user) {
          if (user.activateToken == req.body.token) {
            user.active = true;
            const userUpdate = await user.save();
            if (userUpdate) {
              res.json({ success: true, message: "Account has been activated!" });
              const mailOptions: {from: string, to: string, subject: string, text: any} = {
                from: config.mail.user,
                to: user.email,
                subject: "Activation success",
                text: `Hello ${user.name}, Your account has been activated.`
              };
              transporter.sendMail(mailOptions, function(err: Error, res: SentMessageInfo): void {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Email sent.");
                }
              });
            } else {
              res.json({ success: false, message: "There was an error while activating account!" });
            }
          } else {
            res.json({ success: false, message: "Activation code is not correct. Please try again!" });
          }
        } else {
          res.json({ success: false, message: "There is no user registered with the details provided!" });
        }
      } else {
        res.json({ success: false, message: "Activation code has not been provided!" });
      }
    } else {
        res.json({ success: false, message: "Token has not been provided!" });
    }
  }

  /**
   * Renew auth token.
   */
  public async renewAuthToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body);
    if (req.body.email) {
        const user: IUserModel = await User.findOne({ email: req.body.email });
        if (user) {
          const token = await jwt.sign({userId: user._id}, config.token_secret, {expiresIn: config.token_expire});
          res.json({ success: true, message: "Token has successfully been renewed.", token: token, user: { email: user.email } });
        } else {
          res.json({ success: false, message: "There is no user registered with the email provided!" });
        }
    } else {
            res.json({ success: false, message: "User is not logged in." });
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
   * Check if user is active.
   */
  public async checkActive(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      const user = await User.findOne({ _id: (<any>req)["decoded"].userId }).select("active");
      if (user) {
        if (user.active) {
          res.json({ success: true, user: user });
        } else {
          res.json({ success: false, message: "User is not activated yet!" });
        }
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
   * Get actual user details for navbar.
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
    this.router.post("/resend", requiresLogin, asyncWrap(this.resendActCode));
    this.router.post("/renewAuthToken", asyncWrap(this.renewAuthToken));
    this.router.get("/users", asyncWrap(this.getAll));
    this.router.get("/checkEmail/:email", asyncWrap(this.checkEmail));
    this.router.get("/checkActive", requiresLogin, asyncWrap(this.checkActive));
    this.router.get("/profile", requiresLogin, asyncWrap(this.getProfile));
    this.router.get("/userDetailsForNavbar", requiresLogin, asyncWrap(this.getUserDetailsForNavbar));
    this.router.post("/activate", requiresLogin, asyncWrap(this.activateUser));
  }

}

// Create the AuthRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;