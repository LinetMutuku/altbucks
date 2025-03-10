import Image from 'next/image'
import React from 'react'
import logo from "../../../../public/assets/Group 39230.png";
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { BsArrowBarDown } from 'react-icons/bs';
import { IoMdArrowDropdown } from "react-icons/io";

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
  return (
    <div className='w-screen h-fit flex items-center py-5 bg-[#F1F2F4]'>
        <nav className='flex justify-between w-[90%] mx-auto '>            
            {/* Logo */}
            <div className='w-fit h-fit'>
                <Link href={"/"}>
                    <Image src={logo} alt='' className='w-[100px] aspect-auto'/>
                </Link>
            </div>

            
            
            {/* User Authentication */}
            <div className='flex items-center gap-8'>
                <div className='w-[150px] h-[35px] flex relative'>
                    <BiSearch size={15} color='gray' className='absolute left-3 top-1/3'/>
                    <input type='text' className="w-full h-full px-8 bg-gray-200 rounded-xl text-xs text-black" placeholder='Search'/>
                </div>
                <div className='flex items-center gap-1'>
                    <p className='text-sm text-black tracking-wide'>English (United States)</p>
                    <IoMdArrowDropdown size={20} color='black'/>
                </div>
                <button className='w-fit h-fit text-sm tracking-wide px-6 py-2 bg-[#2877EA] text-white rounded-md hover:bg-blue-700 duration-300 transition-all '>
                    <Link href="/log-in">
                        Login
                    </Link>
                </button>
            </div>
        </nav>
    </div>
  )
}
