import { Document, Schema, models, model } from "mongoose"

export interface ISubscriber extends Document {
  _id: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

const SubscriberSchema = new Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
})

const Subscriber = models.Subscriber || model("Subscriber", SubscriberSchema)

export default Subscriber