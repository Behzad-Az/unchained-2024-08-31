import { Dispatch, SetStateAction } from "react"

type Props = {
  imgUrl: string
  onFieldChange: (value: string) => void
  setFiles: Dispatch<SetStateAction<File[]>>
}

const BuildingReportFileUploader = ({ imgUrl, onFieldChange, setFiles}: Props) => {
  return (
    <div>BuildingReportFileUploader</div>
  )
}

export default BuildingReportFileUploader