"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import logoImg from "../../../../public/assets/Group 39230.png";
import Link from 'next/link';
import { IoIosPeople, IoMdNotificationsOutline } from "react-icons/io";
import avatarImg from "../../../../public/assets/Avatar.png";
import { usePathname } from 'next/navigation';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { FaHandshake } from 'react-icons/fa';
import { FaBookOpenReader } from 'react-icons/fa6';
import { IoBagOutline } from 'react-icons/io5';
import { useAuthStore } from '@/store/authStore';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user, logout } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();
    const [notificationModal, setNotificationModal] = useState(false);
    const [isSubNavOpen, setIsSubNavOpen] = useState(false);
        
    const handleLogout = () => {
        logout();
        router.push('/log-in');
    };
    
        
  return (
    <nav className='w-[100%] h-[80px] flex items-center'>
        <div className='h-fit w-[90%] mx-auto flex items-center justify-between '>
            
            <Link href="/">
            <div className='w-fit h-fit'>
                <Image src={logoImg} alt='' className='w-[100px] aspect-auto'/>
            </div>
            </Link>
            <div className='w-fit flex h-fit gap-4 items-center'>
                <Link href="/dashboard" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Dashboard
                </Link>
                <div className='relative'>
                <Link onClick={() => setIsSubNavOpen(!isSubNavOpen)} href="/dashboard/task" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard/task" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Tasks
                </Link>
                {isSubNavOpen && 
                <p className="absolute mt-2 text-gray-800 md:bg-white md:px-3 shadow-lg md:py-2 rounded-md md:text-black  w-36 tracking-wide">
                    <Link href="/dashboard/application">
                     My Application
                    </Link>
                </p>}
                </div>
                <Link href="/dashboard/my_wallet" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard/my_wallet" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    My Wallet
                </Link>
                <Link href="/dashboard/referral" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard/referral" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Referral
                </Link>
            </div>

            <div className="flex gap-6 items-center">
                <div className='flex' onClick={() => setNotificationModal(!notificationModal)}><IoMdNotificationsOutline size={25} color='sky-blue' className='cursor-pointer relative'/>
                    {
                        notificationModal &&
                        <div className='w-[300px] rounded-xl shadow-xl bg-white right-10 py-12 px-8 h-[350px] z-20 overflow-y-scroll flex flex-col gap-6 absolute top-[100px]'>
                            <div className='flex items-center gap-4'>
                                <div className='w-fit h-fit rounded-full p-3 bg-green-100'>
                                    <BiMessageRoundedDots className='text-green-500' size={20}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='font-semibold text-sm'>New Task</h3>
                                    <p className='text-xs text-gray-400'>Your application has been...</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='w-fit h-fit rounded-full p-3 bg-yellow-100'>
                                    <IoIosPeople className='text-yellow-400' size={20}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='font-semibold text-sm'>New User Added</h3>
                                    <p className='text-xs text-gray-400'>Your second task is available</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='w-fit h-fit rounded-full p-3 bg-blue-100'>
                                    <FaHandshake className='text-blue-400' size={20}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='font-semibold text-sm'>Task Approved</h3>
                                    <p className='text-xs text-gray-400'>Your partner needs your atten...</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='w-fit h-fit rounded-full p-3 bg-indigo-100'>
                                    <FaBookOpenReader className='text-indigo-400' size={20}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='font-semibold text-sm'>Under Review</h3>
                                    <p className='text-xs text-gray-400'>You have not opened your cour...</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='w-fit h-fit rounded-full p-3 bg-red-100'>
                                    <IoBagOutline className='text-red-400' size={20}/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='font-semibold text-sm'>Attention Required</h3>
                                    <p className='text-xs text-gray-400'>Resolve your billing with ....</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                
               {/* Logout Button */}
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                    title="Logout"
                >
                    <FiLogOut size={20} />
                </button>
                                
            <Link href="/profile">
            <div className="w-9 h-9 rounded-full overflow-hidden">
                <Image
                    src={user?.userImageUrl || avatarImg}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="object-cover"
                />
                </div>
            </Link>
            </div>
        </div>
    </nav>
  )
}
