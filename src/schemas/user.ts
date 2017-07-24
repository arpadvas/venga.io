import { Schema } from "mongoose";
import { Router, Request, Response, NextFunction } from "express";

export const userSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  name: String,
});
userSchema.pre("save", function(next: NextFunction): void {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});