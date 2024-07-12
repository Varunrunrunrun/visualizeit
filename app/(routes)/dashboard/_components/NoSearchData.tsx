import Image from 'next/image'
import React from 'react'

const NoSearchData = () => {
  return (
    <div className='w-full h-auto m-auto md:p-12 p-2 flex flex-col items-center justify-center '>
      <Image width={250} height={250} src='/noSearchData.svg' alt='no data'/>
      <h2 className='md:text-2xl text-base text-center text-black w-3/5 min-w-[300px]'>No files found</h2>
      <h2 className='md:text-base text-xs text-center text-slate-400 w-3/5 min-w-[300px]'>Please try to enter a valid query</h2>
    </div>
  )
}

export default NoSearchData