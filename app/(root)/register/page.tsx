"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
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
import { Button } from "@/components/ui/button"
import Link from "next/link"

const FormSchema = z.object({
  email: z.string().email("Invalid email")
})

const RegisterPage = () => {
  
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const targetDate = new Date("2024-3-31")
  
  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
        // You can add code here to handle what happens when the target date is reached.
      }
    }, 1000)

    return () => {
      clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
    }
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "" as string
    },
  })

  const onSubmit = async(formData: z.infer<typeof FormSchema>) => {
    console.log("i'm here submitting register")
  }

  return (
    <section className="bg-dotted-pattern bg-contain py-5 md:py-10 bg-yellow-500 xl:px-5 min-h-full flex-center">
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
        
        <div className="flex flex-col justify-center gap-8 text-center">

          <h2 className="h2-bold text-center">Launch Countdown</h2>
          <div className="grid grid-cols-4 gap-1">
            <div>
              <h1 className="h1-bold">{time.days}</h1>
              <h3 className="p-regular-16">days</h3>
            </div>
            <div>
              <h1 className="h1-bold">{time.hours}</h1>
              <h3 className="p-regular-16">hours</h3>
            </div>
            <div>
              <h1 className="h1-bold">{time.minutes}</h1>
              <h3 className="p-regular-16">minutes</h3>
            </div>
            <div>
              <h1 className="h1-bold">{time.seconds}</h1>
              <h3 className="p-regular-16">seconds</h3>
            </div>
          </div>
          <p className="p-regular-18 md:p-regular-24">
            We are working tirelessly on the final touches. Your early interest will only encourage us further. Our earlybrids will receive <Link href="/#lifesaver" className="text-primary-500 font-medium">Lifesaver 2.0</Link> for free upon signup. Join our growing community today!
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex-center min-h-[60px] w-full overflow-hidden rounded-full bg-grey-50 pl-4 opacity-90">
                        <Input 
                          type="email" 
                          placeholder="Enter your email address to join"
                          {...field}
                          className="p-regular-14 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          disabled={isLoading}
                        />
                        <Button type="submit" className="h-[60px] rounded-none">Join Now</Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

        </div>
        <div className="flex w-full flex-center">
          <Image 
            src="/assets/images/start-up.png" 
            alt="hero"
            width={512} 
            height={512} 
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </div>
    </section>
  )
}

export default RegisterPage