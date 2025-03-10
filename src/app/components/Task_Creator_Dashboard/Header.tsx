"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logoImage from "../../../../public/assets/Group 39230.png"
import { IoMdNotificationsOutline } from "react-icons/io";
import profileImage from "../../../../public/assets/52c8f0d76821a360324586d8bc58cc5f.png";
import { useRouter } from 'next/navigation';
import { BiMessageRoundedDots } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation'

export default function Header() {
    const router = useRouter();
    const pathname = usePathname()
    const [notificationModal, setNotificationModal] = useState(false)
  return (
    <div className='w-screen h-[100px] flex items-center'>
        <nav className='flex justify-between h-fit w-[85%] mx-auto '>
            <Link href="/" className='w-fit h-fit cursor-pointer'>
                <Image src={logoImage} alt='' className='h-[50px] w-auto object-contain '/>            
            </Link>

            <div className='w-fit flex h-fit gap-4 items-center'>
                <Link href="/dashboard_taskcreator" className={`w-fit h-fit px-6 py-3 ${pathname === "/dashboard_taskcreator" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Dashboard
                </Link>
                <Link href="/dashboard_taskcreator/task" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard_taskcreator/task" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Tasks
                </Link>
                <Link href="/dashboard_taskcreator/my_wallet" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard_taskcreator/my_wallet" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    My Wallet
                </Link>
                <Link href="/dashboard_taskcreator/analytics" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard_taskcreator/analytics" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Analytics
                </Link>
            </div>

            <div className='flex items-center gap-4'>
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
                <div className='text-blue-300'>|</div>
                <Image src={profileImage} onClick={() => router.push("/dashboard_taskcreator") } 
                    alt="" className='h-[50px] w-auto object-cover cursor-pointer rounded-full' 
                />
            </div>
        </nav>        
    </div>
  )
}
