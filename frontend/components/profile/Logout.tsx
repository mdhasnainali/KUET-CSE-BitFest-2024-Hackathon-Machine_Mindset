"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    try {
      localStorage.removeItem("user_data");
      router.push("/auth");
      router.refresh();
      toast.success("Logout successful");
    } catch (e) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="text-center">
      <Button onClick={handleLogout} type="submit" variant="destructive">
        Log out
      </Button>
    </div>
  );
};

export default Logout;
