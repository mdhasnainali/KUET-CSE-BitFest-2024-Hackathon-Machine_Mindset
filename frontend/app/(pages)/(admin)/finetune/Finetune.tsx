"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";

const Finetune = () => {
  const [contributions, setContributions] = useState<any[]>([]);
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/administrator/contribution/`,
          {
            headers: {
              Authorization: `Bearer ${userData.access_token}`,
            },
          }
        );
        setContributions(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch contributions");
      }
    };

    fetchData();
  }, [userData.access_token]);

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/administrator/contribution/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
          },
        }
      );
      toast.success("Contribution deleted successfully");
      window.location.href = "/finetune";
    } catch (error) {
      toast.error("Failed to delete contribution");
    }
  };
  // llm
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/administrator/train_llm_model/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
          },
        }
      );
      console.log(res);
      window.location.href = "/finetune";
      toast.success("LLm model training Started ");
    } catch (error) {
      console.log(error);
      toast.error("Failed to train LLM model");
    }
  };
  return (
    <form className="container mx-auto p-4">
      <div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center mb-4">
              Fine-Tune Requests
            </CardTitle>
            <CardDescription className="text-center text-gray-600 pb-4 dark:text-gray-400">
              Add or Remove data to improve the conversion
            </CardDescription>
            <Button
              onClick={handleSubmit}
              type="submit"
              className="animate-shimmer  border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors"
            >
              <Image
                width={20}
                height={20}
                src={"/chatbot.png"}
                alt="Chatbot Icon"
                className="mr-2"
              />
              Fine Tune Models
            </Button>
          </CardHeader>
          <CardContent className="gap-4 grid grid-cols-1">
            {contributions.map((contribution) => (
              <div key={contribution.id}>
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
                      <h3 className="text-lg font-semibold mb-2 text-blue-600  dark:text-blue-400">
                        Banglish
                      </h3>
                      <div className="w-full">{contribution.banglish}</div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">
                        Bangla
                      </h3>
                      <div className="w-full">{contribution.bangla}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(contribution.id)}
                    >
                      <AiFillDelete size={17} className="mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default Finetune;
