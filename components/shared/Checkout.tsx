import { useEffect } from "react"
import { IReport } from "@/lib/mongodb/database/models/report.model"
import { Button } from "../ui/button"
import { loadStripe } from "@stripe/stripe-js"
import { checkoutOrder } from "@/lib/actions/order.actions"

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout = ({ report, userId }: { report: IReport, userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
  
  const onCheckout = async() => {
    const order = {
      reportId: report._id,
      reportTitle: report.title,
      price: report.price,
      isFree: report.isFree,
      buyerId: userId
    }

    await checkoutOrder(order)
    console.log("i'm here 62: checkout")
  }

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        { report.isFree ? "See Report" : "Buy Report" }
      </Button>
    </form>
  )
}

export default Checkout