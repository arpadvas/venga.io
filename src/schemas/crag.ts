import { Document, Schema, Model, model } from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { ICrag } from "../interfaces/crag";

export interface ICragModel extends ICrag, Document {

}

/**
 * Creating crag schema.
 */
export const cragSchema: Schema = new Schema({
  createdAt: Date,
  name: { type: String, required: true },
  type: { type: String, required: true },
  country: { type: String, required: true },
  sectorIds: [String],
  ascentIds: [String],
  creatorId: { type: String, required: true } // Schema.Types.ObjectId
});

cragSchema.pre("save", function(next: NextFunction): void {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const Crag: Model<ICragModel> = model<ICragModel>("Crag", cragSchema);