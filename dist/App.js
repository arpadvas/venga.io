"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const index_1 = require("./config/index");
const cors = require("cors");
// import routers
const TestRouter_1 = require("./routes/TestRouter");
const AuthRouter_1 = require("./routes/AuthRouter");
// Creates and configures an ExpressJS web server.
class App {
    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.connectDB();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(cors({
            origin: "http://localhost:4200"
        }));
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(__dirname + "./../client/dist/"));
        // catch 404 and forward to error handler
        this.express.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
        // error handling
        this.express.use(errorHandler());
    }
    // Configure Mongo DB
    connectDB() {
        const MONGODB_CONNECTION = index_1.config.database;
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGODB_CONNECTION, { useMongoClient: true }, function (err) {
            if (err) {
                console.log("There is error while connecting to MongoDB: " + err);
            }
            else {
                console.log("Successfully connected to MongoDB!");
            }
        });
    }
    // Configure API endpoints.
    routes() {
        const router = express.Router();
        // index route handler to serve angular client
        router.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname + "./../client/dist/index.html"));
        });
        this.express.use("/", router);
        // get REST endpoints
        this.express.use("/api/test", TestRouter_1.default);
        this.express.use("/api/auth", AuthRouter_1.default);
    }
}
exports.default = new App().express;
