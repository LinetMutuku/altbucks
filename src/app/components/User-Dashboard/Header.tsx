"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import logoImg from "../../../../public/assets/Group 39230.png";
import Link from 'next/link';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { TbBaselineDensityMedium } from "react-icons/tb";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { user } = useAuthStore();
    const router = useRouter();

    return (
        <nav className='w-full h-[80px] flex items-center font-Satoshi'>
            <div className='h-fit w-[90%] mx-auto flex items-center justify-between'>
                <Link href={"/"} className='w-fit h-fit cursor-pointer'>
                    <Image src={logoImg} alt='' className='w-[100px] aspect-auto'/>
                </Link>

                <div className="relative z-50 w-1/2">
                    <button
                        className="md:hidden flex justify-center w-full items-center gap-2 px-3 py-2 text-black"
                        onClick={() => setIsNavOpen(!isNavOpen)}
                    >
                        <TbBaselineDensityMedium className="text-xl" />
                    </button>

                    <div className={`absolute top-full left-0 w-full bg-white border rounded-md shadow-md md:static md:flex md:gap-4 md:justify-center md:items-center md:shadow-none md:border-none md:w-auto ${
                        isNavOpen ? "block" : "hidden"
                    }`}>
                        <div className="flex flex-col gap-8 md:flex-row items-center h-full p-4 md:p-0">
                            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                                <Link href="/dashboard" className="text-sm text-gray-800 md:bg-blue-600 md:p-2 rounded-lg md:text-white tracking-wide">
                                    Dashboard
                                </Link>
                                <Link href="/dashboard/task" className="text-sm text-gray-800 md:text-gray-600 hover:bg-blue-600 md:p-2 rounded-lg hover:text-white tracking-wide flex gap-2 items-center">
                                    Tasks <FaAngleDown />
                                </Link>
                                <Link href="/dashboard/my_wallet" className="text-sm text-gray-800 md:text-gray-600 tracking-wide">
                                    My Wallet
                                </Link>
                                <Link href="/dashboard/referral" className="text-sm text-gray-800 md:text-gray-600 tracking-wide">
                                    Referral
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-6 items-center'>
                    <IoIosNotificationsOutline color='black' size={20} className='cursor-pointer'/>
                    <p className='text-gray-400'>|</p>
                    <div
                        className="cursor-pointer"
                        onClick={() => router.push('/profile')}
                    >
                        {user?.profilePicture ? (
                            <Image
                                src={user.profilePicture}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}