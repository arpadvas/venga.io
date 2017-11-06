import { Document, Schema, Model, model } from "mongoose";
import { Router, Request, Response, NextFunction } from "express";
import { ISector } from "../interfaces/sector";

export interface ISectorModel extends ISector, Document {

}

/**
 * Creating sector schema.
 */
export const sectorSchema: Schema = new Schema({
  createdAt: Date,
  name: { type: String, required: true },
  cragId: { type: Schema.Types.ObjectId, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true }
});

sectorSchema.pre("save", function(next: NextFunction): void {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const Sector: Model<ISectorModel> = model<ISectorModel>("Sector", sectorSchema);