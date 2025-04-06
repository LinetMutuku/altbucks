"use client"

import Image from 'next/image'
import React from 'react'
import logoImg from "../../../../public/assets/Group 39230.png";
import Link from 'next/link';
import { IoIosNotificationsOutline } from "react-icons/io";
import avatarImg from "../../../../public/assets/Avatar.png";
import { usePathname } from 'next/navigation';

export default function Header() {
        const pathname = usePathname()
    
  return (
    <nav className='w-screen h-[80px] flex items-center'>
        <div className='h-fit w-[90%] mx-auto flex items-center justify-between '>
            
            <div className='w-fit h-fit'>
                <Image src={logoImg} alt='' className='w-[100px] aspect-auto'/>
            </div>
            <div className='w-fit flex h-fit gap-4 items-center'>
                <Link href="/dashboard" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Dashboard
                </Link>
                <Link href="/dashboard/task" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard/tasks" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Tasks
                </Link>
                <Link href="/dashboard/my_wallet" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard/my_wallet" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    My Wallet
                </Link>
                <Link href="/dashboard/referral" className={`w-fit h-fit px-6 py-3 hover:bg-blue-500 hover:text-white hover:rounded-lg ${pathname === "/dashboard/referral" ? "bg-blue-500 text-white rounded-lg" :""}`}>
                    Referral
                </Link>
            </div>

            <div className="flex gap-6 items-center">
            <IoIosNotificationsOutline
                color="black"
                size={28} // <-- Increase size here
                className="cursor-pointer"
            />
            <p className="text-gray-400">|</p>
            <Link href="/profile">
                <Image
                src={avatarImg}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full object-cover cursor-pointer"
                />
            </Link>
            </div>
        </div>
    </nav>
  )
}
