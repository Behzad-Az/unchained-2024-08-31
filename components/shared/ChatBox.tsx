"use client"

import { useMemo, useRef, useState } from "react"
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
import { Button } from "../ui/button"
import { createChatlog } from "@/lib/actions/chatlog.actions"

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

const ChatBox = ({ clientIp }: { clientIp: string }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chatlogState, setChatlogState] = useState<Message[]>(mockChatLog)
  const sessionRef = useMemo<string>(() => (Math.random() + 1).toString(36).substring(3), []);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "" as string,
    },
  })

  const onSubmit = async(formData: z.infer<typeof FormSchema>) => {
    const { message } =  formData

    setChatlogState(prevState => [...prevState, { content: message, sender: "user" }, { content: "spinner", sender: "gpt" }])
    setIsLoading(true)
    form.reset({ message: "" })

    let dbId: string = ""
    createChatlog({ ip: clientIp, sender: "user", content: message, sessionRef, messageRef: "first_message" })
    .then(dbResponse => {
      dbId = dbResponse._id as string
      // const apiAddress = "http://ec2-35-182-161-73.ca-central-1.compute.amazonaws.com:8000/get-building-info"
      const apiAddress = "https://stratabot-af3cb4b114da.herokuapp.com/get-building-info"
      return fetch(apiAddress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: "same-origin",
        body: JSON.stringify({
          "address": "909Mainland",
          "prompt": message
        })
      })
    })
    .then(response => response.json())
    .then(reply => {
      createChatlog({ ip: clientIp, sender: "gpt", content: reply, sessionRef, messageRef: dbId })
      setChatlogState(prevState => {
        const newState = [...prevState].filter(item => !(item.content === "spinner" && item.sender === "gpt"))
        const countUserQuestions = newState.reduce((accumulator, value) => {
          return value.sender === "user" ? accumulator + 1 : accumulator
        }, 0)
        return countUserQuestions % 3 === 0 ? 
          [...newState, { content: reply, sender: "gpt" }, {content: "Don't miss important facts about 909 Mainland Street? See our AI generated 1-Pager.", sender: "gpt"}]
          : [...newState, { content: reply, sender: "gpt" }]
      })
    })
    .catch(error => {
      console.error("Encountered server error:", error)
      createChatlog({ ip: clientIp, sender: "gpt", content: `Error - Could not get a reply from AI: ${error}`, sessionRef, messageRef: dbId })
      setChatlogState(prevState => [...prevState, { content: "Could not get a reply from AI.", sender: "gpt" }])
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <div id="chatbox" className="w-full flex min-h-[400px] max-h-[600px] flex-col-reverse bg-yellow-500 border-gray-700 border-2 rounded-lg px-3 py-3 gap-3 overflow-scroll shadow-md">
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
                    <Button type="submit" size="icon" className="bg-transparent hover:bg-transparent" disabled={isLoading}>
                      <Image src="/assets/icons/send.svg" alt="send" width={22} height={22} />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {
        [...chatlogState].reverse().map((chat, index) => <ChatLine key={chat.content} {...chat} />)
      }
    </div>
  )
}

export default ChatBox