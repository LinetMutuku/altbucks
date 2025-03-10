import Image from 'next/image'
import React from 'react'
import bannerImg from "../../../../public/assets/c9bef5d4b0fb26e4b19c82414bd39bb3.png";


export default function Banner() {
  return (
    <div className='flex w-full items-center h-[400px] bg-[#F1F2F4] relative'>
        <Image src={bannerImg} alt='' className='w-full h-full object-cover '/>
        
        <div className='flex flex-col gap-3 items-center justify-center z-20 absolute left-[43%]'>
          <h2 className='text-4xl text-[#F2994A] font-semibold'>Reviews</h2>
          <p className='text-sm tracking-wide text-white'>Hear fromn our past clients.</p>
        </div>        
        <div className='flex w-full bg-[#2877EA] absolute top-0 h-full opacity-60 flex-col gap-2 left-0 mx-auto justify-center items-center z-10 '>
        </div>
    </div>
  )
}
