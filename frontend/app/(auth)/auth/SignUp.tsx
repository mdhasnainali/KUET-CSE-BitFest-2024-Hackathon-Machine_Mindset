
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Teacher from "./Teacher";
import Student from "./Student";

const SignUp = ({isRightPanelActive}:{isRightPanelActive:any}) => {
  return (
    <Tabs defaultValue="Teacher" className="w-[400px]">
      <TabsList className={`absolute top-8 z-10 right-24 cursor-pointer ${isRightPanelActive ? "" : "hidden"}`}>
        <TabsTrigger value="Teacher">Teacher</TabsTrigger>
        <TabsTrigger value="Student">Student</TabsTrigger>
      </TabsList>
      <TabsContent value="Teacher">
        <Teacher />
      </TabsContent>
      <TabsContent value="Student">
        <Student />
      </TabsContent>
    </Tabs>
  );
};

export default SignUp;
