"use client";
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api';
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react';
import React, { useContext, useEffect } from 'react'
import Header from './_components/Header';
import FileList from './_components/FileList';
import { FileListContext } from '@/app/_context/FilesListContext';
import NoTableData from './_components/NoTableData';

const Dashboard = () => {

    const convex=useConvex();
    const {user}:any=useKindeBrowserClient();
    // const getUser=useQuery(api.user.getUser,{email:user?.email});
    const createUser=useMutation(api.user.createUser);
    const { fileList_, setFileList_ } = useContext(FileListContext);
    console.log(fileList_);
    useEffect(() => {
    if(user){
      checkUser();
      console.log(user);
    }
    }, [user])

    const checkUser=async()=>{
      const result=await convex.query(api.user.getUser,{email:user?.email});
      if(!result?.length)
      {
          createUser({
            name:user.given_name,
            email:user.email,
            image:user.picture
          }).then((resp)=>{
            console.log(resp)
          })
      }
  
    }

  return (
    <div className='md:p-8 p-2'>
        <FileList />
    </div>
  )
}

export default Dashboard