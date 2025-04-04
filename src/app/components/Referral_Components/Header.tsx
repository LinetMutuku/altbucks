"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import logoImg from "../../../../public/assets/Group 39230.png";
import Link from 'next/link';
import { IoIosNotificationsOutline } from "react-icons/io";
import avatarImg from "../../../../public/assets/Avatar.png";
import { FaAngleDown } from "react-icons/fa";
import { TbBaselineDensityMedium } from "react-icons/tb";

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className='w-full h-[80px] flex items-center font-Satoshi'>
        <div className='h-fit w-[90%] mx-auto flex items-center justify-between '>
            
            <Link href={"/"} className='w-fit h-fit cursor-pointer'>
                <Image src={logoImg} alt='' className='w-[100px] aspect-auto'/>
            </Link>
            <div className="w-1/2">
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
                            <p className="text-sm text-gray-800 md:text-gray-600 tracking-wide" >
                                <Link href="/dashboard/tasks" className="flex gap-2 items-center">
                                Tasks <FaAngleDown />
                                </Link>
                            </p>
                            <p className="text-sm text-gray-800 md:text-gray-600 tracking-wide">
                                <Link href="/dashboard/my_wallet">My Wallet</Link>
                            </p>
                            <p className="h-fit w-fit text-gray-800  md:bg-blue-600 md:p-2 rounded-lg md:text-white tracking-wide">
                                <Link href="/dashboard/referral">Referral</Link>
                            </p>
                        </div>
                    </div>
                </div>
            
            </div>

            <div className='flex gap-6 items-center'>
                <IoIosNotificationsOutline color='black' size={20} className='cursor-pointer'/>
                <p className='text-gray-400'>|</p>
                <Image src={avatarImg} alt='' className='cursor-pointer'/>
            </div>
        </div>
        
    </nav>
  )
}
