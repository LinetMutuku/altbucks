"use client";
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from "../../../../public/assets/Group 39230.png";
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export const site_links = [
    {
        id:1,
        link_name:"About Us",
        navigate: "/about-us"
    },
    {
        id:2,
        link_name:"Reviews",
        navigate: "/reviews"
    },
    {
        id:3,
        link_name:"Terms of Service",
        navigate: "/terms-of-service"
    },
    {
        id:4,
        link_name:"FAQ",
        navigate: "/faq"
    },
    {
        id:5,
        link_name:"Contact Us",
        navigate: "/contact-us"
    }
]


export default function Header() {
    const {isAuthenticated, user, profileAuth} = useAuthStore();

    useEffect(() => {
        profileAuth()
    }, [])
  return (
    <div className='w-screen h-fit flex items-center py-5 bg-[#F1F2F4]'>
        <nav className='flex justify-between w-[90%] mx-auto '>            
            {/* Logo */}
            <div className='w-fit h-fit'>
                <Link href={"/"}>
                    <Image src={logo} alt='' className='w-[100px] aspect-auto'/>
                </Link>
            </div>

            {/* Navigation */}
            <div className='flex gap-6 items-center '>
                {
                    site_links.map((links) => {
                        return (
                            <p key={links.id}>
                                <Link href={links.navigate} className='text-gray-500 text-sm tracking-wide'>
                                    {links.link_name}
                                </Link>
                            </p>
                        )
                    })
                }
            </div>

            {/* User Authentication */}
            {
                isAuthenticated ? 
                <p className='flex gap-3 items-center'>Welcome, <span className='text-blue-500 w-fit fit bg-blue-100 px-5 py-2'>
                    <Link href="/dashboard">{user?.firstName}</Link></span>
                </p>          
                : 
                <div className='flex items-center gap-3'>
                    <button className='border border-gray-400 w-fit h-fit px-4 py-2 text-gray-400 rounded-md hover:bg-[#2877EA] hover:text-white transition-all duration-300'>
                        <Link href={"/log-in"}>
                            Log In
                        </Link>
                    </button>
                    <button className='w-fit h-fit px-4 py-2 bg-[#2877EA] text-white rounded-md hover:bg-blue-700 duration-300 transition-all '>
                        <Link href={"/signup"}>
                            Sign Up
                        </Link>
                    </button>
                </div>
            }
        </nav>
    </div>
  )
}
