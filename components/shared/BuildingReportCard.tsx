import { IBuildingReport } from "@/lib/mongodb/database/models/buildingReport.model"
import { formatDateTime } from "@/lib/utils"
import { auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

type Props = {
  report: IBuildingReport
  hasOrderLink?: Boolean
  hidePrice?: Boolean
}

const BuildingReportCard = ({ report, hasOrderLink, hidePrice }: Props) => {
  const {
    _id,
    title,
    imgUrl,
    isFree,
    price,
    infoDate,
    category,
    creator
  } = report

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  // const isReportCreator

  return (
    <div className="group relative flex min-h-[300px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/buildingreports/${_id}`}
        style={{ backgroundImage: `url(${imgUrl})` }}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />
      {/* Is event creator */}
      <Link 
        href={`/buildingreports/${_id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        {
          !hidePrice &&
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {isFree ? "FREE" : `$${price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
              {category.name}
            </p>
          </div>
        }
        <p className="p-medium-16 md:p-medium-18 text-grey-500">{formatDateTime(infoDate).dateOnly}</p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{title}</p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {creator.firstName} {creator.lastName}
          </p>
          {
            hasOrderLink &&
            <Link 
              href={`/orders?buildingreportId=${_id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500">Order Details</p>
              <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
            </Link>
          }
        </div>
      </Link>
    </div>
  )
}

export default BuildingReportCard