"use server"

import Stripe from "stripe"
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByReportParams, GetOrdersByUserParams } from "@/types"
import { handleError } from "../utils"
import { redirect } from "next/navigation"
import { connectToDatabase } from "../mongodb/database"
import Order from "../mongodb/database/models/order.model"
import Report from "../mongodb/database/models/report.model"
import { ObjectId } from "mongodb"
import User from "../mongodb/database/models/user.model"

export const checkoutOrder = async(order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = order.isFree || !order.price ? 0 : Number(order.price) * 100
  const price_data = {
    currency: "cad",
    unit_amount: price,
    product_data: { name: order.reportTitle }
  }
  const metadata = {
    reportId: order.reportId,
    buyerId: order.buyerId
  }
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data,
          quantity: 1
        },
      ],
      metadata,
      mode: 'payment',
      // automatic_tax: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`
    });
    redirect(session.url!)
  } catch (error) {
    throw(error)
  }
}

export const createOrder = async(order: CreateOrderParams) => {
  try {
    await connectToDatabase()
    const newOrder = await Order.create({
      ...order,
      report: order.reportId,
      buyer: order.buyerId
    })
    return JSON.parse(JSON.stringify(newOrder))
  } catch (error) {
    handleError(error) 
  }
}
// GET ORDERS BY EVENT
export async function getOrdersByReport({ searchString, reportId }: GetOrdersByReportParams) {
  try {
    await connectToDatabase()

    if (!reportId) throw new Error('Report ID is required')
    const reportObjectId = new ObjectId(reportId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'reports',
          localField: 'report',
          foreignField: '_id',
          as: 'report',
        },
      },
      {
        $unwind: '$report',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          reportTitle: '$report.title',
          reportId: '$report._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ reportId: reportObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('report._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'report',
        model: Report,
        populate: {
          path: 'creator',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('report._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}