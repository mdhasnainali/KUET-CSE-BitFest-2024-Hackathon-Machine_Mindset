"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { SendHorizonal } from "lucide-react"; // Adjust icon import as necessary
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

const ChatRef = ({ id }: { id: any }) => {
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const [message, setMessage] = useState(""); // User input message
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  ); // Chat history

  const handleChatRef = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission and page reload

    if (!message.trim()) return; // Don't send empty messages

    // Add the user's message to the chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);

    try {
      // Send the user's message to the chatbot API
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/misc/chatbot/`,
        {
          content_id: id,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
          },
        }
      );

      // Add the chatbot's response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: res.data.message || "No reply from bot" },
      ]);

      // Clear the input field after sending
      setMessage("");
      toast.success("Message sent successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to get data");
    }
  };

  return (
    <form onSubmit={handleChatRef}>
      <Dialog>
        <DialogTrigger>
          <div className="animate-shimmer flex items-center space-x-2 py-2 border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors">
            <Image
              width={20}
              height={20}
              src={"/chatbot.png"}
              alt="Chatbot Icon"
              className="mr-2"
            />
            Chat with Bot
          </div>
        </DialogTrigger>
        <DialogContent className="w-[400px] max-h-[500px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Chatbot</DialogTitle>
            <DialogDescription>
              <Card className="w-full h-full max-w-3xl mx-auto rounded-none md:border border-0">
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
                    {messages.length === 0 && (
                      <div className="mt-[5rem] text-center text-muted-foreground">
                        Start a conversation with the chatbot.
                      </div>
                    )}
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${
                          message.sender === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block min-w-sm p-2 rounded-lg ${
                            message.sender === "user"
                              ? "bg-[#091e3f] text-white text-left"
                              : "bg-[#185d55] text-white"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    <div className="block h-[100px]"></div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="sticky bottom-0 dark:bg-black bg-white">
                  <div className="flex w-full space-x-2">
                    <Input
                      placeholder="Type your message here..."
                      className="flex-grow"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      onClick={ handleChatRef}
                      className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                      type="submit"
                    >
                      <SendHorizonal />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default ChatRef;
