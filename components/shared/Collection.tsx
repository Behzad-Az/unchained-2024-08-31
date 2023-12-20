import { IReport } from "@/lib/mongodb/database/models/report.model"
import ReportCard from "./ReportCard"

type Props = {
  data: IReport[]
  emptyTitle: string
  emptyStateSubText: string
  collectionType: "All_Reports" | "My_Purchased_Reports" | "My_Submitted_Reports"
  limit: number
  page: number | string
  totalPages?: number,
  urlParamName?: string 
}

const Collection = ({ data, emptyTitle, emptyStateSubText, limit, page, totalPages = 0, collectionType, urlParamName }: Props) => {
  return data.length > 0 ?
  (
    <div className="flex flex-col items-center gap-10">
      <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {
          data.map(report => {
            const hasOrderLink = collectionType === "My_Submitted_Reports"
            const hidePrice = collectionType === "My_Purchased_Reports"
            return (
              <li key={report._id} className="flex justify-center">
                <ReportCard report={report} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
              </li>
            )
          })
        }
      </ul>
    </div>
  ):
  (
    <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
      <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
      <h3 className="p-regular-14">{emptyStateSubText}</h3>
    </div>
  )
}

export default Collection