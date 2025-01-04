"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const EditProfile = ({
  isTeacher,
  isAdmin,
  teacherInfo,
  studentInfo,
  isStudent,
}: {
  isTeacher: any;
  isAdmin: any;
  teacherInfo: any;
  studentInfo: any;
  isStudent: any;
}) => {
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  // teacher info
  const [name, setName] = useState(teacherInfo?.name || studentInfo?.name || "");
  const [subject, setSubject] = useState(teacherInfo?.subject || "");
  const [imageUrl, setImageUrl] = useState(teacherInfo?.image_url || "");
  // student info
  const [roll, setRoll] = useState(studentInfo?.roll || "");
  const [level, setLevel] = useState(studentInfo?.level || "");
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
  // Teacher Info
  const handleEditTeacher = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/profile/`,
        {
          name,
          subject,
          image_url: imageUrl,
        },
        {
          headers: {
            Authorization: ` Bearer ${userData.access_token}`,
          },
        }
      );
      console.log(res);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error:", error);
    }
  };
  //  Student info
  const handleEditStudent = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/student/profile/`,
        {
          name,
          roll,
          level,
          image_url: imageUrl,
        },
        {
          headers: {
            Authorization: ` Bearer ${userData.access_token}`,
          },
        }
      );
      console.log(res);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-primary-foreground shadow  h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        Edit Profile
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>

        {/* Profile Edit Form */}
        <div className="space-y-4">
          {/* Profile Image */}
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={userData.image || imageUrl}
                alt="Profile Image"
              />
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
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="mt-2"
            />
          </div>

          {!isAdmin && (
            <>
              {isTeacher ? (
                <>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Your Subject"
                      className="mt-2"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="class"
                      className="block text-sm font-medium"
                    >
                      Level
                    </label>
                    <Input
                      id="class"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      placeholder="Your class"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="Roll" className="block text-sm font-medium">
                      Roll
                    </label>
                    <Input
                      id="Roll"
                      value={roll}
                      onChange={(e) => setRoll(e.target.value)}
                      placeholder="Your roll"
                      className="mt-2"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-4 flex justify-end space-x-2">
          <DialogTrigger className=" shadow  h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm  transition-colors  bg-slate-100 text-black border font-semibold">
            Cancel
          </DialogTrigger>

          {isTeacher && (
            <>
              <div
                onClick={handleEditTeacher}
                className=" shadow  h-9 px-4 py-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  bg-black text-white border"
              >
                Save Changes
              </div>
            </>
          )}
          {isStudent && (
            <>
              <div
                onClick={handleEditStudent}
                className=" shadow  h-9 px-4 py-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  bg-black text-white border"
              >
                Save Changes
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
