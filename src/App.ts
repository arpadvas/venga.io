import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import errorHandler = require("errorhandler");

// import routers
import TestRouter from './routes/TestRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(__dirname + './../client/dist/'));
    //catch 404 and forward to error handler
    this.express.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });
    //error handling
    this.express.use(errorHandler());
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    // index route handler to serve angular client
    router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.sendFile(path.join(__dirname + './../client/dist/index.html'));
    });
    this.express.use('/', router);

    // get REST endpoints
    this.express.use('/api/test', TestRouter);
  }

}

export default new App().express;