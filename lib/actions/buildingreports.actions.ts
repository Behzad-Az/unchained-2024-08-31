"use server"

import { CreateBuildingReportParams, GetAllBuildingReportsParams } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import BuildingReport from "../mongodb/database/models/buildingReport.model"
import Category from "../mongodb/database/models/category.model"
import { handleError } from "../utils"

const populateData = (query: any) => {
  return query
    .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

export const createBuildingReport = async ({ buildingReport, userId, path }: CreateBuildingReportParams) => {
  try {
    await connectToDatabase()
    const creator = await User.findById(userId)
    if (!creator) {
      throw new Error("Creator not found")
    }
    const newBuildingReport = await BuildingReport.create({ ...buildingReport, creator: userId })
    return JSON.parse(JSON.stringify(newBuildingReport))
  } catch (error) {

  }
}

export const getBuildingReportById = async (buildingReportId: string) => {
  try {
    await connectToDatabase()
    const buildingReport = await populateData(BuildingReport.findById(buildingReportId))
    if (!buildingReport) {
      throw new Error(`Building report with id ${buildingReportId} not found`)
    }
    return JSON.parse(JSON.stringify(buildingReport))
  } catch (error) {
    handleError(error)
  }
}

export const getAllBuildingReports = async ({ query, limit = 6, page, category }: GetAllBuildingReportsParams) => {
  try {
    await connectToDatabase()
    const conditions = {}
    const reportsQuery = BuildingReport
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit)

    const reports = await populateData(reportsQuery)
    // const reportsCount = await BuildingReport.countDocuments(conditions)
    const reportsCount = reports.length
    
    return {
      data: JSON.parse(JSON.stringify(reports)),
      totalPages: Math.ceil(reportsCount / limit)
    }
  } catch (error) {
    handleError(error)
  }
}