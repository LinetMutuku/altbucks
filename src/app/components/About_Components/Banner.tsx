import Image from 'next/image'
import React from 'react'
import bannerImg from "../../../../public/assets/25718fd46c9cb5e7c65ebd9214555e23.jpeg";


export default function Banner() {
  return (
    <div className='flex w-full items-center h-[400px] bg-[#F1F2F4] relative'>
        <Image src={bannerImg} alt='' className='w-full h-full object-cover '/>
        
        <div className='flex flex-col gap-3 items-center justify-center z-20 absolute left-[43%]'>
          <h2 className='text-4xl text-[#F2994A] font-semibold'>About Us</h2>
          <p>Want to know more about us?</p>
        </div>
        
        <div className='flex w-full bg-[#2877EA] absolute top-0 h-full opacity-40 flex-col gap-2 left-0 mx-auto justify-center items-center z-10 '>
        </div>
    </div>
  )
}
