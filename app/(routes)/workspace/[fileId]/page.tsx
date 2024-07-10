"use client";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import Canvas from "../_components/Canvas";
import { useConvex } from "convex/react";
import { FILE } from "../../dashboard/_components/FileList";
import { api } from "@/convex/_generated/api";

const Workspace = ({params}:any) => {
    const [triggerSave,setTriggerSave]=useState(false);
    const convex=useConvex();
    const [fileData,setFileData]=useState<FILE|any>();
    useEffect(()=>{
     console.log("FILEID",params.fileId)
     params.fileId&&getFileData();
    },[])
 
    const getFileData=async()=>{
     const result=await convex.query(api.files.getFileById,{_id:params.fileId})
     setFileData(result);
   }
  return (
    <div>
      <WorkspaceHeader onSave={()=>setTriggerSave(!triggerSave)} fileName = {fileData?.fileName} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className=" h-screen-57">
        <Editor onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
            />
        </div>
        <div className="h-screen-57 md:border-l md:border-t-0 border-t">
        <Canvas
             onSaveTrigger={triggerSave}
             fileId={params.fileId}
             fileData={fileData}
            />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
