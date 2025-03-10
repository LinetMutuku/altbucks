"use client"
import React, { useEffect } from 'react'
import dancingIllustration from "../../../../../public/assets/my_wallet/dancing.png"
import { IoMdCloseCircleOutline } from 'react-icons/io'
import Image from 'next/image'
import { useMyContext } from '@/context'

const Hurray: React.FC = () => {
  const { setIsHurrayOpen } = useMyContext()
  const onClose = () => {
    setIsHurrayOpen(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsHurrayOpen(false)
    }, 5000);
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 z-20">
      <div className="relative w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <IoMdCloseCircleOutline size={24} />
        </button>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Side: Dancing Illustration */}
          <div className="flex justify-center">
            <Image
              src={dancingIllustration}
              alt="Dancing Illustration"
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Right Side: Success Message & Icon */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Hurray!</h2>
            <p className="mb-6 text-gray-600">
              Your transaction has been completed successfully.
            </p>
            {/* Success Check Icon */}
            <div className="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hurray
