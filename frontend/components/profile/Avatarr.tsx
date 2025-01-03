import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Avatarr = () => {
  return (
    <Avatar>
      <AvatarImage src={"/chatbot.png"} />
      <AvatarFallback>
        <Image width={80} height={80} src="/chatbot.png" alt="" />
      </AvatarFallback>
    </Avatar>
  );
};

export default Avatarr;
