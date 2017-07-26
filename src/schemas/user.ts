import { Schema, Model, model } from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { IUserModel } from "../models/user";

export const userSchema: Schema = new Schema({
  createdAt: Date,
  email: { type: String, lowercase: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre("save", function(next: NextFunction): void {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);