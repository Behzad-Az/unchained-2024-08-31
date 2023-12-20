import ReportSubmissionForm from "@/components/shared/ReportSubmissionForm"
import { auth } from "@clerk/nextjs"

const UpdateReport = () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Report</h3>
      </section>
      <div className="wrapper my-8">
        <ReportSubmissionForm userId={userId} type="Update" />
      </div>
    </>
  )
}

export default UpdateReport