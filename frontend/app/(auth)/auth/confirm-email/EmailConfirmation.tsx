import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmailConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-white dark:bg-[#020817]">
      <div className="bg-black shadow-md p-8 rounded-lg text-center max-w-sm">
        <img
          src="/mail.jpeg"
          alt="Email confirmation"
          className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-[#008966] shadow-sm"
        />
        <h1 className="text-2xl font-semibold text-white mb-4">
          Your email has been confirmed!
        </h1>
        <Link href="/login">
          <Button className="mt-4 px-6 py-2 text-sm font-medium bg-[#008966] text-white hover:bg-[#007d57] transition duration-200 ease-in-out">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmailConfirmation;
