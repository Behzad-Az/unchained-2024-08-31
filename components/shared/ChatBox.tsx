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

const ChatLine = ({ content, sender }: Message) => {
  const params = {
    containerClass: sender === "gpt" ? "w-full flex flex-row items-end pr-12" : "w-full flex flex-row-reverse items-end pl-12",
    src: sender === "gpt" ? "/assets/icons/ai.svg" : "/assets/icons/user.svg",
    alt: sender,
    imgClass: sender === "gpt" ? "mr-2" : "ml-2",
    pClass: sender === "gpt" ? "px-2 py-2 rounded-md text-sm bg-violet-400" : "px-2 py-2 rounded-md text-sm bg-violet-100"
  }
  return (
    <div className={params.containerClass}>
      <Image 
        src={params.src}
        alt={params.alt}
        width={22}
        height={22}
        className={params.imgClass}
      />
      <p className={params.pClass}>
        {sender === "gpt" && content === "spinner" ? <Image src="/assets/icons/spinner.svg" alt="spinner" width={18} height={18} /> : content }
      </p>
    </div>
  )
}

const ChatBox = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chatLog, setChatLog] = useState<Message[]>(mockChatLog)
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "" as string,
    },
  })

  const onSubmit = async(formData: z.infer<typeof FormSchema>) => {
    setChatLog(prevState => [...prevState, { content: formData.message, sender: "user" }, { content: "spinner", sender: "gpt" }])
    setIsLoading(true)
    // const apiAddress = "http://ec2-35-182-161-73.ca-central-1.compute.amazonaws.com:8000/get-building-info"
    const apiAddress = "https://stratabot-af3cb4b114da.herokuapp.com/get-building-info"
    form.reset({ message: "" })
    fetch(apiAddress, {
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
    .then(reply => setChatLog(prevState => {
      const newState = [...prevState].filter(item => !(item.content === "spinner" && item.sender === "gpt"))
      return [...newState, { content: reply, sender: "gpt" }]
    }))
    .catch(error => {
      console.error("Encountered server error:", error)
      setChatLog(prevState => [...prevState, { content: "Could not get a reply from AI.", sender: "gpt" }])
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <div className="w-full flex min-h-[400px] max-h-[600px] flex-col-reverse bg-yellow-500 border-gray-700 border-2 rounded-lg px-3 py-3 gap-3 overflow-scroll">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex-center min-h-[40px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 opacity-90">
                    <Image src="/assets/icons/conversation.svg" alt="chat" width={22} height={22} />
                    <Input 
                      type="text" 
                      placeholder={isLoading ? "Getting reply from AI..." : "Ask me anything about 909 Mainland Street"}
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
      {
        [...chatLog].reverse().map((chat, index) => <ChatLine key={chat.content} {...chat} />)
      }
    </div>
  )
}

export default ChatBox