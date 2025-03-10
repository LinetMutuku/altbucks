import React from 'react'
import { FiMessageCircle } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";
import { MdLocationOn } from "react-icons/md";
import { IoIosCall } from "react-icons/io";

export default function ContactUsMethods() {
  return (
    <div className='w-[80%] mx-auto h-[300px] flex justify-between mt-[-100px] '>
        
        {/* Chat with Us */}
        <div className='w-[22%] h-fit  flex flex-col gap-2 bg-white rounded-lg py-6 px-4 shadow-md border border-gray-30 z-30'>
            <div className='w-[30px] h-[30px] border border-gray-400 rounded-md flex items-center justify-center'>
                <TiMessages size={15} color='black' />
            </div>
            <h3 className='text-black font-semibold tracking-wide text-sm mt-4'>Chat with Us</h3>
            <p className='text-black font-light text-sm tracking-wide'>Speak with our friendly team</p>
            <p className='border border-gray-300 px-4 py-2 w-fit rounded-xl text-xs text-black tracking-wide font-light'>sales@altbucks.com</p>
        </div>
        

        <div className='w-[22%] h-fit  flex flex-col gap-2 bg-white rounded-lg py-6 px-4 shadow-md border border-gray-30 z-30'>
            <div className='w-[30px] h-[30px] border border-gray-400 rounded-md flex items-center justify-center'>
                <FiMessageCircle size={15} color='black' />
            </div>
            <h3 className='text-black font-semibold tracking-wide text-sm mt-4'>Chat to support</h3>
            <p className='text-black font-light text-sm tracking-wide'>We're here to help</p>
            <p className='border border-gray-300 px-4 py-2 w-fit rounded-xl text-xs text-black tracking-wide font-light'>sales@altbucks.com</p>
        </div>

        <div className='w-[22%] h-fit  flex flex-col gap-2 bg-white rounded-lg py-6 px-4 shadow-md border border-gray-30 z-30'>
            <div className='w-[30px] h-[30px] border border-gray-400 rounded-md flex items-center justify-center'>
                <MdLocationOn size={15} color='black' />
            </div>
            <h3 className='text-black font-semibold tracking-wide text-sm mt-4'>Visit Us</h3>
            <p className='text-black font-light text-sm tracking-wide'>Visit our office headquarters</p>
            <p className='border border-gray-300 px-4 py-2 w-fit rounded-xl text-xs text-black tracking-wide font-light'>View on googlemaps</p>
        </div>

        <div className='w-[22%] h-fit  flex flex-col gap-2 bg-white rounded-lg py-6 px-4 shadow-md border border-gray-30 z-30'>
            <div className='w-[30px] h-[30px] border border-gray-400 rounded-md flex items-center justify-center'>
                <IoIosCall size={15} color='black' />
            </div>
            <h3 className='text-black font-semibold tracking-wide text-sm mt-4'>Call Us</h3>
            <p className='text-black font-light text-sm tracking-wide'>Monday to Friday 8am - 5pm</p>
            <p className='border border-gray-300 px-4 py-2 w-fit rounded-xl text-xs text-black tracking-wide font-light'>+(233) 555 555 555</p>
        </div>       
    </div>
  )
}
