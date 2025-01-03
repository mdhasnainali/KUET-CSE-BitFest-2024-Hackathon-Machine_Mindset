"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
Image;
const Finetune = () => {
  const [data, setData] = useState({
    banglish: `Khulna University of Engineering & Technology (KUET) is one of the top public research universities in Bangladesh, established in s equipped with modern facilities such as libraries, research labs, and hostels. KUET encourages students to take part in extracurricular activities like sports, cultural events, and technical clubs for overall growth. With highly qualified faculty members involved in national and international research, KUET plays a vital role in shaping the future of engineering education in Bangladesh.`,
    bangla: `খুলনা বিশ্ববিদ্যালয় অব ইঞ্জিনিয়ারিং এন্ড টেকনোলজি (KUET) বাংলাদেশে অন্যতম শীর্ষস্থানীয় পাবলিক গবেষণা বিশ্ববিদ্যালয়, যা ১৯৬৭ সালে প্রতিষ্ঠিত হয়। খুলনা শহরের দক্ষিণ-পশ্চিমাঞ্চলে অবস্থিত KUET প্রকৌশল এবং প্রযুক্তি ক্ষেত্রে উচ্চমানের শিক্ষা প্রদান করে। বিশ্ববিদ্যালয়টি সিভিল ইঞ্জিনিয়ারিং, ইলেকট্রিক্যাল অ্যান্ড ইলেকট্রনিক ইঞ্জিনিয়ারিং, মেকানিক্যাল ইঞ্জিনিয়ারিং এবং কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং সহ বিভিন্ন বিভাগের অধীনে স্নাতক এবং স্নাতকোত্তর প্রোগ্রাম প্রদান করে। KUET তার শিক্ষার্থীদের দক্ষ পেশাদার হিসেবে গড়ে তোলার জন্য পরিচিত, যারা দেশের উন্নয়নে গুরুত্বপূর্ণ অবদান রাখে। বিশ্ববিদ্যালয়ের ক্যাম্পাসে আধুনিক সুবিধা যেমন লাইব্রেরি, গবেষণা ল্যাব এবং ছাত্রাবাস রয়েছে। KUET শিক্ষার্থীদের ক্রীড়া, সাংস্কৃতিক অনুষ্ঠান এবং প্রযুক্তিগত ক্লাবের মতো অতিরিক্ত পাঠক্রমিক কর্মকাণ্ডে অংশগ্রহণে উৎসাহিত করে। উচ্চমানের শিক্ষকদের দ্বারা পরিচালিত জাতীয় এবং আন্তর্জাতিক গবেষণার মাধ্যমে KUET বাংলাদেশে প্রকৌশল শিক্ষার ভবিষ্যৎ গড়তে গুরুত্বপূর্ণ ভূমিকা পালন করছে।`,
  });
  return (
    <div className="container mx-auto p-4">
      <div>
        <Card className="shadow-lg relative">
          <Button className="animate-shimmer absolute right-4 top-8  border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors ">
            {" "}
            <Image
              width={20}
              height={20}
              src={"/chatbot.png"}
              alt="Chatbot Icon"
              className="mr-2 "
            />
            Fine Tune Models
          </Button>

          <CardHeader>
            <CardTitle className="text-2xl text-center mb-4">
              {" "}
              Fine-Tune Requests
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Add or Remove data to improve the conversion
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4 grid grid-cols-1 ">
            {Array.from({ length: 10 }).map((_, i) => (
              <>
                <Card className="shadow-lg">
                  <CardHeader className="hidden">
                    <CardTitle className="text-2xl text-center mb-4">
                      Contributing Requests
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                      Add or Remove data to improve the conversion
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                        Banglish
                      </h3>
                      {/* <Textarea
                          value={data.banglish}
                          className="w-full "
                        /> */}
                      <div className="w-full ">{data.banglish}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">
                        Bangla
                      </h3>
                      {/* <Textarea
                          value={data.bangla}
                          className="w-full "
                        /> */}
                      <div className="w-full ">{data.bangla}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="destructive" size="sm">
                      <AiFillDelete size={17} className="mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ))}
          </CardContent>
          <CardFooter className="hidden"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Finetune;
