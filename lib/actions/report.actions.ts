"use server"

import { CreateReportParams, GetAllReportsParams } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import Report from "../mongodb/database/models/report.model"
import Category from "../mongodb/database/models/category.model"
import { handleError } from "../utils"

const populateData = (query: any) => {
  return query
    .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

export const createReport = async ({ report, userId, path }: CreateReportParams) => {
  try {
    await connectToDatabase()
    const creator = await User.findById(userId)
    if (!creator) {
      throw new Error("Creator not found")
    }
    const newReport = await Report.create({ ...report, creator: userId })
    return JSON.parse(JSON.stringify(newReport))
  } catch (error) {

  }
}

export const getReportById = async (reportId: string) => {
  try {
    await connectToDatabase()
    const report = await populateData(Report.findById(reportId))
    if (!report) {
      throw new Error(`Report with id ${reportId} not found`)
    }
    return JSON.parse(JSON.stringify(report))
  } catch (error) {
    handleError(error)
  }
}

export const getAllReports = async ({ query, limit = 6, page, category }: GetAllReportsParams) => {
  try {
    await connectToDatabase()
    const conditions = {}
    const reportsQuery = Report
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit)

    const reports = await populateData(reportsQuery)
    // const reportsCount = await Report.countDocuments(conditions)
    const reportsCount = reports.length
    
    return {
      data: JSON.parse(JSON.stringify(reports)),
      totalPages: Math.ceil(reportsCount / limit)
    }
  } catch (error) {
    handleError(error)
  }
}