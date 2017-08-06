import * as bcrypt from "bcrypt";
import { Document, Schema, Model, model } from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {

}

export const userSchema: Schema = new Schema({
  createdAt: Date,
  email: { type: String, lowercase: true, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
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