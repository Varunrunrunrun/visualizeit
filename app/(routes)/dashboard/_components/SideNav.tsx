"use client";
import React, { useContext, useEffect, useState } from 'react'
import SideNavTop, { TEAM } from './SideNavTop';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottom from './SideNavBottom';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { ActiveTeamContext, FileListContext } from '@/app/_context/FilesListContext';

const SideNav = () => {
    const {user}:any=useKindeBrowserClient();
    const createFile=useMutation(api.files.createFile);
    const [activeTeam,setActiveTeam]=useState<TEAM|any>();
    const convex=useConvex();
    const [totalFiles,setTotalFiles]=useState<Number>();
    const {fileList_,setFileList_}=useContext(FileListContext);
    const {activeTeam_,setActiveTeam_}=useContext(ActiveTeamContext);

    useEffect(()=>{
      activeTeam&&getFiles();
      activeTeam && setActiveTeam_(activeTeam)

    },[activeTeam])
    const onFileCreate=(fileName:string)=>{
      console.log(fileName)
      createFile({
        fileName:fileName,
        teamId:activeTeam?._id,
        createdBy:user?.email,
        archive:false,
        document:'',
        whiteboard:''
      }).then(resp=>{
        if(resp)
        {
          getFiles();
          toast('File created successfully!')
        }
      },(e)=>{
        toast('Error while creating file')
  
      })
    }
  
    const getFiles=async()=>{
      const result=await convex.query(api.files.getFiles,{teamId:activeTeam?._id});
      console.log(result);
      setFileList_(result);
      setTotalFiles(result?.length)
    }
    return (
        <div
        className=' h-screen 
        fixed w-72 borde-r border-[1px] p-6
        flex flex-col bg-slate-100
        '
        >
          <div className='flex-1'>
          <SideNavTop user={user} 
          setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}/>
          </div>
        
         <div>
          <SideNavBottom
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
          activeTeam={activeTeam}
          />
         </div>
        </div>
    )
}

export default SideNav;