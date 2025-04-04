"use client";
import Image from 'next/image'
import React from 'react'
import profileImage from "../../../../public/assets/52c8f0d76821a360324586d8bc58cc5f.png";
import { useRouter } from 'next/navigation';

// Define the user type
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

interface ViewProfileProps {
  user: User;
}


export default function ViewProfile({user}: ViewProfileProps) {
  // const {user} = useAuthStore();
  const router = useRouter();
  return (
    <div className='w-full h-fit flex flex-col gap-5 border border-gray-300 rounded-lg items-center justify-center py-8 px-6'>
        <Image src={profileImage} alt='' className='w-[80px] h-[80px] rounded-full '/>
        <div className='flex flex-col gap-3 items-center' >
            <h3 className='text-xl font-semibold'>{user?.firstName} {user?.lastName}</h3>
            <p className='text-gray-400 text-base'>ID: {user?._id}</p>
        </div>

        <p className='text-green-500 w-fit h-fit bg-green-100 px-4 py-1 text-sm rounded-lg'>Online</p>

        <p className='text-sm'>Your profile is <span className='text-green-500'>80%</span> complete. Finish setting up.</p>

        <button 
          onClick={() => router.push("/profile")}
          className='bg-blue-500 text-sm hover:bg-blue-600 transition-all duration-500 text-white w-full rounded-lg py-3 '>View Profile</button>
    </div>
  )
}
