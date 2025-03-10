"use client"


import { useMyContext } from "@/context";
import React, { useState } from "react";
import { IoMdCloseCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io"


const OtpConfirmation: React.FC = () => {
  const { setIsOtpConfirmation, setIsHurrayOpen } = useMyContext()
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Initialize an array for 6 OTP digits

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) { // Allow only digits and limit to 1 character
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to the next input field
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const onClose = () => {
    setIsOtpConfirmation(false)
  }
  const handleSubmit = () => {
    console.log("OTP Submitted:", otp.join(""))
    setIsHurrayOpen(true)
    setIsOtpConfirmation(false)

  }

  return (
    <div className="fixed inset-0 bg-[#00000098] flex items-center justify-center px-4 z-20">
      <div className="relative w-full max-w-md mx-auto bg-gradient-to-r from-[#010E39] to-[#012677] p-8 rounded-2xl shadow-lg text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-2xl focus:outline-none"
          aria-label="Close"
        >
          <IoMdCloseCircleOutline size={24} />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">OTP Confirmation</h2>
            <p className="mt-2 text-sm md:text-base">
              Enter the 6-digit code sent to your phone or email.
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="grid grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-full p-4 text-center text-xl rounded bg-transparent border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center gap-2"
          >
            <IoMdCheckmarkCircleOutline size={20} />
            <span className="font-semibold">Confirm</span>
          </button>

          {/* Resend Code Link */}
          <p className="text-center text-sm underline cursor-pointer">
            Resend Code
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpConfirmation;
