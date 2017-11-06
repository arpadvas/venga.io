import { Router, Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../schemas/user";
import { Ascent, IAscentModel } from "../schemas/ascent";
import { Sector, ISectorModel } from "../schemas/sector";
import { asyncWrap } from "../helpers/async";
import { config } from "../config/index";
import requiresLogin from "../middlewares/requiresLogin";

export class SectorRouter {
  router: Router;

  /**
   * Initialize the SectorRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Sectors.
   */
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
      const sectors = await Sector.find({});
      if (!sectors || sectors.length === 0) {
        res.json({ success: false, message: "Could not find any sector entry." });
      } else {
        res.send(sectors);
      }
  }

  /**
   * Get sectors for authenticated users.
   */
  public async getSectors(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      const userId = (<any>req)["decoded"].userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        const sectors = await Sector.find({});
        if (!sectors || sectors.length === 0) {
          res.json({ success: false, message: "Could not find any sector entry." });
        } else {
          res.send(sectors);
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

  public async addSector(req: Request, res: Response, next: NextFunction): Promise<void> {
    if ((<any>req)["decoded"]) {
      const userId = (<any>req)["decoded"].userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        if (req.body.name && req.body.cragId) {
          const sector = new Sector({
              name: req.body.name,
              cragId: req.body.cragId,
              creatorId: userId
            });
          const sectorEntry = await sector.save();
          if (sectorEntry) {
              res.json({ success: true, message: "Sector has been saved.", sector: sector });
          }
        } else {
                res.json({ success: false, message: "Make sure sector details were provided." });
        }
      } else {
        res.json({ success: false, message: "User is not found!" });
      }
    } else {
     res.json({ success: false, message: "Token has not been provided!" });
    }
  }

//   public async addSector(req: Request, res: Response, next: NextFunction): Promise<void> {
//     if (req.body.name &&
//         req.body.cragId
//     ) {
//         const sector = new Sector({
//             name: req.body.name,
//             cragId: req.body.cragId
//         });
//         console.log(sector);
//         const sectorEntry = await sector.save();
//         if (sectorEntry) {
//             res.json({ success: true, message: "Sector has been saved.", sector: sector });
//         }
//     } else {
//             res.json({ success: false, message: "Make sure crag details were provided." });
//     }
//   }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init(): void {
    this.router.get("/allsectors", asyncWrap(this.getAll));
    this.router.get("/sectors", requiresLogin, asyncWrap(this.getSectors));
    this.router.post("/sectors", requiresLogin, asyncWrap(this.addSector));
    // this.router.post("/sectors", asyncWrap(this.addSector));
  }

}

// Create the AscentRouter, and export its configured Express.Router
const sectorRoutes = new SectorRouter();
sectorRoutes.init();

export default sectorRoutes.router;