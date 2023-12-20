"use server"

import { CreateBuildingReportParams } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import BuildingReport from "../mongodb/database/models/buildingReport.model"

export const createBuildingReport = async ({ buildingReport, userId, path }: CreateBuildingReportParams) => {
  try {
    await connectToDatabase()
    const submitter = await User.findById(userId)
    if (!submitter) {
      throw new Error("Submitter not found")
    }
    const newBuildingReport = await BuildingReport.create({ ...buildingReport, submitterId: userId })
    return JSON.parse(JSON.stringify(newBuildingReport))
  } catch (error) {

  }
}