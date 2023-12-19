import { Document, Schema, models, model } from "mongoose"

export interface IBuilding extends Document {
  _id: string
  title: string
  description?: string
  location?: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  imageUrl: string
  price?: string
  isFree: boolean
  url?: string
  category: { _id: string, name: string }
  submitter: { _id: string, firstName: string, lastName: string }
}

const BuildingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
  imageUrl: { type: String, required: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  submitter: { type: Schema.Types.ObjectId, ref: "User" }
})

const Building = models.Building || model("Building", BuildingSchema)

export default Building;