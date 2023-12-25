import { IReport } from "@/lib/mongodb/database/models/report.model"
import { formatDateTime } from "@/lib/utils"
import { auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { DeleteConfirmation } from "./DeleteConfirmation"

type Props = {
  report: IReport
  hasOrderLink?: Boolean
  hidePrice?: Boolean
}

const ReportCard = ({ report, hasOrderLink, hidePrice }: Props) => {
  const {
    _id,
    title,
    imgUrl,
    isFree,
    price,
    infoDate,
    category,
    creator,
    description
  } = report

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;
  const isReportCreator = userId === creator._id.toString()

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/reports/${_id}`}
        style={{ backgroundImage: `url(${imgUrl})` }}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />
      {
        isReportCreator && !hidePrice &&
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/reports/${_id}/update`}>
            <Image src="assets/icons/edit.svg" alt="Edit" width={20} height={20} />
          </Link>
          <DeleteConfirmation reportId={_id} />
        </div>
      }
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <Link href={`/reports/${_id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {title}
          </p>
        </Link>
        {
          !hidePrice &&
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {isFree ? "FREE" : `$${price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {category.name}
            </p>
          </div>
        }
        <p className="p-medium-16 text-grey-500">
          {formatDateTime(infoDate).dateOnly}
        </p>
        <div className="flex-between w-full">
          {/* <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {creator.firstName} {creator.lastName}
          </p> */}
          <p className="p-regular-14 text-grey-600 line-clamp-4">
            {description}
          </p>
          {
            hasOrderLink &&
            <Link 
              href={`/orders?reportId=${_id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500">Order Details</p>
              <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default ReportCard