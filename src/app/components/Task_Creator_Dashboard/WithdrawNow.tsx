import Image from 'next/image'
import React from 'react'
import backgroundImg from "../../../../public/assets/refsquare.png"
import cardImg from "../../../../public/assets/Asset 1 2.png"

export default function WithdrawNow() {
  return (
    <div className='w-full flex flex-col gap-4 border-gray-300 border rounded-lg p-6'>
        <div className='w-full h-[250px] relative overflow-hidden'>
            <Image src={backgroundImg} className='w-auto h-full absolute top-0 left-0 bottom-0 right-0 object-cover ' alt=''/>
            <Image src={cardImg} className='h-[100px] w-auto object-cover z-30 absolute top-[30%] left-[30%]' alt=''/>
            <div className='bg-blue-500 absolute top-0 left-0 bottom-0 right-0 opacity-65 '>
            </div>
        </div>
        <div className='w-full h-fit flex flex-col gap-3 items-center justify-center'>
            <h4 className='text-blue-400 text-sm '>Get paid directly into your existing account</h4>
            <p className='text-lg font-semibold'>Withdraw Now</p>
            <p className='text-sm text-gray-400'>Click the code below to copy and send to your referrals and you can both earn $20 each</p>

            <button className='bg-blue-500 text-white text-xs w-full rounded-md py-3 hover:bg-blue-700 transition-all duration-500 px-6'>https://loremipsum/referral?Adam103eE-2</button>            
        </div>

    </div>
  )
}
