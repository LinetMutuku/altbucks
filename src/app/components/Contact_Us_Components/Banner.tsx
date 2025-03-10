import Image from 'next/image'
import React from 'react'
import bannerImg from "../../../../public/assets/85c1f8a661d84fc86a537240ab180386.png";


export default function Banner() {
  return (
    <div className='flex w-full items-center h-[400px] bg-[#F1F2F4] relative'>
        <Image src={bannerImg} alt='' className='w-full h-full object-cover '/>
        
        <div className='flex flex-col gap-3 items-center justify-center z-20 absolute left-[32%]'>
          <h2 className='text-4xl text-[#F2994A] font-semibold'>Contact Us</h2>
          <p>Ask a question, place an order or just send us feedbacks - we're here for you.</p>
        </div>
        
        <div className='flex w-full bg-[#2877EA] absolute top-0 h-full opacity-40 flex-col gap-2 left-0 mx-auto justify-center items-center z-10 '>
        </div>
    </div>
  )
}
