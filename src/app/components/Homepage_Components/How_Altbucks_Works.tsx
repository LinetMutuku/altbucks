import React from 'react'
import Image from 'next/image'
import create_accountImg from "../../../../public/assets/user-plus-duotone 1.png";
import complete_taskImg from "../../../../public/assets/magnifying-glass-plus-duotone 1.png";
import applyImg from "../../../../public/assets/circle-wavy-check-duotone 1.png";
import browserImg from "../../../../public/assets/Browser.png";
import first_arrowImg from "../../../../public/assets/Arrows.png";
import second_arrowImg from "../../../../public/assets/Arrows (1).png";
import third_arrowImg from "../../../../public/assets/Arrows (2).png";

export default function How_Altbucks_Works() {
  return (
    <div className='w-full flex flex-col items-center justify-center h-[500px] gap-5'>
        <h2 className="text-4xl font-semibold tracking-wide text-black">How Altbucks Works</h2>
        <div className='w-[80%] mt-12 mx-auto flex justify-between relative'>
            {/* Create account */}
            <div className='flex flex-col gap-3 w-[20%] items-center justify-center'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#F1F2F4] flex items-center justify-center'>
                    <Image src={create_accountImg} alt='' className='w-[25px] h-[25px] object-cover' />                   
                </div>
                <h3 className='text-black text-sm tracking-wide'>Create account</h3>
                <p className='text-gray-400 text-xs tracking-wide text-center'>
                    Sign up for Free <br/> Register in less than 2 minutes.
                </p>
            </div>
            <Image src={first_arrowImg} alt='' className='h-[40px] w-[200px] absolute top-1 left-[200px] '/>

            {/* Complete Task */}
            <div className='flex flex-col gap-3 w-[20%] items-center justify-center'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#2877EA] flex items-center justify-center'>
                    <Image src={complete_taskImg} alt='' className='w-[25px] h-[25px] object-cover z-10' />                   
                </div>
                <h3 className='text-black text-sm tracking-wide'>Complete Task</h3>
                <p className='text-gray-400 text-xs tracking-wide text-center'>
                    Complete Simple Tasks-Take surveys, <br/> Watch videos, and more.
                </p>
            </div>
            <Image src={second_arrowImg} alt='' className='h-[40px] w-[200px] absolute top-6 left-[580px] '/>

            {/* Apply */}
            <div className='flex flex-col gap-3 w-[20%] items-center justify-center'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#F1F2F4] flex items-center justify-center'>
                    <Image src={applyImg} alt='' className='w-[25px] h-[25px] object-cover' />                   
                </div>
                <h3 className='text-black text-sm tracking-wide'>Create account</h3>
                <p className='text-gray-400 text-xs tracking-wide text-center'>
                    Sign up for Free <br/> Register in less than 2 minutes.
                </p>
            </div>
            <Image src={third_arrowImg} alt='' className='h-[40px] w-[200px] absolute top-1 left-[930px] '/>

            {/* Cashout Earnings */}
            <div className='flex flex-col gap-3 w-[20%] items-center justify-center'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#F1F2F4] flex items-center justify-center'>
                    <Image src={browserImg} alt='' className='w-[25px] h-[25px] object-cover' />                   
                </div>
                <h3 className='text-black text-sm tracking-wide'>Create account</h3>
                <p className='text-gray-400 text-xs tracking-wide text-center'>
                    Sign up for Free <br/> Register in less than 2 minutes.
                </p>
            </div>


            

        </div>


    </div>
  )
}
