import * as bcrypt from "bcrypt";
import { Document, Schema, Model, model } from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {

}

/**
 * Email validators.
 */
const emailLengthChecker = (email) => {
  if (!email) {
    return false;
  } else {
    if (email.length < 3 || email.length > 40) {
      return false;
    } else {
      return true;
    }
  }
};

const validEmailChecker = (email) => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
};

const emailValidators = [
  {
  validator: emailLengthChecker,
  message: "Email must be between 3 and 40 characters!"
},
{
  validator: validEmailChecker,
  message: "Must be a valid email!"
  }
];

/**
 * Name validators.
 */
const nameLengthChecker = (name) => {
  if (!name) {
    return false;
  } else {
    if (name.length < 3 || name.length > 40) {
      return false;
    } else {
      return true;
    }
  }
};

const validNameChecker = (name) => {
  if (!name) {
    return false;
  } else {
    const regExp = new RegExp(/^(([A-Za-z\u00C0-\u017F])+[ ]+([A-Za-z\u00C0-\u017F])+)+$/);
    return regExp.test(name);
  }
};

const nameValidators = [
  {
  validator: nameLengthChecker,
  message: "Name must be between 3 and 40 characters!"
},
{
  validator: validNameChecker,
  message: "Name must not contain numbers and special characters but must have a space between first and last name!"
  }
];

/**
 * Password validators.
 */
const passwordLengthChecker = (password) => {
  if (!password) {
    return false;
  } else {
    if (password.length < 6 || password.length > 20) {
      return false;
    } else {
      return true;
    }
  }
};

const validPasswordChecker = (password) => {
  if (!password) {
    return false;
  } else {
    const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
    return regExp.test(password);
  }
};

const passwordValidators = [
  {
  validator: passwordLengthChecker,
  message: "Password must be between 6 and 20 characters!"
},
{
  validator: validPasswordChecker,
  message: "Password must contain at least one number, one lower case and one upper case character!"
  }
];

/**
 * Creating user schema.
 */
export const userSchema: Schema = new Schema({
  createdAt: Date,
  email: { type: String, lowercase: true, unique: true, required: true, validate: emailValidators },
  name: { type: String, required: true, validate: nameValidators },
  password: { type: String, required: true, validate: passwordValidators },
  activateToken: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
  profilePicture: { type: String, default: "https://s17.postimg.org/6oc9lqm0f/no-avatar.png" },
  backgroundPicture: { type: String, default: "https://s7.postimg.org/3t905fn4r/sng.png" },
  description: { type: String, default: "No description added" },
  gender: { type: String, default: "No gender added" },
  country: { type: String, default: "No place added" }
});

userSchema.pre("save", function(next: NextFunction): void {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

userSchema.pre("save", async function hashPassword(next: NextFunction): Promise<void> {
  try {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);