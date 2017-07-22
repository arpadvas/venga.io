"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
// import routers
const TestRouter_1 = require("./routes/TestRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(__dirname + './../client/dist/'));
        //catch 404 and forward to error handler
        this.express.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.express.use(errorHandler());
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        // index route handler to serve angular client
        router.get('/', (req, res, next) => {
            res.sendFile(path.join(__dirname + './../client/dist/index.html'));
        });
        this.express.use('/', router);
        // get REST endpoints
        this.express.use('/api/test', TestRouter_1.default);
    }
}
exports.default = new App().express;
