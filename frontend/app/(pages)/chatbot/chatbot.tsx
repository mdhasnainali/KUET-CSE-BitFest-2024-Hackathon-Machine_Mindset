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
import { messages } from "@/constant";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";

const chatbot = () => {
  return (
    <Card className="w-full mt-12 max-w-3xl mx-auto md:mb-16">
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
      <CardContent>
        <ScrollArea className="md:h-[500px] pr-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-[#091e3f] text-white"
                    : "bg-[#185d55] text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-0 px-6 pb-2">
        <form className="flex w-full space-x-2">
          <Input
            placeholder="Type your message here..."
            className="flex-grow"
          />

          <button className="inline-flex  animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <SendHorizonal />
          </button>
        </form>
      </CardFooter>
      <div className="text-xs hidden md:flex justify-center items-center  text-muted-foreground text-center text-wrap py-1">
        Chatbots can make errors.
      </div>
    </Card>
  );
};

export default chatbot;
