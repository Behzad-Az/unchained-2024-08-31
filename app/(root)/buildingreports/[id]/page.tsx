import { getBuildingReportById } from "@/lib/actions/buildingreports.actions"
import { formatDateTime } from "@/lib/utils"
import { SearchParamProps } from "@/types"
import Image from "next/image"

const BuildingReportDetails = async ({ params: { id }}: SearchParamProps) => {
  const report = await getBuildingReportById(id)
  const {
    imgUrl,
    title,
    price,
    isFree,
    infoDate,
    location,
    description,
    url,
    categoryId: category,
    submitterId: submitter
  } = report

  return (
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
                  {submitter.firstName} {submitter.lastName}
                </span>
              </p>
            </div>
          </div>
          {/* Checkout Button */}
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
  )
}

export default BuildingReportDetails