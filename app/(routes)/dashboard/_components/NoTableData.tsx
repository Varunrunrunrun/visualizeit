import { Archive, Plus, PlusCircle } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const NoTableData = ({activeButton}:any) => {
  const message = () => {
    if (activeButton === "ALL") {
      return {
        message:'You have not created a file in this Team',
        description:'Please create a new file'
      };
    } else if (activeButton === "ARCHIVE") {
      return {
        message:'You have no Archived files in this Team',
        description:'Try archiving some files'
      };
    } else if (activeButton === "CREATED_BY_ME") {
      return {
        message:'No files in this teams are created by you',
        description:'Create a file to begin'
      };
    }
    else{
      return;
    }

  }
  return (
    <div className='w-full h-auto m-auto md:p-16 p-2 flex flex-col items-center justify-center '>
      <Image width={225} height={225} src='/noData.svg' alt='no data'/>
      <h2 className='md:text-2xl text-base text-center text-black w-3/5 min-w-[300px]'>{message()?.message}</h2>
      <div className='flex justify-center items-center gap-2 w-3/5 min-w-[300px]'><h2 className='md:text-base text-xs text-center text-slate-400 '>{message()?.description}</h2>{activeButton === "ARCHIVE" ? <Archive className='w-4 h-4 text-slate-400' /> : <PlusCircle className='w-4 h-4 text-slate-400' />}</div>
    </div>
  )
}

export default NoTableData