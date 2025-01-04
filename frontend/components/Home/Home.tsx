"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Search from "./Search";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ChatRef from "./ChatRef";

const Home = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/misc/contents/`
        );
        setCardData(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [userData.access_token]);

  const [cardDataTeacher, setCardDataTeacher] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/misc/all-teachers/`
        );
        setCardDataTeacher(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [userData.access_token]);

  return (
    <section className="bg-white dark:bg-[#020817] py-8">
      <main className="flex max-w-7xl mx-auto min-h-screen flex-col items-center justify-start space-y-12">
        {/* Search Section */}
        <Search
          setCardData={setCardData}
          setCardDataTeacher={setCardDataTeacher}
        />

        {/* Cards Section */}
        <div className="w-full">
          <h2 className="text-3xl font-semibold mb-6 pl-4 text-gray-800 dark:text-white">
            Contents :
          </h2>
          {cardData.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full px-3">
              {cardData.map((card) => (
                <Card
                  key={card.id}
                  className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden transition-all"
                >
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold mb-2 hover:underline cursor-pointer">
                      {card.title}
                    </h2>
                    <h3 className="text-sm text-muted-foreground mb-4">
                      {card.caption}
                    </h3>
                    <p className="dark:text-gray-300 text-gray-700">
                      {card.bangla}
                    </p>

                    <div className="flex items-center mt-4 space-x-4">
                      <Avatar>
                        <AvatarImage src={card.teacher.image_url} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {card.teacher.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {card.teacher.subject}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4">
                    {/* Button 1 */}
                    <Link href={`/singlepdf/${card.id}`}>
                      <button className="py-2 rounded-md relative bg-slate-700 text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400">
                        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                        <span className="relative z-20">View</span>
                      </button>
                    </Link>
                    <ChatRef id={card.id} />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No content available.
            </p>
          )}
        </div>

        {/* Teachers Section */}
        <div className="w-full">
          <h2 className="text-3xl font-semibold mb-6 pl-4 text-gray-800 dark:text-white">
            Teachers :
          </h2>
          {cardDataTeacher.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full px-3">
              {cardDataTeacher.map((teacher) => (
                <Card
                  key={teacher.id}
                  className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden transition-all"
                >
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold mb-2">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {teacher.subject}
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <Avatar>
                        <AvatarImage src={teacher.image_url} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg">{teacher.name}</h4>
                        <p className="text-sm text-gray-400">{teacher.subject}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No teachers available.
            </p>
          )}
        </div>
      </main>
    </section>
  );
};

export default Home;
