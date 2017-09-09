import * as mocha from "mocha";
import { IUser } from "../interfaces/user";
import { userSchema } from "../schemas/user";
import { IUserModel } from "../schemas/user";
import { config } from "../config/index";
import { generateActivateToken } from "../helpers/random";

// import mongoose
import mongoose = require("mongoose");

// use mongoose promise
mongoose.Promise = global.Promise;

// connect to mongoose and create model
const MONGODB_CONNECTION: string = config.database;
const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION, { useMongoClient: true });
const User: mongoose.Model<IUserModel> = connection.model<IUserModel>("User", userSchema);

// require chai and use should() assertions
const chai = require("chai");
chai.should();

describe("User", (): void => {

  describe("create()", (): void => {
    it("should create a new User", () => {
      // user object
      const user: IUser = {
        email: "test1@user.com",
        name: "Test User",
        password: "Avasss1!",
        activateToken: generateActivateToken(),
        active: false
      };

      // create user and return promise
      return new User(user).save().then(result => {
        result._id.should.exist;
        result.email.should.equal(user.email);
        result.name.should.equal(user.name);
        result.password.should.exist;
        result.activateToken.should.exist;
      });
    });
  });
});