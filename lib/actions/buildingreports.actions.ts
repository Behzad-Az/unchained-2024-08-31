"use server"

import { CreateBuildingReportParams } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import BuildingReport from "../mongodb/database/models/buildingReport.model"
import Category from "../mongodb/database/models/category.model"
import { handleError } from "../utils"

const populateEvent = (query: any) => {
  return query
    .populate({ path: 'submitterId', model: User, select: '_id firstName lastName' })
    .populate({ path: 'categoryId', model: Category, select: '_id name' })
}

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

export const getBuildingReportById = async (buildingReportId: string) => {
  try {
    await connectToDatabase()
    const buildingReport = await populateEvent(BuildingReport.findById(buildingReportId))
    if (!buildingReport) {
      throw new Error(`Building report with id ${buildingReportId} not found`)
    }
    return JSON.parse(JSON.stringify(buildingReport))
  } catch (error) {
    handleError(error)
  }
}