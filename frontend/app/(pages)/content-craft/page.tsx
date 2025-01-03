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

const Page = () => {
  const [input, setInput] = useState(null);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <section className="bg-white dark:bg-[#020817] min-h-[90vh] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold  dark:text-white mb-8 ">
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
                htmlFor="email-notifications"
                className="text-sm font-medium"
              >
                Make it private
              </Label>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Export as Pdf
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Page;
