import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
const Student = () => {
  const [image, setImage] = useState<string | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  return (
    <div
      className={`form-container absolute top-0 translate-x-full w-1/2 h-full left-0 transition-transform duration-500 ease-in-out`}
    >
      <form className="flex flex-col items-center justify-center h-full md:p-8 p-2 text-center">
      <div className="flex items-center space-x-4 pt-10 pb-5">
          <Avatar>
            <AvatarImage src={image || "/chatbot.png"} alt="Profile Image" />
            <AvatarFallback>PI</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="relative">
            Change Image
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </Button>
        </div>

        <Input
          name="username"
          type="text"
          placeholder="Name"
          className="mb-4"
        />
        <Input name="email" type="email" placeholder="Email" className="mb-4" />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-4"
        />

        <Input name="class" type="text" placeholder="class" className="mb-4" />
        <Input name="roll" type="text" placeholder="roll" className="mb-4" />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default Student;
