import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cardData } from "@/constant";
import Image from "next/image";
import Search from "./Search";

const Home = () => {
  return (
    <section className="bg-white dark:bg-[#020817]">
      <main className="flex max-w-7xl mx-auto min-h-screen flex-col items-center justify-between  ">
        {/* Search Section */}
        <Search />
        {/* Cards Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full px-3">
          {cardData.map((card) => (
            <Card key={card.id} className="w-full max-w-md mx-auto">
              <CardContent className="p-3">
                <div className="aspect-video relative mb-4">
                  <Image
                    src={card.image}
                    width={700}
                    height={700}
                    alt={`Image for ${card.title}`}
                    className="rounded-md"
                  />
                </div>
                <h2 className="text-xl font-bold mb-2 hover:underline cursor-pointer">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {/* btn 1 */}
                <button className=" py-2 rounded-md relative bg-slate-700  text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 ">
                  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                  <span className="relative z-20 ">View</span>
                </button>
                {/* btn 2 */}
                <Button className="animate-shimmer  border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors ">
                  {" "}
                  <Image
                    width={20}
                    height={20}
                    src={"/chatbot.png"}
                    alt="Chatbot Icon"
                    className="mr-2 "
                  />
                  Play
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Home;
