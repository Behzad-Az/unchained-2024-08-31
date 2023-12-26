"use server"

import { CreateSubscriberParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import Subscriber from "../mongodb/database/models/subscriber.model"

export const createSubscriber = async({ email }: CreateSubscriberParams) => {
  try {
    await connectToDatabase()
    const newSubscriber = await Subscriber.create({ email })
    return JSON.parse(JSON.stringify(newSubscriber))
  } catch (error) {
    handleError(error)
  }
}