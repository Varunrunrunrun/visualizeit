"use client";
import React, { useContext, useEffect, useState } from "react";
import WorkspaceHeader from "../../_components/WorkspaceHeader";
import Editor from "../../_components/Editor";
import Canvas from "../../_components/Canvas";
import { useConvex } from "convex/react";
import { FILE } from "../../../dashboard/_components/FileList";
import { api } from "@/convex/_generated/api";
import { ActiveTeamContext } from "@/app/_context/FilesListContext";
import { TEAM } from "@/app/(routes)/dashboard/_components/SideNavTop";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Description } from "@radix-ui/react-dialog";

const Workspace = ({params}:any) => {
    const [triggerSave,setTriggerSave]=useState(false);
    const convex=useConvex();
    const [fileData,setFileData]=useState<FILE|any>();
    const [activeTeamData,setActiveTeamData] = useState<TEAM>();
    const [userRole,setUserRole] = useState<boolean>(false);
    const {user} = useKindeBrowserClient();
    console.log("paramsData_",params)
    useEffect(()=>{
     params.fileId&&getFileData();
     params.teamId&&getTeamById();
    },[])
 
    useEffect(()=>{
      user && activeTeamData && setUserRole(checkUserAccess());
    },[user,activeTeamData]);
    const getFileData=async()=>{
     const result=await convex.query(api.files.getFileById,{_id:params.fileId})
     setFileData(result);
   }

   const getTeamById=async()=>{
    const result=await convex.query(api.teams.getTeamById,{_id:params.teamId})
    console.log(result,user);
    setActiveTeamData(result);
    }

    const router = useRouter();

    const checkUserAccess = () => {
      // Extract necessary data
      // const { email } = user && user;
      // const { createdBy, members } = activeTeamData;

      // Check if user is the creator of the team
      if (user?.email === activeTeamData?.createdBy) {
          return false; // User is the creator
      }

      // Check if user is a member of the team
      const member =  activeTeamData?.members?.find(member => member.email === user?.email);
      if (member) {
          if (member?.role === 'member') {
              return true; // User is a member
          } else {
              return false; // User is a co-admin
          }
      }

      // User is not part of the team
      toast.error('You are not part of the team.', {
        description: 'Please contact the Team Admin to get access.'
      });
      router.push('/dashboard');
      return false;
  };

  const handleClick = () => {
    userRole && toast.error("Members are not allowed to edit the file.")
  }
  return (
    <div>
      <WorkspaceHeader onSave={()=>setTriggerSave(!triggerSave)} fileName = {fileData?.fileName} userRole={userRole} />
      <div className={`grid grid-cols-1 lg:grid-cols-2 md:overflow-hidden`}>
          <div className=" h-screen-57 overflow-y-auto overflow-x-hidden">
        <Editor onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
            userRole={userRole}
            />
        </div>
        <div className="h-screen-57 md:border-l md:border-t-0 border-t">
        <Canvas
             onSaveTrigger={triggerSave}
             fileId={params.fileId}
             fileData={fileData}
             userRole={userRole}
            />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
