import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import footerLogoImg from "../../../../public/assets/Group 39232.png";

export default function Footer() {
  return (
    <div className='w-full h-[300px] bg-[#2877EA]'>
        <div className='w-[80%] mx-auto flex justify-between py-12'>
            <div className='w-fit h-fit'>
                <Link href={"/"}>
                    <Image src={footerLogoImg} alt='' className='w-[200px] h-[50px] object-cover'  />
                </Link>
            </div>
            
            <div className='flex flex-col gap-3'>
                <p className='text-sm tracking-wide'>
                    <Link href={"/about-us"}>
                        About Us
                    </Link>
                </p>
                <p className='text-sm tracking-wide'>
                    <Link href={"/contact-us"}>
                        Contact Us
                    </Link>
                </p>
                <p className='text-sm tracking-wide'>
                    <Link href={"/about-us"}>
                        View Reviews
                    </Link>
                </p>
            </div>
            
            <div className='flex flex-col gap-3'>
                <p className='text-sm tracking-wide'>
                    <Link href={"/terms-of-service"}>
                        Terms of Service
                    </Link>
                </p>
                <p className='text-sm tracking-wide'>
                    <Link href={"/faq"}>
                        FAQ
                    </Link>
                </p>

            </div>
        </div>

        <hr className='w-[80%] mx-auto border border-white'/>
        <p className='w-[80%] mx-auto mt-4'>C 2024 AltBucks. All right reserved</p>

    </div>
  )
}
