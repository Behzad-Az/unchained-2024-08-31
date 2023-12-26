import { Document, Schema, models, model } from "mongoose"

export interface IChatlog extends Document {
  _id: string
  ip: string
  sender: "user" | "gpt"
  content: string
  sessionRef: string
  messageRef: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

const ChatlogSchema = new Schema({
  ip: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  sessionRef: { type: String, required: true },
  messageRef: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
})

const Chatlog = models.Chatlog || model("Chatlog", ChatlogSchema)

export default Chatlog