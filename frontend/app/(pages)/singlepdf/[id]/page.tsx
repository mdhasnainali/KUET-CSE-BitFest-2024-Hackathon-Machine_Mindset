"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res1 = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/misc/contents/${params.id}`
        );
        setData(res1.data);
        console.log(res1.data);
      } catch (error: any) {
        console.log("Error fetching data:", error);
      }
    };
    fetchProblems();
  }, [params.id]);

  // Ensure data is loaded before rendering
  if (!data)
    return (
      <div className="text-center text-lg text-gray-600 font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-[#020817]">
      <div className="p-6 border rounded-lg shadow-xl max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white mb-4">
          {data?.title}
        </h1>
        <h2 className="text-md text-gray-700 dark:text-gray-400 mb-6">
          {data?.caption}
        </h2>
        {/* <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-6">
          {data.banglish}
        </p> */}
        <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-6">
          {data?.bangla}
        </p>
        <a href={data?.pdf_file} target="_blank" rel="noreferrer">
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            View Pdf
          </button>
        </a>
        <div className="mt-12 p-6 border rounded-lg shadow-lg flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={data?.teacher?.image_url}
              alt="Teacher"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {data?.teacher?.name}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {data?.teacher?.subject}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Teacher Info Section
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
