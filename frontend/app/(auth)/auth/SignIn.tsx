"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/rest-auth/login/`,
        {
          email,
          password,
        }
      );

      const { access, refresh, normal_user, admin, user, role,image } = res.data;

      const userData = {
        access_token: access,
        refresh_token: refresh,
        user,
        normal_user,
        admin,
        role: role,
        image: image,
      };
      localStorage.setItem("user_data", JSON.stringify(userData));

      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      toast.success("Login successful");
      window.location.href = "/"; 
    } catch (error) {
      toast.error("Login failed");
      console.log("Error", error);
    }
  };
  return (
    <div
      className={`form-container absolute top-0 translate-x-0 w-1/2 h-full left-0 transition-transform duration-500 ease-in-out`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-full md:p-8 p-2 text-center"
      >
        <h1 className="font-bold text-2xl mb-4">Sign In</h1>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your credentials to access your account.
        </p>

        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="text"
          placeholder="Email"
          className="mb-4"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
          className="mb-4"
        />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default SignIn;
