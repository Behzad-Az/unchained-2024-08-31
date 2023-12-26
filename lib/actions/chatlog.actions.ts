"use server"

import { CreateChatlogParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import Chatlog from "../mongodb/database/models/chatlog.model"

export const createChatlog = async({ ip, sender, content, sessionRef, messageRef }: CreateChatlogParams) => {
  try {
    await connectToDatabase()
    const newChatlog = await Chatlog.create({ ip, sender, content, sessionRef, messageRef })
    return JSON.parse(JSON.stringify(newChatlog))
  } catch (error) {
    handleError(error)
  }
}