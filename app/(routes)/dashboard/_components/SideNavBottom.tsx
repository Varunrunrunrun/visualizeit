import { Button } from '@/components/ui/button'
import { Archive, Flag, Github, Plus } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

import Constant from '@/app/_constants/Constant'
import PricingDialog from './PricingDialog'

const SideNavBottom = ({onFileCreate,totalFiles}:any) => {
    const menuList=[
        {
          id:1,
          name:'Getting Started',
          icon:Flag,
          path:'/getting-started'
        },
        // {
        //   id:2,
        //   name:'Github',
        //   icon:Github,
        //   path:''
        // },
        // {
        //   id:3,
        //   name:'Archive',
        //   icon:Archive,
        //   path:''
        // }
      ]
      const [fileInput,setFileInput]=useState('');
      return (
        <div>
          {menuList.map((menu,index)=>(
            <a href={menu.path} key={index} className='flex gap-2 p-1 px-2 text-[14px] 
            hover:bg-gray-100 rounded-md cursor-pointer'>
              <menu.icon className='h-5 w-5'/>
              {menu.name}</a>
          ))}
    
          {/* Add New File Button  */}
          <Dialog>
      <DialogTrigger className='w-full' asChild>
      <Button className='w-full bg-blue-400 
          hover:bg-blue-700  justify-between mt-3 flex gap-4'><span className='text-[16px]'>Create a New file</span> <Plus /></Button>
      </DialogTrigger>
      {totalFiles<Constant.MAX_FREE_FILE? 
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>
              <Input placeholder='Enter File Name' 
              className='mt-3'
              onChange={(e)=>setFileInput(e.target.value)}
              />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
              <DialogClose asChild>
                <Button type="button" 
                className='bg-blue-400
                hover:bg-blue-700'
                disabled={!(fileInput&&fileInput.length>3)}
                onClick={()=>onFileCreate(fileInput)}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
      </DialogContent>:
      <PricingDialog/>}
    </Dialog>
    
         
          
          {/* Progress Bar  */}
          <div className='h-4 w-full bg-gray-200 rounded-full mt-5'>
              <div className={`h-4  ${totalFiles === Constant.MAX_FREE_FILE ? 'bg-red-500' : 'bg-blue-400'} rounded-full`}
              style={{ width: `${(totalFiles/Constant.MAX_FREE_FILE)*100}%` }}
             >
              </div>
          </div>
    
          <h2 className='text-[12px] mt-3'>
            <strong>{totalFiles}</strong> out of <strong>{Constant.MAX_FREE_FILE}</strong> files used</h2>
          <h2 className='text-[12px] mt-1'>Upgrade your plan for unlimited access.</h2>  
    
         </div>
      )
}

export default SideNavBottom