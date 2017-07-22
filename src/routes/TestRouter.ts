import {Router, Request, Response, NextFunction} from 'express';

export class TestRouter {
  router: Router

  /**
   * Initialize the TestRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * Send OK.
   */
  public sendOk(req: Request, res: Response, next: NextFunction) {
        res.send({"msg": "ok"});
  }

  /**
   * Send error.
   */
  public sendError(req: Request, res: Response, next: NextFunction) {
        const err = new Error("Test error");
        throw err;
  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.sendOk);
    this.router.get('/error', this.sendError);
  }

}

// Create the HistoryRouter, and export its configured Express.Router
const testRoutes = new TestRouter();
testRoutes.init();

export default testRoutes.router;