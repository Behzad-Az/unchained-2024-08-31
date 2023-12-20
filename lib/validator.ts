import * as z from "zod"

export const buildingReportFormSchema = z.object({

  title: z.string()
  .min(3, { message: "Title must be at least 3 characters" }),

  description: z.string()
  .min(3, { message: "Description must be at least 3 characters" })
  .max(400, { message: "Description must be less than 400 characters" }),

  location: z.string()
  .min(3, { message: "Location must be at least 3 characters" })
  .max(100, { message: "Description must be less than 100 characters" }),

  infoDate: z.date(),
  
  imgUrl: z.string(),

  category: z.string(),

  price: z.string(),

  isFree: z.boolean(),

  url: z.string().url()

})