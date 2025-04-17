import React from 'react';
import { FaWallet } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import save from '../../../../public/assets/save icon.png';
import Image from 'next/image';

const Cards = () => {
  return (
    <div>
      <section className='grid grid-cols-3 gap-3'>
        <div className='flex flex-col gap-2 p-8 bg-blue-500 rounded-lg'>
          <div className='flex items-center gap-1 text-white'>
            <span className='bg-[#D2E1FE] text-blue-500 p-2 rounded'>
              <FaWallet />
            </span>
            <span>Money Available</span>
          </div>
          <p className='text-[24px] font-bold'>$123,456.00</p>
          <div className='flex items-center gap-2 w-[40%]'>
            <button className='border text-[8px] font-medium p-1 rounded-md w-[50%]'>
              Today
            </button>
            <button className='border text-[8px] font-medium p-1 rounded-md w-[50%]'>
              All Time
            </button>
          </div>
        </div>
        <div className='border flex flex-col gap-2 p-8 bg-gradient-to-b from-[#FFFFFF] to-[#E9E9E9] rounded-lg'>
          <div className='flex items-center gap-1 text-white'>
            <span className='bg-[#D4FEE5] p-2 rounded'>
              <Image src={save} alt='' />
            </span>
            <span className='text-[#898989]'>Total Money Received</span>
          </div>
          <p className='text-[24px] font-bold text-black'>$1,123,456.00</p>
          <div className='flex items-center gap-2 w-[40%]'>
            <button className='border border-[#A0A0A0] bg-white text-[#A0A0A0] text-[8px] font-medium p-1 rounded-md w-[50%]'>
              Today
            </button>
            <button className='border border-[#A0A0A0] bg-white text-[#A0A0A0] text-[8px] font-medium p-1 rounded-md w-[50%]'>
              All Time
            </button>
          </div>
        </div>
        <div className='border flex flex-col gap-2 p-8 bg-gradient-to-b from-[#FFFFFF] to-[#E9E9E9] rounded-lg'>
          <div className='flex items-center gap-1 text-white'>
            <span className='bg-[#EEE2FF] text-[#654297] p-2 rounded'>
              <CiUser />
            </span>
            <span className='text-[#898989]'>Total Money Received</span>
          </div>
          <p className='text-[24px] font-bold text-black'>$1,123,456.00</p>
          <div className='flex items-center gap-2 w-[40%]'>
            <button className='border border-[#A0A0A0] bg-white text-[#A0A0A0] text-[8px] font-medium p-1 rounded-md w-[50%]'>
              Today
            </button>
            <button className='border border-[#A0A0A0] bg-white text-[#A0A0A0] text-[8px] font-medium p-1 rounded-md w-[50%]'>
              All Time
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cards;
