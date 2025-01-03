import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatarr from "./Avatarr";
import EditProfile from "./EditProfile";
import Logout from "./Logout";

const Profile = ({isTeacher}:{isTeacher:any}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatarr />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 shadow-lg rounded-lg w-72 ">
        <div className="text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              name: Md tofaal Ahmed
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              email: {"tofaal91522@gmil.com"}
            </p>
          </div>
        </div>
        <div></div>
        <div className="mt-6 gap-3 flex items-center justify-center">  
          <EditProfile isTeacher={isTeacher} />
          <Logout />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
