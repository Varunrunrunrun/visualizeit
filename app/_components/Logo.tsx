import { useRouter } from 'next/navigation';
import React from 'react'

const Logo = ({className}:{className?:string}) => {
  const router = useRouter();
  return (
    <div onClick={() => {router.push('/dashboard')}} className={`text-black ${className} cursor-pointer`}>
        <span className=''>V</span><span className='font-semibold'>it.</span>
    </div>
  )
}

export default Logo