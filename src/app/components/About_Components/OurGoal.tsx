import React from 'react'
import goalImg from "../../../../public/assets/image 91.png";
import Image from 'next/image';

export default function OurGoal() {
  return (
    <div className='w-full h-fit py-16'>
        <div className='w-full flex items-center justify-center'>
            <p className='w-[60%] mx-auto font-light text-center leading-8 text-black'>At <span className='text-[#F2994A]'>ALTBUCKS</span>, we make it easy for you to earn real cash online by completing simple tasks
                that fit into your everyday routine. Whether you're taking surveys, watching videos, and more.
                Every activity helps you earn rewards that can be cashed out instantly.
                    Withdraw earnings easily through multiple payment methods.
                We are dedicated to creating a flexible and user-friendly platform where you can earn money on your terms
                Plus, with our referral program, you can increase your earnings by inviting friends to join in the fun.
            </p>
        </div>

        <div className='w-[80%] mx-auto flex items-center justify-center h-[400px] mt-12'>
            <div className='flex flex-col gap-4 w-[45%]'>
                <h3 className='text-4xl tracking-wide font-semibold text-[#F2994A]'>Our Goal</h3>
                <p className='text-sm tracking-wide leading-8 text-black'>
                    Our goal at ALTBUCKS, is to empower individuals by providing a simple and 
                    accessible way to earn money online. We strive to build a platform that rewards 
                    users for their time and input, while fostering meaningful connections between 
                    them and the activities they engage in. By continually expanding opportunities—from 
                    surveys to interactive tasks—we aim to make online earning effortless and enjoyable for everyone.
                </p>
                <button className='bg-[#2877EA] w-fit h-fit px-6 py-3 text-white tracking-wide rounded-md text-sm'>Get Started</button>
            </div>
            <div className='flex items-center h-full justify-center w-[45%]'>
                <Image src={goalImg} alt='' className='w-[80%] aspect-auto object-cover'/>
            </div>

        </div>

    </div>
  )
}
