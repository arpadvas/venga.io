import { Schema } from "mongoose";

export var userSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  name: String,
});
userSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});