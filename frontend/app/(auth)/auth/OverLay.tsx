"use client";
import { useState } from "react";

const OverLay = ({
  isRightPanelActive,
  setRightPanelActive,
}: {
  setRightPanelActive: any;
  isRightPanelActive: any;
}) => {
  // const [isRightPanelActive, setRightPanelActive] = useState(false);
  return (
    <div
      className={`overlay-container animate-shimmer absolute top-0 w-1/2 h-full left-1/2 overflow-hidden transition-transform  ease-in-out ${
        isRightPanelActive ? "-translate-x-full" : "translate-x-0"
      }
      } border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors`}
    >
      <div
        className="overlay bg-gradient-to-r  h-full w-[200%] left-[-100%] absolute transition-transform  ease-in-out"
        style={{
          transform: isRightPanelActive ? "translateX(50%)" : "translateX(0)",
        }}
      >
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center p-5 text-center transition-transform duration-500 ${
            isRightPanelActive ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="font-bold md:text-3xl ">Welcome Back!</h1>
          <p className="mt-4 text-xs md:text-sm">
            To keep connected with us please login with your personal info
          </p>
          <button
            className="rounded-full border border-white text-white px-8 py-3 font-bold mt-4 text-xs md:text-sm"
            onClick={() => setRightPanelActive(false)}
          >
            Sign In
          </button>
        </div>
        <div
          className={`t absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center p-5 text-center transition-transform duration-500 ${
            isRightPanelActive ? "translate-x-20" : "translate-x-0"
          }`}
        >
          <h1 className="font-bold md:text-3xl">Hello, Friend!</h1>
          <p className="mt-4 text-xs md:text-sm">
            Enter your personal details and start your journey with us
          </p>
          <button
            className="rounded-full border border-white text-white px-8 py-3 font-bold mt-4 text-xs md:text-sm"
            onClick={() => setRightPanelActive(true)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverLay;
