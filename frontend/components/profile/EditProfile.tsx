"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const EditProfile = ({ isTeacher }: { isTeacher: any }) => {
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
    <Dialog>
      <DialogTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
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
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input id="name" placeholder="Your Name" className="mt-2" />
          </div>

          {/* Subject */}
          {isTeacher ? (
            <>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Your Subject"
                  className="mt-2"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="class" className="block text-sm font-medium">
                  Class
                </label>
                <Input
                  id="class"
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
                  placeholder="Your roll"
                  className="mt-2"
                />
              </div>
            </>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="default" size="sm">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
