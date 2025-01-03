"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  return (
    <div
      className={`form-container absolute top-0 translate-x-0 w-1/2 h-full left-0 transition-transform duration-500 ease-in-out`}
    >
      <form className="flex flex-col items-center justify-center h-full md:p-8 p-2 text-center">
        <h1 className="font-bold text-2xl mb-4">Sign In</h1>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your credentials to access your account.
        </p>

        <Input name="email" type="text" placeholder="Email" className="mb-4" />
        <Input
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
