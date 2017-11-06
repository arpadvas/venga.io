import * as path from "path";
import * as express from "express";
import mongoose = require("mongoose");
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import { config } from "./config/index";
import * as cors from "cors";

// import routers
import TestRouter from "./routes/TestRouter";
import AuthRouter from "./routes/AuthRouter";
import AscentRouter from "./routes/AscentRouter";
import CragRouter from "./routes/CragRouter";
import SectorRouter from "./routes/SectorRouter";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.connectDB();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors({
      origin: "http://localhost:4200"
    }));
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(__dirname + "./../client/dist/"));
    // catch 404 and forward to error handler
    this.express.use( (err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
      err.status = 404;
      next(err);
    });
    // error handling
    this.express.use(errorHandler());
  }

   // Configure Mongo DB
  private connectDB(): void {
    const MONGODB_CONNECTION: string = config.database;
    mongoose.Promise = global.Promise;

    mongoose.connect(MONGODB_CONNECTION, { useMongoClient: true }, function(err: any): void {
      if (err) {
        console.log("There is error while connecting to MongoDB: " + err);
      } else {
        console.log("Successfully connected to MongoDB!");
      }
    });

  }

  // Configure API endpoints.
  private routes(): void {
    const router = express.Router();
    // index route handler to serve angular client
    router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.sendFile(path.join(__dirname + "./../client/dist/index.html"));
    });
    this.express.use("/", router);

    // get REST endpoints
    this.express.use("/api/test", TestRouter);
    this.express.use("/api/auth", AuthRouter);
    this.express.use("/api/ascent", AscentRouter);
    this.express.use("/api/crag", CragRouter);
    this.express.use("/api/sector", SectorRouter);
  }

}

export default new App().express;