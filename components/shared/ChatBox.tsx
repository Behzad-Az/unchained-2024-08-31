import Image from "next/image"
import React from "react"
import { Input } from "@/components/ui/input"
import { mockChatLog } from "@/constants"

const ChatLine = ({ content, sender }: { content: string, sender: "gpt" | "user" }) => {
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
  return (
    <div className="w-full flex flex-col-reverse bg-yellow-500 border-gray-700 border-2 rounded-lg h-[400px] px-3 py-3 gap-3 overflow-scroll">
      <div className="flex-center min-h-[40px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 opacity-90">
        <Image src="/assets/icons/conversation.svg" alt="chat" width={22} height={22} />
        <Input 
          type="text"
          placeholder="Ask me anything about 909 Mainland St"
          disabled 
          className="p-regular-14 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      {
        mockChatLog.reverse().map((chat, index) => <ChatLine key={index} {...chat} />)
      }
    </div>
  )
}

export default ChatBox