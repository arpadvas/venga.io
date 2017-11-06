import { Router, Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../schemas/user";
import { Ascent, IAscentModel } from "../schemas/ascent";
import { asyncWrap } from "../helpers/async";
import { config } from "../config/index";
import requiresLogin from "../middlewares/requiresLogin";

export class AscentRouter {
  router: Router;

  /**
   * Initialize the AscentRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Ascents.
   */
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
      const ascents = await Ascent.find({});
      if (!ascents || ascents.length === 0) {
        res.json({ success: false, message: "Could not find any ascent entry." });
      } else {
          res.send(ascents);
      }
  }

  /**
   * Get actual user ascents.
   */
  public async getUserAscents(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      const userId = (<any>req)["decoded"].userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        const ascents = await Ascent.find({ senderId: userId });
        if (!ascents || ascents.length === 0) {
          res.json({ success: false, message: "Could not find any ascent entry." });
        } else {
          res.send(ascents);
        }
      } else {
        res.json({ success: false, message: "User is not found!" });
      }
    } else {
      res.json({ success: false, message: "Token has not been provided!" });
    }
}

  /**
   * Add new ascent.
   */

  public async addAscent(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      const userId = (<any>req)["decoded"].userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        if (req.body.name &&
          req.body.type &&
          req.body.grade &&
          req.body.style &&
          req.body.sentDate &&
          req.body.cragId &&
          req.body.sectorId) {
          const ascent = new Ascent({
              name: req.body.name,
              type: req.body.type,
              grade: req.body.grade,
              style: req.body.style,
              sentDate: req.body.sentDate,
              senderId: userId,
              cragId: req.body.cragId,
              sectorId: req.body.sectorId
            });
          const ascentEntry = await ascent.save();
          if (ascentEntry) {
              res.json({ success: true, message: "Ascent has been saved.", ascent: ascent });
          }
        } else {
            res.json({ success: false, message: "Make sure ascent details were provided." });
        }
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
    this.router.get("/allascents", asyncWrap(this.getAll));
    this.router.get("/ascents", requiresLogin, asyncWrap(this.getUserAscents));
    this.router.post("/ascents", requiresLogin, asyncWrap(this.addAscent));
  }

}

// Create the AscentRouter, and export its configured Express.Router
const ascentRoutes = new AscentRouter();
ascentRoutes.init();

export default ascentRoutes.router;