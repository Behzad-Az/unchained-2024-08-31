import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import { getReportsByUser } from "@/lib/actions/report.actions"
import { auth } from "@clerk/nextjs"
import Link from "next/link"

const ProfilePage = async() => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const createdReports = await getReportsByUser({ userId, page: 1 })

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Purchased Reports</h3>
          <Button asChild className="button hidden sm:flex" size="lg">
            <Link href="/#reports">Explore More Reports</Link>
          </Button>
        </div>
      </section>
      {/* <section className="wrapper my-8">
        <Collection
          data={reports?.data}
          emptyTitle="No purchased reports yet"
          emptyStateSubText="We're growing our reports directory daily"
          collectionType="My_Purchased_Reports"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Reports Created by Me</h3>
          <Button asChild className="button hidden sm:flex" size="lg">
            <Link href="/reports/create">+ Create New Report</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={createdReports?.data}
          emptyTitle="You have not created a report yet"
          emptyStateSubText="Go create some now"
          collectionType="My_Created_Reports"
          limit={6}
          page={1}
          urlParamName="reportsPage"
          totalPages={2}
        />
      </section>
    </>
  )
}

export default ProfilePage