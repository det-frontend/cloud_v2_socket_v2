import mongoose from "mongoose";
import { Schema } from "mongoose";
import connectDbs from "../utils/connect";
import { stationDetailDocument } from "./stationDetail.model";

const controlDb = connectDbs("controlDbUrl");

export interface collectionDocument extends mongoose.Document {
  collectionName: string;
  stationCollection: stationDetailDocument["_id"];
}

const collectionSchema = new Schema({
  collectionName: { type: String, required: true, unique: true },
  stationCollection: [{stationId:{type:String,required:true},stationName:{type:String,required:true}}],
});

const collectionModel = controlDb.model<collectionDocument>(
  "collection",
  collectionSchema
);
export default collectionModel;
