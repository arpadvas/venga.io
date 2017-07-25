import { Schema } from "mongoose";
import { Router, Request, Response, NextFunction } from "express";

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