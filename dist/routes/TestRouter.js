"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class TestRouter {
    /**
     * Initialize the TestRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * Send OK.
     */
    sendOk(req, res, next) {
        res.send({ "msg": "ok" });
    }
    /**
     * Send error.
     */
    sendError(req, res, next) {
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
exports.TestRouter = TestRouter;
// Create the HistoryRouter, and export its configured Express.Router
const testRoutes = new TestRouter();
testRoutes.init();
exports.default = testRoutes.router;
