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
import { BuildingReportFileUploader } from "./BuildingReportFileUploader"
import Image from "next/image"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Checkbox } from "../ui/checkbox"

type BuildingReportFormProps = {
  userId: string
  type: "Upload" | "Update"
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

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image src="/assets/icons/location-grey.svg" alt="location" width={24} height={24} />
                    <Input 
                      placeholder="Building's address"
                      {...field} 
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="infoDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} className="filter-grey" />
                    <p className="ml-3 whitespace-nowrap text-grey-600">Info valid as of:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)} 
                      // showTimeSelect
                      dateFormat="yyyy-MM-dd"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image src="/assets/icons/dollar.svg" alt="dollar" width={24} height={24} className="filter-grey" />
                    <Input 
                      type="number" 
                      placeholder="Price" 
                      {...field} 
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free</label>
                              <Checkbox id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image src="/assets/icons/link.svg" alt="link" width={24} height={24} />
                    <Input 
                      placeholder="URL"
                      {...field} 
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Building Report`}
        </Button>
      </form>
    </Form>
  )
}

export default BuildingReportForm