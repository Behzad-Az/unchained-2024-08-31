"use client"

import Image from "next/image"
import { useState } from "react"
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
    message: "Message is too short.",
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
        {content}
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
    setChatLog(prevState => [...prevState, { content: formData.message, sender: "user" }])
    setIsLoading(true)
    form.reset({ message: "" })
    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(json => setChatLog(prevState => [...prevState, { content: json.results[0].email, sender: "gpt" }]))
    .catch(error => {})
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
                      placeholder={isLoading ? "Getting reply from AI.." : "Ask me anything about 909 Mainland Street"}
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