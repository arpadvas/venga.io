import { Router, Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../schemas/user";
import { Ascent, IAscentModel } from "../schemas/ascent";
import { Crag } from "../schemas/crag";
import { Sector } from "../schemas/sector";
import { asyncWrap } from "../helpers/async";
import { config } from "../config/index";
import requiresLogin from "../middlewares/requiresLogin";
import { asyncForEach } from "../helpers/asyncforeach";
import * as _ from "lodash";

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
          const crags = [];
          const sectors = [];
          const findCragsAndSectors = async () => {
            await asyncForEach(ascents, async (elem) => {
              const crag = await Crag.findOne({ _id: elem.cragId });
              if (crag) {
                const cragFinding =  _.find(crags, ["_id", crag._id]);
                if (!cragFinding) {
                  crags.push(crag);
                }
              }
              const sector = await Sector.findOne({ _id: elem.sectorId });
              if (sector) {
                const sectorFinding =  _.find(sectors, ["_id", sector._id]);
                if (!sectorFinding) {
                  sectors.push(sector);
                }
              }
            });
            res.json({ payload: {ascents: ascents, crags: crags, sectors: sectors} });
          };
          findCragsAndSectors();
        }
      } else {
        res.json({ success: false, message: "User is not found!" });
      }
    } else {
      res.json({ success: false, message: "Token has not been provided!" });
    }
  }

  /**
   * Search ascents by keyword.
   */
  public async queryAscents(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      const userId = (<any>req)["decoded"].userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        const ascents = await Ascent.find( { name: { $regex: req.params.keyword, $options: "i" }});
        if (!ascents || ascents.length === 0) {
          res.json({ success: false, message: "Could not find any ascent entry." });
        } else {
          res.json({ payload: {ascents: ascents} });
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
              res.json({ success: true, message: "Ascent has been saved.", payload: ascent });
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

  // public async addAscent(req: Request, res: Response, next: NextFunction): Promise<void> {


  //       if (req.body.name &&
  //         req.body.type &&
  //         req.body.grade &&
  //         req.body.style &&
  //         req.body.sentDate) {
  //         const ascent = new Ascent({
  //             name: req.body.name,
  //             type: req.body.type,
  //             grade: req.body.grade,
  //             style: req.body.style,
  //             sentDate: req.body.sentDate
  //           });
  //         const ascentEntry = await ascent.save();
  //         if (ascentEntry) {
  //             res.json({ success: true, message: "Ascent has been saved.", ascent: ascent });
  //         }
  //       } else {
  //           res.json({ success: false, message: "Make sure ascent details were provided." });
  //       }
  // }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init(): void {
    this.router.get("/allascents", asyncWrap(this.getAll));
    this.router.get("/ascents", requiresLogin, asyncWrap(this.getUserAscents));
    this.router.get("/ascents/:keyword", requiresLogin, asyncWrap(this.queryAscents));
    this.router.post("/ascents", requiresLogin, asyncWrap(this.addAscent));
    // this.router.post("/ascents", asyncWrap(this.addAscent));
  }

}

// Create the AscentRouter, and export its configured Express.Router
const ascentRoutes = new AscentRouter();
ascentRoutes.init();

export default ascentRoutes.router;