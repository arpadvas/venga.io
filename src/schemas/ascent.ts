import { Document, Schema, Model, model } from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { IAscent } from "../interfaces/ascent";

export interface IAscentModel extends IAscent, Document {

}

/**
 * Creating ascent schema.
 */
export const ascentSchema: Schema = new Schema({
  createdAt: Date,
  name: { type: String, required: true },
  type: { type: String, required: true },
  grade: { type: String, required: true },
  style: { type: String, required: true },
  sentDate: { type: Date, required: true },
  senderId: { type: String, required: true, default: "123456" }, // Schema.Types.ObjectId
  cragId: { type: String, required: true, default: "123456" }, // Schema.Types.ObjectId
  sectorId: { type: String, required: true, default: "123456" } // Schema.Types.ObjectId
});

ascentSchema.pre("save", function(next: NextFunction): void {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const Ascent: Model<IAscentModel> = model<IAscentModel>("Ascent", ascentSchema);