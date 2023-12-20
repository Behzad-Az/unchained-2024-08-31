"use server"

import Stripe from "stripe"
import { CheckoutOrderParams, CreateOrderParams } from "@/types"
import { handleError } from "../utils"
import { redirect } from "next/navigation"
import { connectToDatabase } from "../mongodb/database"
import Order from "../mongodb/database/models/order.model"

export const checkoutOrder = async(order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = order.isFree || !order.price ? 0 : Number(order.price) * 100
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "cad",
            unit_amount: price,
            product_data: { name: order.reportTitle }
          },
          quantity: 1
        },
      ],
      metadata: {
        reportId: order.reportId,
        buyerId: order.buyerId
      },
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