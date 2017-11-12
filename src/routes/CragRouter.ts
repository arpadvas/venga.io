import { Router, Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../schemas/user";
import { Ascent, IAscentModel } from "../schemas/ascent";
import { Crag, ICragModel } from "../schemas/crag";
import { asyncWrap } from "../helpers/async";
import { config } from "../config/index";
import requiresLogin from "../middlewares/requiresLogin";

export class CragRouter {
  router: Router;

  /**
   * Initialize the CragRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Crags.
   */
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
      const crags = await Crag.find({});
      if (!crags || crags.length === 0) {
        res.json({ success: false, message: "Could not find any crag entry." });
      } else {
        res.send(crags);
      }
  }

  /**
   * Get crags for authenticated users.
   */
  public async getCrags(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      const userId = (<any>req)["decoded"].userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        const crags = await Crag.find({});
        if (!crags || crags.length === 0) {
          res.json({ success: false, message: "Could not find any crag entry." });
        } else {
          res.send({ payload: crags });
        }
      } else {
        res.json({ success: false, message: "User is not found!" });
      }
    } else {
      res.json({ success: false, message: "Token has not been provided!" });
    }
}

  /**
   * Add new crag.
   */

  public async addCrag(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      const userId = (<any>req)["decoded"].userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        if (req.body.name &&
          req.body.type &&
          req.body.country
        ) {
          const crag = new Crag({
              name: req.body.name,
              type: req.body.type,
              country: req.body.country,
              creatorId: userId
            });
          const cragEntry = await crag.save();
          if (cragEntry) {
              res.json({ success: true, message: "Crag has been saved.", payload: crag });
          }
        } else {
                res.json({ success: false, message: "Make sure crag details were provided." });
        }
      } else {
        res.json({ success: false, message: "User is not found!" });
      }
    } else {
     res.json({ success: false, message: "Token has not been provided!" });
    }
  }

  // public async addCrag(req: Request, res: Response, next: NextFunction): Promise<void> {

  //       if (req.body.name &&
  //         req.body.type &&
  //         req.body.country
  //       ) {
  //         const crag = new Crag({
  //             name: req.body.name,
  //             type: req.body.type,
  //             country: req.body.country
  //           });
  //           console.log(crag);
  //         const cragEntry = await crag.save();
  //         if (cragEntry) {
  //             res.json({ success: true, message: "Crag has been saved.", crag: crag });
  //         }
  //       } else {
  //               res.json({ success: false, message: "Make sure crag details were provided." });
  //       }

  // }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init(): void {
    this.router.get("/allcrags", asyncWrap(this.getAll));
    this.router.get("/crags", requiresLogin, asyncWrap(this.getCrags));
    this.router.post("/crags", requiresLogin, asyncWrap(this.addCrag));
    // this.router.post("/crags", asyncWrap(this.addCrag));
  }

}

// Create the AscentRouter, and export its configured Express.Router
const cragRoutes = new CragRouter();
cragRoutes.init();

export default cragRoutes.router;