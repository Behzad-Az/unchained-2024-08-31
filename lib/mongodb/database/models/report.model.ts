import { Document, Schema, models, model } from "mongoose"

export interface IReport extends Document {
  _id: string
  title: string
  description?: string
  location?: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  infoDate: Date
  imgUrl: string
  price: string
  isFree: boolean
  url?: string
  category: { _id: string, name: string }
  creator: { _id: string, firstName: string, lastName: string }
}

const ReportSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
  infoDate: { type: Date },
  imgUrl: { type: String, required: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  creator: { type: Schema.Types.ObjectId, ref: "User" }
})

const Report = models.Report || model("Report", ReportSchema)

export default Report