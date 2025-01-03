import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Teacher = () => {
  return (
    <div
      className={`form-container absolute top-0 translate-x-full w-1/2 h-full left-0 transition-transform duration-500 ease-in-out`}
    >
      <form className="flex flex-col items-center justify-center h-full md:p-8 p-2 text-center">
        {/* <h1 className="font-bold text-2xl mb-4">Sign Up teachar</h1>
        <p className="text-sm text-gray-500 mb-6">
          Create an account to get started and enjoy all the features.
        </p> */}

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
        <Input
          name="subject"
          type="text"
          placeholder="subject"
          className="mb-4"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default Teacher;
