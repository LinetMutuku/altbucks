"use client";
import React from 'react'
import userImage from "../../../../public/assets/23662843e3c4d6a7eac501167ce9783c.jpeg";
import user from "../../../../public/assets/hero.png";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TopSection() {
  const router = useRouter();
  return (
    <div className='w-full mx-auto h-[250px] overflow-hidden flex items-center justify-between relative rounded-xl p-8'>
        <div className='flex flex-col gap-3 z-20 w-[65%]'>
            <h3 className='text-2xl font-semibold text-white '>Build a hands-on team to work on your project faster and easier with.</h3>
            <p className='text-sm font-extralight text-white'>We've got a whole new pack of updates coming soon, you'll love them.</p>
            <button 
              onClick={() => router.push("/dashboard_taskcreator/task") }
              className='bg-blue-600 w-fit h-fit px-8 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-500 py-3'>Post a Task</button>
        </div>
        <Image src={user} alt='' className='w-[30%] z-20'/>
        <Image src={userImage} alt='' className='absolute top-0 left-0 object-cover w-full bottom-0'/>
        <div className='absolute w-full h-full top-0 opacity-60 left-0 bottom-0 bg-blue-600 '>
        </div>
    </div>
  )
}
