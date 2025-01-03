"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex  flex-col items-center justify-center  dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-8xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 animate-pulse">
        404
      </h1>
      <p className="text-3xl mb-8 font-light tracking-wide">Page Not Found</p>
      <p className="max-w-md text-center mb-8 text-gray-600 dark:text-gray-400">
        {
          "Uh-oh! The page you're trying to reach has wandered off into cyberspace."
        }
      </p>

      <Link href="/">
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="mr-2">🏠</span>Return to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
