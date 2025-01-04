"use client";

import { useState } from "react";
import TextEditor from "./TextEditor";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [input, setInput] = useState("");
  const [publicContent, setPublic] = useState(true);
  const [font, setFont] = useState("SirajeeSanjar");
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const router = useRouter();

  function stripHtmlTags(html: string) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const exportPdf = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/content-management/`,
        {
          banglish: stripHtmlTags(input),
          public: publicContent,
          font: font,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
          },
        }
      );
      setLoading(false);

      if (res.status === 201) {
        window.open(`${res.data["pdf_file"]}`, "_blank");
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <section className="bg-white dark:bg-[#020817] min-h-[90vh] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold dark:text-white mb-8">
          Content Editor 😊
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Text Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <TextEditor setInput={setInput} input={input} />
          </CardContent>
          <CardFooter>
            <div className="p-4"></div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="public-toggle"
                className="text-sm font-medium"
              >
                Make it public
              </Label>
              <Switch
                id="public-toggle"
                checked={publicContent}
                onCheckedChange={setPublic}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="font-select"
                className="text-sm font-medium"
              >
                Choose a font
              </Label>
              <Select defaultValue="SirajeeSanjar" onValueChange={setFont}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fonts</SelectLabel>
                    <SelectItem value="AdorNoirrit">Ador Noirrit</SelectItem>
                    <SelectItem value="AlinurNakkhatra">
                      Alinur Nakkhatra
                    </SelectItem>
                    <SelectItem value="AlinurShowpnocari">
                      Alinur Showpnocari
                    </SelectItem>
                    <SelectItem value="Sankalpa">Sankalpa</SelectItem>
                    <SelectItem value="SirajeeSanjar">Sirajee Sanjar</SelectItem>
                    <SelectItem value="SwarnaliOkkhor">
                      Swarnali Okkhor
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={exportPdf}
              className={`w-full items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${
                loading && "cursor-not-allowed opacity-50"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.966 7.966 0 014 12H2c0 2.485 1.015 4.735 2.707 6.293l1.293-1.002z"
                    ></path>
                  </svg>
                  <span>Generating your PDF, please wait a moment...</span>
                </div>
              ) : (
                "Export as Pdf"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Page;

