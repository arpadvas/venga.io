import * as mocha from 'mocha';
import { IUser } from "../interfaces/user";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";
import { config } from "../config/reader";

//import mongoose
import mongoose = require("mongoose");

//use mongoose promise
mongoose.Promise = global.Promise;

//connect to mongoose and create model
const MONGODB_CONNECTION: string = config.database;
let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
var User: mongoose.Model<IUserModel> = connection.model<IUserModel>("User", userSchema);

//require chai and use should() assertions
let chai = require("chai");
chai.should();

describe("User", function() {

  describe("create()", function () {
    it("should create a new User", function () {
      //user object
      let user: IUser = {
        email: "test@user.com",
        name: "Test User"
      };

      //create user and return promise
      return new User(user).save().then(result => {
        result._id.should.exist;
        result.email.should.equal(user.email);
        result.name.should.equal(user.name);

      })
    });
  });
});