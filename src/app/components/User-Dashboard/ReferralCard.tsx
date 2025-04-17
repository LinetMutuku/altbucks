'use client';

import React from 'react';
import money from "../../../../public/assets/money.png";
import refsquare from "../../../../public/assets/refsquare.png";
import sparkles from "../../../../public/assets/sparkles.png";
import Image from 'next/image';
import { toast } from 'react-toastify';

const ReferralCard = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('https://loremipsum/referral?Adam103eE-2');
    toast.success('Referral link copied!');
  };

  return (
    <div className="bg-white rounded-lg p-4 lg:w-[450px] lg:h-[550px] mt-0 mx-6 border 
        border-blue-600 hover:border-2 hover:border-blue-600 transition-all flex flex-col items-center
        md:w-[900px]">

      {/* Image Section */}
      <div className="relative w-full h-64 bg-blue-600">
          {/* Refsquare covers the whole div */}
          <Image
            src={refsquare}
            alt="refsquare"
            layout="fill" // Makes the image cover the parent div
            objectFit="cover" // Ensures the image scales proportionally while covering the div
            className="absolute top-0 left-0"
          />

          {/* Money image is centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={money}
              alt="Money Folder"
              width={144} // Equivalent to w-36
              height={144} // Equivalent to h-36
            />
      </div>
      </div>




      {/* Title Section */}
      <div className="text-center mt-6">
        <h2 className="text-lg text-blue-600 flex items-center justify-center space-x-2">
        <Image
              src={sparkles}
              alt="sparkles"
            />
          <span className='font-mulish'>Get paid directly into your existing account</span>
        </h2>
      </div>

      

      {/* Description Section 2 */}
      <p className="text-black mt-0 font-mulish font-bold text-2xl leading-[35.14px] tracking-[-1px] text-center">
        Withdraw Now
      </p>


      {/* Description Section */}
      <p className="text-gray-500 text-sm text-center mt-2 font-mulish">
        Click the code below to copy and send to your referrals and you can both earn $20 each
      </p>

      {/* Referral Code Section */}
      <button
        onClick={handleCopy}
        className="bg-blue-600 mt-6 font-mulish text-white rounded-lg py-2 px-3 w-full text-center text-sm hover:bg-blue-600 focus:ring focus:ring-blue-300"
      >
        https://loremipsum/referral?Adam103eE-2
      </button>
    </div>
  );
};

export default ReferralCard;
