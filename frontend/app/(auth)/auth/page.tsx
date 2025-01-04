"use client";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import OverLay from "./OverLay";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PagesManifestPlugin = () => {
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const User_Data = JSON.parse(localStorage.getItem("user_data") || "{}");
  const router = useRouter();
  useEffect(() => {
    if (User_Data.access_token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="  mx-2 flex flex-col items-center pt-28  bg-white dark:bg-[#020817] h-screen">
      <div className="container relative border  rounded-lg shadow-lg w-[768px] max-w-full min-h-[400px]   md:min-h-[480px] overflow-hidden">
        <SignIn />
        <SignUp isRightPanelActive={isRightPanelActive} />
        <OverLay
          isRightPanelActive={isRightPanelActive}
          setRightPanelActive={setRightPanelActive}
        />
      </div>
    </div>
  );
};

export default PagesManifestPlugin;
