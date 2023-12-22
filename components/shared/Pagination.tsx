"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { formUrlQuery } from "@/lib/utils"

type Props = {
  urlParamName?: string
  page: number | string
  totalPages: number
}

const Pagination = ({ urlParamName, page, totalPages }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = (actionType: "prev" | "next") => {
    const pageValue = actionType === "next" ? Number(page) + 1 : Number(page) - 1
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString()
    })
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-8 px-6"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        {"<"}
      </Button>
      Pagination
      <Button
        size="lg"
        variant="outline"
        className="w-8 px-6"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        {">"}
      </Button>
    </div>
  )
}

export default Pagination