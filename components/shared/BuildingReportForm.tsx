"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { buildingReportFormSchema } from "@/lib/validator"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { buildingReportDefaultValues } from "@/constants"
import BuildingReportCategoryDropdown from "./BuildingReportCategoryDropdown"
import { Textarea } from "../ui/textarea"
import BuildingReportFileUploader from "./BuildingReportFileUploader"

type BuildingReportFormProps = {
  userId: string
  type: "upload" | "update"
}

const BuildingReportForm = ({ userId, type }: BuildingReportFormProps) => {

  const [files, setFiles] = useState<File[]>([])

  // 1. Define your form.
  const form = useForm<z.infer<typeof buildingReportFormSchema>>({
    resolver: zodResolver(buildingReportFormSchema),
    defaultValues: buildingReportDefaultValues
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof buildingReportFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input 
                    placeholder="Building Report Title"
                    {...field} 
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <BuildingReportCategoryDropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea 
                    placeholder="Description..."
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <BuildingReportFileUploader 
                    onFieldChange={field.onChange}
                    imgUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default BuildingReportForm