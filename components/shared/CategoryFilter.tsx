"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"
import { getAllCategories } from "@/lib/actions/category.actions"
import { ICategory } from "@/lib/mongodb/database/models/category.model"


const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories()
      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories()
  }, [])

  const onSelectCategory = (category: string) => {
    let newUrl = ""
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category
      })
    }
    else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"]
      })
    }
    router.push(newUrl, { scroll: false })
  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)} disabled>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Area" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
        {
          categories.map(category => (
            <SelectItem key={category._id} value={category.name} className="select-item p-regular-14">
              {category.name}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}

export default CategoryFilter