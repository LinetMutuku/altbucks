"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logoImg from "../../../../public/assets/Group 39230.png";
import Link from 'next/link';
import { IoIosNotificationsOutline, IoIosPeople, IoMdNotificationsOutline } from "react-icons/io";
import avatarImg from "../../../../public/assets/Avatar.png";
import { FaAngleDown, FaHandshake } from "react-icons/fa";
import { TbBaselineDensityMedium } from "react-icons/tb";
import { BiMessageRoundedDots } from 'react-icons/bi';
import { FaBookOpenReader } from 'react-icons/fa6';
import { IoBagOutline } from 'react-icons/io5';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false)
    

  return (
    <nav className='w-full h-[80px] flex items-center font-Satoshi'>
        <div className='h-fit w-[95%] mx-auto flex items-center justify-between '>
            
            <Link href={"/"} className='w-fit h-fit cursor-pointer'>
                <Image src={logoImg} alt='' className='w-[100px] aspect-auto'/>
            </Link>
            <div className="relative z-50 w-1/2">
            {/* Toggle Button for Small Screens */}
            <button
                className="md:hidden flex justify-center w-full items-center gap-2 px-3 py-2 text-black"
                onClick={() => setIsNavOpen(!isNavOpen)} // Toggle nav visibility
            >
                <TbBaselineDensityMedium className="text-xl" />
            </button>
            {/* Navigation Links */}
            <div
                className={`absolute top-full left-0 w-full bg-white border rounded-md shadow-md md:static md:flex md:gap-4 md:justify-center md:items-center md:shadow-none md:border-none md:w-auto ${
                isNavOpen ? "block" : "hidden"
                }`}
            >
                <div className="flex flex-col gap-8 md:flex-row items-center h-full p-4 md:p-0 ">
                <div className="flex flex-col md:flex-row gap-3  items-start md:items-center">
                <p className="text-sm text-gray-800 md:text-gray-600">
                    <Link href="/dashboard" className="text-sm tracking-wide">
                        Dashboard
                    </Link>
                </p>
                <p className="h-fit w-fit text-gray-800  md:bg-blue-600 md:p-2 rounded-lg md:text-white tracking-wide">
                    <Link href="/dashboard/task" className="flex gap-2 items-center">
                    Tasks <FaAngleDown />
                    </Link>
                </p>
                <p className="text-sm text-gray-800 md:text-gray-600 tracking-wide">
                    <Link href="/dashboard/my_wallet">My Wallet</Link>
                </p>
                <p className="text-sm text-gray-800 md:text-gray-600 tracking-wide">
                    <Link href="/dashboard/referral">Referral</Link>
                </p>
                </div>
                </div>
            </div>
            </div>

            <div className='flex gap-6 items-center'>
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
                <p className='text-gray-400'>|</p>
                <Image src={avatarImg} alt='' className='cursor-pointer'/>
            </div>
        </div>
        
    </nav>
  )
}
