import Image from 'next/image'
import React from 'react'
import surveyImg from "../../../../public/assets/ri_survey-line.png";
import microtaskImg from "../../../../public/assets/fluent-mdl2_survey-questions.png";
import watchVideosImg from "../../../../public/assets/monitor-play-duotone 1.png"
import earnImg from "../../../../public/assets/bx_dollar.png";

export default function PopularCategories() {
  return (
    <div className='w-full flex flex-col items-center justify-center h-[500px] gap-5'>
        <div className='justify-between flex items-center w-[80%] mx-auto'>
            <h2 className='text-4xl font-semibold tracking-wide text-black'>Popular categories</h2>
            <button className='bg-[#2877EA] text-white text-sm tracking-wide px-4 py-2 rounded-md'>Sign up</button>
        </div>
        <div className='w-[80%] mt-12 mx-auto flex justify-between relative'>
            
            {/* Take surveys */}
            <div className='flex flex-col gap-3 w-[20%] items-center justify-center border border-gray-400 rounded-md p-8'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#F1F2F4] flex items-center justify-center'>
                    <Image src={surveyImg} alt='' className='w-[25px] h-[25px] object-cover'/>
                </div>
                <h3 className='text-black tracking-wide text-sm'>Take surveys</h3>
                <p className='text-xs text-gray-500 tracking-wide text-center'>Get Rewarded for Your Insights.</p>
            </div>
            
            {/* Micro Task */}
            <div className='flex flex-col gap-3 w-[20%] items-center justify-center border border-gray-400 rounded-md p-8'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#F1F2F4] flex items-center justify-center'>
                    <Image src={microtaskImg} alt='' className='w-[25px] h-[25px] object-cover'/>
                </div>
                <h3 className='text-black tracking-wide text-sm'>Micro Task</h3>
                <p className='text-xs text-gray-500 tracking-wide text-center'>Complete Tasks for Instant Rewards.</p>
            </div>
            
            {/* Watch Videos */}
            <div className='flex flex-col gap-3 w-[20%] items-center justify-center border border-gray-400 rounded-md p-8'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#F1F2F4] flex items-center justify-center'>
                    <Image src={watchVideosImg} alt='' className='w-[25px] h-[25px] object-cover'/>
                </div>
                <h3 className='text-black tracking-wide text-sm'>Watch Videos</h3>
                <p className='text-xs text-gray-500 tracking-wide text-center'>Get Rewarded for Your Viewing Time.</p>
            </div>

            {/* Refer to earn */}
            <div className='flex flex-col gap-3 w-[20%] items-center justify-center border border-gray-400 rounded-md p-8'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#F1F2F4] flex items-center justify-center'>
                    <Image src={earnImg} alt='' className='w-[25px] h-[25px] object-cover'/>
                </div>
                <h3 className='text-black tracking-wide text-sm'>Refer to earn</h3>
                <p className='text-xs text-gray-500 tracking-wide text-center'>Earn a bonus for every referral.</p>
            </div>
        </div>
    </div>
  )
}
