"use client"
import React, { useState } from 'react'
import Header from '../components/Authentication/Header'
import Image from 'next/image'
import illustrationImg from "../../../public/assets/Illustration.png";
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function Page() {
    const [createTask, setCreateTask] = useState(true);

    return (
        <div className='min-h-screen bg-[#2877EA] overflow-x-hidden'>
            <Header />
            <main className='container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 lg:py-16'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-10 lg:gap-12 max-w-7xl mx-auto'>
                    {/* Left Section */}
                    <div className='w-full lg:w-[40%] text-white space-y-6 text-center lg:text-left'>
                        <div className='space-y-3 sm:space-y-4'>
                            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                                Grow with us
                            </h2>
                            <p className='text-lg sm:text-xl md:text-2xl font-light tracking-wide opacity-90 max-w-2xl lg:max-w-none mx-auto'>
                                Access to thousands of task projects and clients
                            </p>
                        </div>
                        <div className='relative w-full max-w-md sm:max-w-lg mx-auto lg:max-w-none'>
                            <Image
                                src={illustrationImg}
                                className='w-full h-auto object-contain'
                                alt='Illustration'
                                priority
                            />
                        </div>
                    </div>

                    {/* Authentication Section */}
                    <div className='w-full lg:w-[55%] bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12'>
                        <div className='max-w-xl mx-auto space-y-6 sm:space-y-8'>
                            {/* Header */}
                            <div className='space-y-2 sm:space-y-3 text-center lg:text-left'>
                                <h4 className='text-gray-600 text-lg sm:text-xl tracking-wide'>Sign up now</h4>
                                <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900'>Welcome.</h2>
                                <p className='text-gray-600 text-sm sm:text-base tracking-wide'>
                                    Choose what you would like to use Alt bucks for
                                </p>
                            </div>

                            {/* Options */}
                            <div className='space-y-4'>
                                {/* Earn Option */}
                                <div
                                    onClick={() => setCreateTask(false)}
                                    className={`group transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-0 border-2 
                                    ${!createTask ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"} 
                                    rounded-xl p-4 sm:p-6 cursor-pointer text-center sm:text-left`}
                                >
                                    <div className='flex-shrink-0 bg-gray-600 w-14 h-14 sm:w-16 sm:h-16 rounded-full'></div>
                                    <div className='sm:ml-6 space-y-2'>
                                        <h3 className='text-gray-900 text-lg font-medium'>Earn</h3>
                                        <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                                            Showcase your talent to a large audience and connect with the right clients
                                        </p>
                                    </div>
                                </div>

                                {/* Create Task Option */}
                                <div
                                    onClick={() => setCreateTask(true)}
                                    className={`group transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-0 border-2 
                                    ${createTask ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"} 
                                    rounded-xl p-4 sm:p-6 cursor-pointer text-center sm:text-left`}
                                >
                                    <div className='flex-shrink-0 bg-blue-300 w-14 h-14 sm:w-16 sm:h-16 rounded-full'></div>
                                    <div className='sm:ml-6 space-y-2'>
                                        <h3 className='text-gray-900 text-lg font-medium'>Create Task</h3>
                                        <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                                            Hire a world-class team to get your project running
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='space-y-4 pt-4'>
                                <Link
                                    href={`${createTask ? "/sign-up-taskcreator":"/sign-up"}`}
                                    className='block w-full'
                                >
                                    <button className='bg-[#2877EA] hover:bg-blue-600 transition-all duration-200
                                                     rounded-xl py-3 sm:py-4 text-white font-medium w-full
                                                     text-sm sm:text-base
                                                     transform hover:translate-y-[-2px] active:translate-y-[1px]
                                                     hover:shadow-lg'>
                                        Continue
                                    </button>
                                </Link>

                                <p className='text-center text-sm sm:text-base text-gray-600'>
                                    Already have an account?{' '}
                                    <Link
                                        href="/log-in"
                                        className='text-[#2877EA] hover:text-blue-700 font-semibold transition-colors duration-200'
                                    >
                                        Log In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}