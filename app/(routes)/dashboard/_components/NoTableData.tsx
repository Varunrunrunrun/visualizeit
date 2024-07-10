import Image from 'next/image'
import React from 'react'

const NoTableData = () => {
  return (
    <div className='w-full h-auto m-auto md:p-16 p-2 flex flex-col items-center justify-center '>
      <Image width={300} height={300} src='/noData.svg' alt='no data'/>
      <h2 className='md:text-2xl text-base text-center text-black w-3/5 min-w-[300px]'>You have not created a file in this Team</h2>
      <h2 className='md:text-base text-xs text-center text-slate-400 w-3/5 min-w-[300px]'>Please create a new file</h2>
    </div>
  )
}

export default NoTableData