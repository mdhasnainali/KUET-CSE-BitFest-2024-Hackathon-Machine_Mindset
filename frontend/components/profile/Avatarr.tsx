import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Avatarr = () => {
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  console.log(userData);
  
  return (
    <Avatar>
      <AvatarImage src={userData?.image ||  "/chatbot.png"} />
      <AvatarFallback>
        <Image width={80} height={80} src="/chatbot.png" alt="" />
      </AvatarFallback>
    </Avatar>
  );
};

export default Avatarr;
