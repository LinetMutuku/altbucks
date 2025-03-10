"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import quoteImg from "../../../../public/assets/Vector.png";
import Image from 'next/image';
import imgOne from "../../../../public/assets/Image (1).png";
import imgTwo from "../../../../public/assets/Ellipse 1962.png"
import imgThree from "../../../../public/assets/Image.png"
import imgFour from "../../../../public/assets/Ellipse 1960.png";
import imgFive from "../../../../public/assets/Image (3).png"
import imgSix from "../../../../public/assets/Image (2).png"


function ViewReviews() {
  return (
    <div className='bg-[#F1F2F4] h-[600px] w-full flex flex-col items-center justify-center gap-16 relative'>
        <h2 className='font-semibold text-3xl text-black tracking-wide'>View Reviews</h2>
        <div className='h-[60px] w-[60px] rounded-full bg-[#377BFF] flex items-center justify-center absolute top-[165px] z-20'>
            <Image src={quoteImg} alt='' className='w-[30px] h-[30px] object-cover' />            
        </div>
        <Image src={imgOne} alt='' className='absolute w-[50px] h-[50px] object-cover bottom-16 left-48'/>
        <Image src={imgTwo} alt='' className='absolute w-[50px] h-[50px] object-cover bottom-60 left-28'/>
        <Image src={imgThree} alt='' className='absolute w-[50px] h-[50px] object-cover top-24 left-44'/>
        <Image src={imgFour} alt='' className='absolute w-[50px] h-[50px] object-cover top-24 right-44'/>
        <Image src={imgFive} alt='' className='absolute w-[50px] h-[50px] object-cover bottom-60 right-28'/>
        <Image src={imgSix} alt='' className='absolute w-[50px] h-[50px] object-cover bottom-16 right-48'/>
        
        <Swiper 
            modules={[Pagination]}
            // style={{
            //     "--swiper-pagination-bullet-active-width":"32px"
            // }}
            grabCursor={true}
            initialSlide={1}
            centeredSlides={true}
            slidesPerView="auto"
            speed={800}
            pagination={{
                // el:".swiper-pagination",
                // type:"bullets",
                // clickable:true,
                // el:".swiper-pagination",
                // clickable:true,
                dynamicBullets:true,
                clickable:true
            }}
            breakpoints={{
                320:{spaceBetween:40},
                430:{spaceBetween:50},
                550:{spaceBetween:70},
                650:{spaceBetween:30},
            }}
        >
            
            {/* First testimonial */}
            <SwiperSlide className='swiper-slide slide-1 '>
                <div className='w-full h-[300px] bg-white rounded-2xl flex flex-col items-center justify-center shadow-xl relative'>                          
                    <div className='flex w-[70%] flex-col gap-1 items-center justify-center'>
                        <p className='tracking-wide text-black text-base'>Taskers are paid upon successfully completing tasks, ensuring that they are compensated for their efforts.</p>
                        <h3 className='text-black text-sm tracking-wide mt-4'>David Beckham</h3>
                        <p className='text-gray-400 text-xs tracking-wide'>Creative Director</p>
                    </div>
                </div>                
            </SwiperSlide>

            {/* Second testimonial */}
            <SwiperSlide className='swiper-slide slide-1 '>
                <div className='w-full h-[300px] bg-white rounded-2xl flex flex-col items-center justify-center shadow-xl'>
                    <div className='flex w-[70%] flex-col gap-1 items-center justify-center'>
                        <p className='tracking-wide text-black text-base'>Taskers are paid upon successfully completing tasks, ensuring that they are compensated for their efforts.</p>
                        <h3 className='text-black text-sm tracking-wide mt-4'>David Beckham</h3>
                        <p className='text-gray-400 text-xs tracking-wide'>Creative Director</p>
                    </div>
                </div>                
            </SwiperSlide>

            {/* Third testimonial */}
            <SwiperSlide className='swiper-slide slide-1 '>
                <div className='w-full h-[300px] bg-white rounded-2xl flex flex-col items-center justify-center shadow-xl'>
                    <div className='flex w-[70%] flex-col gap-1 items-center justify-center'>
                        <p className='tracking-wide text-black text-base'>Taskers are paid upon successfully completing tasks, ensuring that they are compensated for their efforts.</p>
                        <h3 className='text-black text-sm tracking-wide mt-4'>David Beckham</h3>
                        <p className='text-gray-400 text-xs tracking-wide'>Creative Director</p>
                    </div>
                </div>                
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default ViewReviews