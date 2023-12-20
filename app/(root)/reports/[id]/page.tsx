import CheckoutButton from "@/components/shared/CheckoutButton"
import Collection from "@/components/shared/Collection"
import { getRelatedReportsByCategory, getReportById } from "@/lib/actions/report.actions"
import { formatDateTime } from "@/lib/utils"
import { SearchParamProps } from "@/types"
import Image from "next/image"

const ReportDetailsPage = async ({ params: { id }, searchParams}: SearchParamProps) => {
  const report = await getReportById(id)
  const relatedReports = await getRelatedReportsByCategory({
    categoryId: report.category._id,
    reportId: report._id,
    page: searchParams.page as string
  })
  const {
    imgUrl,
    title,
    price,
    isFree,
    infoDate,
    location,
    description,
    url,
    category,
    creator
  } = report

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image 
            src={imgUrl}
            alt="hero-image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center" 
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {isFree ? "FREE" : `$${price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {category.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {creator.firstName} {creator.lastName}
                  </span>
                </p>
              </div>
            </div>

            <CheckoutButton report={report} />
            
            <div className="flex flex-col gap-5">
              <div className="p-regular-20 flex items-center gap-3">
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
                <p className="p-medium-16 lg:p-regular-20">{formatDateTime(infoDate).dateOnly}</p>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
                <p className="p-medium-16 lg:p-regular-20">{location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You'll Get</p>
              <p className="p-medium-16 lg:p-regular-18">{description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{url}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gp-12">
        <h2 className="h2-bold">Related Reports</h2>
        <Collection
          data={relatedReports?.data}
          emptyTitle="No reports found"
          emptyStateSubText="Come back later"
          collectionType="All_Reports"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  )
}

export default ReportDetailsPage