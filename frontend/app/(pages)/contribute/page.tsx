"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const Page = () => {
  const [data, setData] = useState({
    banglish: "",
    bangla: "",
  });
  const handleTextChange = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
 
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_URL}/administrator/contribution/`, data, {
        headers: {
          Authorization: `Bearer ${userData.access_token}`,
        },
      });
      console.log(res);
      toast.success("Contribution submitted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit contribution");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#020817] min-h-[90vh] py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center mb-4">
              {" "}
              Contribute to improve Banglish to Bangla Conversion
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Edit the text below to improve the conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  Banglish
                </h3>
                <Textarea
                placeholder="Type Banglish text here"
                  value={data.banglish}
                  onChange={(e) => handleTextChange("banglish", e.target.value)}
                  className="w-full h-[400px] resize-none"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">
                  Bangla
                </h3>
                <Textarea
                placeholder="Type Bangla text here"
                  value={data.bangla}
                  onChange={(e) => handleTextChange("bangla", e.target.value)}
                  className="w-full h-[400px] resize-none"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              size="lg"
              type="submit"
              className="animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Submit Contribution
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default Page;
