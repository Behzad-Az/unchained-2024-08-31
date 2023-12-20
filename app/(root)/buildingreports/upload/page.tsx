import BuildingReportForm from "@/components/shared/BuildingReportForm"
import { auth } from "@clerk/nextjs"

const UploadBuildingReport = () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Upload Building Report</h3>
      </section>
      <div className="wrapper my-8">
        <BuildingReportForm userId={userId} type="Upload" />
      </div>
    </>
  )
}

export default UploadBuildingReport