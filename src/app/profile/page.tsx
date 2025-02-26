"use client"
import React, { useEffect } from 'react';
import Header from '../components/Profile_Components/Header';
import { FaLocationPin, FaDatabase } from 'react-icons/fa6';
import { AiTwotoneSchedule } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
    const { isAuthenticated, user, profileAuth } = useAuthStore();

    useEffect(() => {
        profileAuth()
    }, [])

    return (
        <div className='w-screen h-fit'>
            <Header />
            <div className='w-[90%] mx-auto flex flex-col gap-5 mt-8'>
                {/* Top Section */}
                <div className='w-full h-[200px] overflow-hidden relative rounded-2xl'>
                    <img src={"./assets/92b9ff1824dfb796e7236321131c3140.jpeg"} className='w-full h-auto'/>
                    <div className='absolute bg-blue-600 opacity-60 top-0 left-0 right-0 bottom-0'></div>
                </div>

                {/* Main Section */}
                <div className='w-full h-fit mt-8'>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col gap-3 w-[600px]'>
                            <h3 className='text-2xl font-semibold text-blue-500'>
                                {user?.firstName} {user?.lastName}
                            </h3>
                            <p className='text-sm tracking-wide text-gray-500'>
                                I specialize in social media management, graphic design, and data entry.
                                Passionate about helping clients achieve their goals through efficient task completion.
                            </p>
                            <div className='text-blue-500 flex gap-3 items-center'>
                                <FaLocationPin size={20}/>
                                <p className='text-xs text-blue-500'>Texas, USA.</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-[300px]'>
                            <div className='flex bg-gray-300 rounded-md h-[10px] w-full'>
                                <div className='bg-orange-500 h-full w-[200px] rounded-md'></div>
                            </div>
                            <p className='text-blue-500 text-sm'>Your Profile is <span>80%</span> complete</p>
                        </div>
                    </div>

                    <div className='w-full h-[130px] flex justify-between mt-24'>
                        <div className='w-[22%] h-full px-10 py-6 rounded-md border-gray-400 border flex gap-5'>
                            <div className='w-fit h-fit p-4 rounded-md bg-blue-100'>
                                <AiTwotoneSchedule
                                    size={25}
                                    color='blue'
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <h4 className='text-gray-400'>Total Tasks Completed</h4>
                                <p className='text-4xl font-semibold text-black'>45</p>
                            </div>
                        </div>

                        <div className='w-[22%] h-full px-10 py-6 rounded-md border-gray-400 border flex gap-5'>
                            <div className='w-fit h-fit p-4 rounded-md bg-green-100'>
                                <FaDatabase
                                    size={25}
                                    color='green'
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <h4 className='text-gray-400'>Total Earnings</h4>
                                <p className='text-4xl font-semibold text-black'>$1500</p>
                            </div>
                        </div>

                        <div className='w-[22%] h-full px-10 py-6 rounded-md border-gray-400 border flex gap-5'>
                            <div className='w-fit h-fit p-4 rounded-md bg-orange-100'>
                                <CiStar
                                    size={25}
                                    color='orange'
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <h4 className='text-gray-400'>Average Rating</h4>
                                <p className='text-4xl font-semibold text-black'>4.8/5</p>
                            </div>
                        </div>

                        <div className='w-[22%] h-full px-10 py-6 rounded-md border-gray-400 border flex gap-5'>
                            <div className='w-fit h-fit p-4 rounded-md bg-green-100'>
                                <BsFillPatchCheckFill
                                    size={25}
                                    color='green'
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <h4 className='text-gray-400'>Job Success Rate</h4>
                                <p className='text-4xl font-semibold text-black'>100%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}