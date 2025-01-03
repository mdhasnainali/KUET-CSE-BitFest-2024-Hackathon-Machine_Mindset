"use client";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import OverLay from "./OverLay";
import { useState } from "react";

const PagesManifestPlugin = () => {
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  return (
    <div className="  mx-2 flex flex-col items-center pt-28  bg-white dark:bg-[#020817] h-screen">
      <div className="container relative border  rounded-lg shadow-lg w-[768px] max-w-full min-h-[400px]   md:min-h-[480px] overflow-hidden">
        <SignIn />
        <SignUp isRightPanelActive={isRightPanelActive} />
        <OverLay isRightPanelActive={isRightPanelActive} setRightPanelActive={setRightPanelActive}/>
      </div>
    </div>
  );
};

export default PagesManifestPlugin;