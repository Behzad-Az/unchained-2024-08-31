"use client"

import { IReport } from "@/lib/mongodb/database/models/report.model"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"
import Checkout from "./Checkout"

const CheckoutButton = ({ report }: { report: IReport }) => {
  const { user } = useUser()
  const userId = user?.publicMetadata.userId as string

  const infoDate = new Date(report.infoDate)
  const today = new Date()
  const isReportOutdated = (Math.abs(today.getDate() - infoDate.getDate())) > 1

  return (
    <div className="flex gap-3 flex-col items-start">
      <SignedOut>
        <Button asChild className="button rounded-full" size="lg">
          <Link href="/sign-in">Get Report</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Checkout report={report} userId={userId} />
      </SignedIn>
      {isReportOutdated && <p className="p-2 text-red-400 text-sm">This report has not been updated in more than 60 days.</p>}
    </div>
  )
}

export default CheckoutButton