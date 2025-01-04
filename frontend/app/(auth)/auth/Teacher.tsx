import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const Teacher = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Add state for upload status

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const imgbbAPIKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );

      const uploadedImageUrl = response.data.data.url;
      setImageUrl(uploadedImageUrl); 
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      console.error("Image upload error:", error);
    } finally {
      setIsUploading(false); 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password1.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    if (password1 !== password2) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/registration/`,
        {
          name,
          subject,
          email,
          password1,
          password2,
          image_url: imageUrl,
        }
      );

      if (res.status === 201) {
        toast.success("Verification email sent.");
        setTimeout(() => {
          window.location.href = "/auth";
        }, 700);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Please register with another email.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={`form-container absolute top-0 translate-x-full w-1/2 h-full left-0 transition-transform duration-500 ease-in-out`}>
      <form className="flex flex-col items-center justify-center h-full md:p-8 p-2 text-center" onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4 mb-4 mt-8">
          <Avatar>
            {imageUrl ? (
              <AvatarImage src={imageUrl} alt="Teacher Avatar" />
            ) : (
              <AvatarFallback>U</AvatarFallback>
            )}
          </Avatar>
          <Button variant="outline" size="sm" className="relative">
            {isUploading ? "Uploading..." : "Upload Image"}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-4"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <Input
          name="password2"
          type="password"
          placeholder="Confirm Password"
          className="mb-4"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <Input
          name="subject"
          type="text"
          placeholder="Subject"
          className="mb-4"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default Teacher;
