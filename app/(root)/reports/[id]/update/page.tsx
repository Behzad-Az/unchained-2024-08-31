import ReportForm from "@/components/shared/ReportForm"
import { getReportById } from "@/lib/actions/report.actions";
import { auth } from "@clerk/nextjs"

type Props = {
  params: {
    id: string
  }
}

const UpdateReportPage = async ({ params: { id } }: Props) => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;
  const report = await getReportById(id)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Report</h3>
      </section>
      <div className="wrapper my-8">
        <ReportForm userId={userId} type="Update" report={report} />
      </div>
    </>
  )
}

export default UpdateReportPage