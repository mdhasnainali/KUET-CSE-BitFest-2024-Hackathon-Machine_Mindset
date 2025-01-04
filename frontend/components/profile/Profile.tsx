"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatarr from "./Avatarr";
import EditProfile from "./EditProfile";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const Profile = ({
  isTeacher,
  isStudent,
  isAdmin,
}: {
  isTeacher: any;
  isAdmin: any;
  isStudent: any;
}) => {
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");

  // Teacher Info
  const [teacherInfo, setteacherInfo] = useState<any>({});
  if(isTeacher){
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/profile/`,
            {
              headers: {
                Authorization: `Bearer ${userData.access_token}`,
              },
            }
          );
          setteacherInfo(res.data);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch teacherInfo");
        }
      };
  
      fetchData();
    }, [userData.access_token]);
  }
  
  // Student Info
  const [studentInfo, setstudentInfo] = useState<any>({});
  if(isStudent){
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_ROOT_URL}/student/profile/`,
            {
              headers: {
                Authorization: `Bearer ${userData.access_token}`,
              },
            }
          );
          setstudentInfo(res.data);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch studentInfo");
        }
      };
  
      fetchData();
    }, [userData.access_token]);
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_ROOT_URL}/student/profile/`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${userData.access_token}`,
  //           },
  //         }
  //       );
  //       setstudentInfo(res.data);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Failed to fetch studentInfo");
  //     }
  //   };

  //   fetchData();
  // }, [userData.access_token]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatarr />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 shadow-lg rounded-lg w-72 ">
        <div className="text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isTeacher ? <> name: {teacherInfo?.name}</> : null}
              {isStudent ? <> name: {studentInfo?.name}</> : null}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isTeacher ? <> subject: {teacherInfo?.subject}</> : null}
              {isStudent ? <> level: {studentInfo?.level}</> : null}
            </p>
          </div>
        </div>
        <div></div>
        <div className="mt-6 gap-3 flex items-center justify-center">
          {!isAdmin && (
            <EditProfile
              teacherInfo={teacherInfo}
              studentInfo={studentInfo}
              isTeacher={isTeacher}
              isAdmin={isAdmin}
              isStudent={isStudent}
            />
          )}

          <Logout />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
