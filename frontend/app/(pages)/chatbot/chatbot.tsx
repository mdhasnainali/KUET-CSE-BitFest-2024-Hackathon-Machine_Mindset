"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { messages } from "@/constant";
import axios from "axios";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const chatbot = () => {

  interface Message {
    role: string;
    content: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const sendMessage = async (message: string) => {

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "user",
        content: message,
      },
    ]);

    setMessage("");
    window.scrollTo(0, document.body.scrollHeight + 1000);

    // Send message to the server
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/misc/chatbot/`,
      {
        "message": message
      }
    );

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "bot",
        content: response.data.message,
      },
    ]);

    window.scrollTo(0, document.body.scrollHeight + 1000);
  }

  
  return (
    <Card className="w-full h-full  max-w-3xl mx-auto rounded-none md:border border-0">
      <CardHeader>
        <CardTitle className="text-[#1a87f8] flex items-center gap-2">
          <Image
            width={30}
            height={30}
            src={"/chatbot.png"}
            alt="Chatbot Icon"
          />
          Chatbot
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="flex-1">
          {
            messages.length === 0 && (
              <div className="mt-[5rem] text-center text-muted-foreground">
                Start a conversation with the chatbot.
              </div>
            )
          }
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"
                }`}
            >
              <div
                className={`inline-block min-w-sm p-2 rounded-lg ${message.role === "user"
                  ? "bg-[#091e3f] text-white text-left"
                  : "bg-[#185d55] text-white"
                  }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          <div className="block h-[100px]">
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="sticky bottom-0 dark:bg-black bg-white ">
        <form className="flex w-full space-x-2" onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Type your message here..."
            className="flex-grow"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="inline-flex  animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={() => sendMessage(message)}
          >
            <SendHorizonal />
          </button>
        </form>
      </CardFooter>
      {/* <div className="text-xs hidden md:flex justify-center items-center  text-muted-foreground text-center text-wrap py-1">
        Chatbots can make errors.
      </div> */}
    </Card>
  );
};

export default chatbot;
