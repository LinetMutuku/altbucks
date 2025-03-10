"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import testimonialImg from "../../../../public/assets/Ellipse 1962.png";

export default function Testimonial() {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
        <Swiper 
            modules={[Pagination]}
            // style={{
            //     "--swiper-pagination-bullet-active-width":"32px"
            // }}
            grabCursor={true}
            // initialSlide={3}
            // centeredSlides={true}
            slidesPerView={3}
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
            spaceBetween={10}
            // breakpoints={{
            //     320:{spaceBetween:5},
            //     430:{spaceBetween:5},
            //     550:{spaceBetween:5},
            //     650:{spaceBetween:5},
            // }}
        >
            
            {/* First testimonial */}
            <SwiperSlide className='swiper-slide-review slide-1 '>
                <div className='w-full h-[300px] bg-[#2877EA] rounded-2xl flex flex-col items-center justify-between shadow-xl relative py-4'>                          
                    <div className='flex gap-8 w-[90%] h-full flex-col items-center justify-center'>
                      <h3 className='text-white text-2xl font-semibold tracking-wide mt-4'>AltBucks</h3>
                      <p className='tracking-wide text-white text-xs'>I got paid on time and in full. I got paid on time and in full.</p>
                      <hr className='w-full border border-white '/>
                      <div className='flex justify-around w-[90%] items-center mx-auto'>
                        <Image src={testimonialImg} alt='' className='w-[50px] h-[50px] object-cover'/>
                        <div className='flex flex-col gap-2'>
                          <h3 className='text-white text-sm font-semibold tracking-wide'>David Beckham</h3>
                          <p className='text-white text-sm tracking-wide font-light'>Creative Director</p>
                        </div>

                      </div>
                    </div>
                </div>                
            </SwiperSlide>

            {/* Second testimonial */}
            <SwiperSlide className='swiper-slide-review slide-1 '>
                <div className='w-full h-[300px] bg-[#2877EA] rounded-2xl flex flex-col items-center justify-between shadow-xl relative py-4'>                          
                    <div className='flex gap-8 w-[90%] h-full flex-col items-center justify-center'>
                      <h3 className='text-white text-2xl font-semibold tracking-wide mt-4'>AltBucks</h3>
                      <p className='tracking-wide text-white text-xs'>I got paid on time and in full. I got paid on time and in full.</p>
                      <hr className='w-full border border-white '/>
                      <div className='flex justify-around w-[90%] items-center mx-auto'>
                        <Image src={testimonialImg} alt='' className='w-[50px] h-[50px] object-cover'/>
                        <div className='flex flex-col gap-2'>
                          <h3 className='text-white text-sm font-semibold tracking-wide'>David Beckham</h3>
                          <p className='text-white text-sm tracking-wide font-light'>Creative Director</p>
                        </div>

                      </div>
                    </div>
                </div>                
            </SwiperSlide>

            {/* Third testimonial */}
            <SwiperSlide className='swiper-slide-review slide-1 '>
                <div className='w-full h-[300px] bg-[#2877EA] rounded-2xl flex flex-col items-center justify-between shadow-xl relative py-4'>                          
                    <div className='flex gap-8 w-[90%] h-full flex-col items-center justify-center'>
                      <h3 className='text-white text-2xl font-semibold tracking-wide mt-4'>AltBucks</h3>
                      <p className='tracking-wide text-white text-xs'>I got paid on time and in full. I got paid on time and in full.</p>
                      <hr className='w-full border border-white '/>
                      <div className='flex justify-around w-[90%] items-center mx-auto'>
                        <Image src={testimonialImg} alt='' className='w-[50px] h-[50px] object-cover'/>
                        <div className='flex flex-col gap-2'>
                          <h3 className='text-white text-sm font-semibold tracking-wide'>David Beckham</h3>
                          <p className='text-white text-sm tracking-wide font-light'>Creative Director</p>
                        </div>

                      </div>
                    </div>
                </div>                
            </SwiperSlide>

            {/* Fourth testimonial */}
            <SwiperSlide className='swiper-slide-review slide-1 '>
                <div className='w-full h-[300px] bg-[#2877EA] rounded-2xl flex flex-col items-center justify-between shadow-xl relative py-4'>                          
                    <div className='flex gap-8 w-[90%] h-full flex-col items-center justify-center'>
                      <h3 className='text-white text-2xl font-semibold tracking-wide mt-4'>AltBucks</h3>
                      <p className='tracking-wide text-white text-xs'>I got paid on time and in full. I got paid on time and in full.</p>
                      <hr className='w-full border border-white '/>
                      <div className='flex justify-around w-[90%] items-center mx-auto'>
                        <Image src={testimonialImg} alt='' className='w-[50px] h-[50px] object-cover'/>
                        <div className='flex flex-col gap-2'>
                          <h3 className='text-white text-sm font-semibold tracking-wide'>David Beckham</h3>
                          <p className='text-white text-sm tracking-wide font-light'>Creative Director</p>
                        </div>

                      </div>
                    </div>
                </div>                
            </SwiperSlide>

            

            
        </Swiper>
    </div>
  )
}
