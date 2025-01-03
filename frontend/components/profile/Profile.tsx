import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatarr from "./Avatarr";
import Logout from "./Logout";
import { Button } from "../ui/button";


const Profile = () => {
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatarr  />
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
        <div>
        </div>
        <div className="mt-6 gap-3 flex items-center justify-center">
          <Button>Edit Profile</Button>
          <Logout  />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Image from "next/image";
// import Avatarr from "./Avatarr";
// import Logout from "./Logout";


// const Profile = () => {
  

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <Avatarr  />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="p-4 shadow-lg rounded-lg w-72 ">
//         <div className="text-center">
//           <div className="flex flex-col items-center gap-2">
//             <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
//               <Image
//                 width={80}
//                 height={80}
//                 src={"/public.png"}
//                 alt="User Avatar"
//                 className="w-full h-full object-cover"
//               />
//             </div>
            
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {"tofaal91522@gmil.com"}
//             </p>
//           </div>
//         </div>
//         <div className="mt-6">
//           <Logout  />
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default Profile;
