import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaBlog, FaEnvelope, FaHome, FaInfoCircle, FaSignInAlt, FaCogs } from "react-icons/fa"; // Import new icons for missing menu items
import Profile from "@/components/profile/Profile";
import { Theme } from "./ui/Theme";

const Navbar = async () => {
  const isLogin = true;

  return (
    <nav className="bg-white z-50 dark:bg-[#020817] bg-opacity-30 backdrop-blur sticky top-0 p-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={"/"}
          className="text-black dark:text-white text-2xl font-bold flex items-center "
        >
          <span className="transition-opacity duration-300 ease-in-out hover:opacity-75">
            <code className="text-teal-500">Bangla</code>
            <code>Shift</code>
          </span>
        </Link>
        <ul className="md:flex space-x-6 hidden">
          <li>
            <Link href="/">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 hover:underline">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/chatbot">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 hover:underline">
                Chatbot
              </span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 hover:underline">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link href="/content-craft">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 hover:underline">
                ContentCraft
              </span>
            </Link>
          </li>
          <li>
            <Link href="/contribute">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 hover:underline">
                Contribute
              </span>
            </Link>
          </li>
        </ul>
        <div className="space-x-3 hidden md:flex items-center">
          <Theme />
          {isLogin ? (
            <>
              <Profile />
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <Button>
                  <FaSignInAlt className="mr-3" />
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
        {/* For mobile devices */}
        <div className="md:hidden block">
          <MobileNav isLogin={isLogin} />
        </div>
      </div>
    </nav>
  );
};

const MobileNav = ({ isLogin }: { isLogin: any }) => {
  return (
    <Sheet>
      <Theme />
      <SheetTrigger>
        <svg
          className="w-6 ml-2 h-6 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-gray-800">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center text-black dark:text-white">
            Menu
          </SheetTitle>
        </SheetHeader>
        <ul className="space-y-4 mt-4">
          <li>
            <Link href="/">
              <SheetTrigger>
                <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                  <FaHome className="mr-3" />
                  Home
                </span>
              </SheetTrigger>
            </Link>
          </li>
          <li>
            <Link href="/chatbot">
              <SheetTrigger>
                <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                  <FaBlog className="mr-3" />
                  Chatbot
                </span>
              </SheetTrigger>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                  <FaInfoCircle className="mr-3" />
                  Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link href="/content-craft">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                <FaCogs className="mr-3" />
                ContentCraft
              </span>
            </Link>
          </li>
          <li>
            <Link href="/contribute">
              <span className="cursor-pointer text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                <FaEnvelope className="mr-3" />
                Contribute
              </span>
            </Link>
          </li>
        </ul>
        <div className="space-x-3 absolute left-2 bottom-2 flex items-center">
          {isLogin ? (
            <div className="dark:bg-gray-800 flex items-center space-x-2 dark:text-white p-4 rounded">
              <Profile />
            </div>
          ) : (
            <div className="dark:bg-gray-800 dark:text-white p-4 rounded">
              <Link href="/login">
                <SheetTrigger>
                  <Button>
                    <FaSignInAlt className="mr-3" />
                    Login
                  </Button>
                </SheetTrigger>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
