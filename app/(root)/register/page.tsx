"use client"

import { useState } from "react"
import Image from "next/image"
import { mockChatLog } from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

type Message = {
  content: string
  sender: "gpt" | "user"
}

const FormSchema = z.object({
  message: z.string().min(2, {
    message: "Message is too short",
  }),
})

const RegisterPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chatLog, setChatLog] = useState<Message[]>(mockChatLog)
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "" as string,
    },
  })

  const onSubmit = async(formData: z.infer<typeof FormSchema>) => {
    setChatLog(prevState => [...prevState, { content: formData.message, sender: "user" }])
    setIsLoading(true)
    form.reset({ message: "" })
    fetch("http://ec2-35-182-161-73.ca-central-1.compute.amazonaws.com:8000/get-building-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: "same-origin",
      body: JSON.stringify({
        "address": "909Mainland",
        "prompt": formData.message
      })
    })
    .then(response => response.json())
    .then(reply => setChatLog(prevState => [...prevState, { content: reply, sender: "gpt" }]))
    .catch(error => {
      console.error("Encountered server error:", error)
      setChatLog(prevState => [...prevState, { content: "Could not get a reply from AI.", sender: "gpt" }])
    })
    .finally(() => setIsLoading(false))
  }
  return (
    <div className="h-full bg-yellow-500 flex flex-col items-center justify-center">
      <div className="w-5/6 max-w-[700px]">
      <h1 className="h1-bold text-center">Countdown to launch</h1>
      <h1 className="h1-bold text-center">01 : 13 : 05 : 55</h1>
      <p className="text-center">insert working countdow</p>
      <h3 className="h3-bold text-center pt-10 pb-2">Register with email</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex-center min-h-[40px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2 opacity-90">
                    <Image src="/assets/icons/search.svg" alt="email" width={22} height={22} />
                    <Input 
                      type="email" 
                      placeholder="Register with enter email address"
                      {...field}
                      className="p-regular-14 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <h1 className="h1-bold text-center pt-10">You will get:</h1>
      <p className="text-center py-3">Free premium access for life</p>
      <p className="text-center py-3">LifeSaver 2.0 for free</p>

      <p className="text-center py-3">style thi page TBD</p>
      </div>
    </div>
  )
}

export default RegisterPage