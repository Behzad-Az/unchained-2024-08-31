import { Document, Schema, models, model } from "mongoose"

export interface IBuildingReport extends Document {
  _id: string
  title: string
  description?: string
  location?: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  infoDate: Date
  imageUrl: string
  price?: string
  isFree: boolean
  url?: string
  category: { _id: string, name: string }
  submitter: { _id: string, firstName: string, lastName: string }
}

const BuildingReportSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
  infoDate: { type: Date },
  imageUrl: { type: String, required: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  submitterId: { type: Schema.Types.ObjectId, ref: "User" }
})

const BuildingReport = models.BuildingReport || model("BuildingReport", BuildingReportSchema)

export default BuildingReport