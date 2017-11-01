import { Router, Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../schemas/user";
import { Ascent, IAscentModel } from "../schemas/ascent";
import { asyncWrap } from "../helpers/async";
import { config } from "../config/index";

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
        return next(new Error("Could not find any ascent entry."));
      } else {
        res.send(ascents);
      }
  }

  /**
   * Add new ascent.
   */
  public async addAscent(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.body.name && req.body.type && req.body.grade) {
        const ascent = new Ascent({
            name: req.body.name,
            type: req.body.type,
            grade: req.body.grade,
            style: req.body.style,
            sentDate: req.body.sentDate}); // get if from db
        const ascentEntry = await ascent.save();
        if (ascentEntry) {
            res.json({ success: true, message: "Ascent has been saved.", ascent: ascent });
        }
    } else {
            res.json({ success: false, message: "Make sure ascent details were provided." });
    }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init(): void {
    this.router.get("/ascents", asyncWrap(this.getAll));
    this.router.post("/ascents", asyncWrap(this.addAscent));
  }

}

// Create the AscentRouter, and export its configured Express.Router
const ascentRoutes = new AscentRouter();
ascentRoutes.init();

export default ascentRoutes.router;