"use client";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";

const Search = ({
  setCardData,
  setCardDataTeacher,
}: {
  setCardData: any;
  setCardDataTeacher: any;
}) => {
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogTriggerRef = useRef<any>(null); // Ref for the DialogTrigger

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        if (dialogTriggerRef.current) {
          dialogTriggerRef.current.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/misc/search/`,
        {
          search_text: search,
        }
      );
      console.log(res);
      setCardData(res.data.contents);
      setCardDataTeacher(res.data.teachers);

      // Close the dialog after search completes
      if (dialogTriggerRef.current) {
        dialogTriggerRef.current.click();
      }

      setLoading(false);
    } catch (error) {
      console.log("Error during search:", error);
      setLoading(false);
    }
  };

  return (
    <form>
      <Dialog>
        <DialogTrigger ref={dialogTriggerRef}>
          <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-none text-slate-300 dark:text-slate-400"
                aria-hidden="true"
              >
                <path d="m19 19-3.5-3.5"></path>
                <circle cx="11" cy="11" r="6"></circle>
              </svg>
              <span className="flex-auto">Quick search...</span>
              <div className="md:flex hidden">ctrl + k</div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent ref={dialogRef}>
          <DialogHeader>
            <DialogTitle>{"  "}</DialogTitle>
            <DialogDescription>
              <Input
                type="text"
                value={search}
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for users and PDFs..."
                className="mt-4"
              />

              <Button onClick={handleSubmit} type="submit" className="mt-4">
                Search
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default Search;
