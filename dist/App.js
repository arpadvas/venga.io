"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const reader_1 = require("./config/reader");
const cors = require("cors");
// import routers
const TestRouter_1 = require("./routes/TestRouter");
const AuthRouter_1 = require("./routes/AuthRouter");
// import schemas
const user_1 = require("./schemas/user");
// Creates and configures an ExpressJS web server.
class App {
    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.model = Object();
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
        const MONGODB_CONNECTION = reader_1.config.database;
        mongoose.Promise = global.Promise;
        // connect to mongoose
        const connection = mongoose.createConnection(MONGODB_CONNECTION, (err) => {
            if (err) {
                console.log("There is error while connecting to MongoDB: " + err);
            }
            else {
                console.log("Successfully connected to MongoDB!");
            }
        });
        // create models
        this.model.user = connection.model("User", user_1.userSchema);
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
