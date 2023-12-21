// "use server"

// import { CreateReportParams, DeleteReportParams, GetAllReportsParams } from "@/types"
// import { connectToDatabase } from "../mongodb/database"
// import User from "../mongodb/database/models/user.model"
// import Report from "../mongodb/database/models/report.model"
// import Category from "../mongodb/database/models/category.model"
// import { handleError } from "../utils"
// import { revalidatePath } from "next/cache"

// const populateData = (query: any) => {
//   return query
//     .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
//     .populate({ path: 'category', model: Category, select: '_id name' })
// }

// export const createReport = async ({ report, userId, path }: CreateReportParams) => {
//   try {
//     await connectToDatabase()
//     const creator = await User.findById(userId)
//     if (!creator) {
//       throw new Error("Creator not found")
//     }
//     const newReport = await Report.create({ ...report, creator: userId })
//     return JSON.parse(JSON.stringify(newReport))
//   } catch (error) {

//   }
// }

// export const getReportById = async (reportId: string) => {
//   try {
//     await connectToDatabase()
//     const report = await populateData(Report.findById(reportId))
//     if (!report) {
//       throw new Error(`Report with id ${reportId} not found`)
//     }
//     return JSON.parse(JSON.stringify(report))
//   } catch (error) {
//     handleError(error)
//   }
// }

// export const getAllReports = async ({ query, limit = 6, page, category }: GetAllReportsParams) => {
//   try {
//     await connectToDatabase()
//     const conditions = {}
//     const reportsQuery = Report
//       .find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(0)
//       .limit(limit)

//     const reports = await populateData(reportsQuery)
//     // const reportsCount = await Report.countDocuments(conditions)
//     const reportsCount = reports.length
    
//     return {
//       data: JSON.parse(JSON.stringify(reports)),
//       totalPages: Math.ceil(reportsCount / limit)
//     }
//   } catch (error) {
//     handleError(error)
//   }
// }

// export const deleteReport = async ({ reportId, path }: DeleteReportParams) => {
//   try {
//     await connectToDatabase()
//     const report = await Report.findByIdAndDelete(reportId)
//     if (report) revalidatePath(path)
//   } catch (error) {
//     handleError(error)
//   }
// }




'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/mongodb/database'
import Report from '@/lib/mongodb/database/models/report.model'
import User from '@/lib/mongodb/database/models/user.model'
import Category from '@/lib/mongodb/database/models/category.model'
import { handleError } from '@/lib/utils'

import {
  CreateReportParams,
  UpdateReportParams,
  DeleteReportParams,
  GetAllReportsParams,
  GetReportsByUserParams,
  GetRelatedReportsByCategoryParams,
} from '@/types'

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateReport = (query: any) => {
  return query
    .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

// CREATE
export async function createReport({ userId, report, path }: CreateReportParams) {
  try {
    await connectToDatabase()

    const creator = await User.findById(userId)
    if (!creator) throw new Error('Creator not found')

    const newReport = await Report.create({ ...report, creator: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newReport))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE EVENT BY ID
export async function getReportById(reportId: string) {
  try {
    await connectToDatabase()

    const report = await populateReport(Report.findById(reportId))

    if (!report) throw new Error('Report not found')

    return JSON.parse(JSON.stringify(report))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateReport({ userId, report, path }: UpdateReportParams) {
  try {
    await connectToDatabase()

    const reportToUpdate = await Report.findById(report._id)
    if (!reportToUpdate || reportToUpdate.creator.toHexString() !== userId) {
      throw new Error('Unauthorized or report not found')
    }

    const updatedReport = await Report.findByIdAndUpdate(
      report._id,
      { ...report },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedReport))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteReport({ reportId, path }: DeleteReportParams) {
  try {
    await connectToDatabase()

    const deletedReport = await Report.findByIdAndDelete(reportId)
    if (deletedReport) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL EVENTS
export async function getAllReports({ query, limit = 6, page, category }: GetAllReportsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const reportsQuery = Report.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const reports = await populateReport(reportsQuery)
    const reportsCount = await Report.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(reports)),
      totalPages: Math.ceil(reportsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET EVENTS BY CREATOR
export async function getReportsByUser({ userId, limit = 6, page }: GetReportsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { creator: userId }
    const skipAmount = (page - 1) * limit

    const reportsQuery = Report.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const reports = await populateReport(reportsQuery)
    const reportsCount = await Report.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(reports)), totalPages: Math.ceil(reportsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedReportsByCategory({
  categoryId,
  reportId,
  limit = 3,
  page = 1,
}: GetRelatedReportsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: reportId } }] }

    const reportsQuery = Report.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const reports = await populateReport(reportsQuery)
    const reportsCount = await Report.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(reports)), totalPages: Math.ceil(reportsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}




