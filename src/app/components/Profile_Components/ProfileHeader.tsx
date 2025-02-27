"use client"
import React from 'react';
import { AiTwotoneSchedule } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { BsFillPatchCheckFill, BsGeoAlt } from "react-icons/bs";
import { FaDatabase } from 'react-icons/fa';

const ProfileHeader = ({ user }) => {
    // Calculate profile completion
    const calculateProfileCompletion = () => {
        if (!user) return 80; // Default value

        let completed = 0;
        const fields = ['firstName', 'lastName', 'email', 'phoneNumber'];

        fields.forEach(field => {
            if (user[field]) completed++;
        });

        return Math.round((completed / fields.length) * 100);
    };

    const profileCompletion = calculateProfileCompletion();

    return (
        <div className='w-full'>
            {/* Top Section */}
            <div className='w-full h-[200px] overflow-hidden relative rounded-2xl'>
                <img src={"./assets/92b9ff1824dfb796e7236321131c3140.jpeg"} className='w-full h-auto' alt="Banner" />
                <div className='absolute bg-blue-600 opacity-60 top-0 left-0 right-0 bottom-0'></div>
            </div>

            {/* Profile Section with overlapping avatar */}
            <div className='w-full h-fit mt-16 relative'>
                {/* Profile Picture - positioned to overlap with the hero banner */}
                <div className='absolute -top-20 left-8'>
                    <div className='w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md'>
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className='text-3xl font-bold text-blue-700'>
                                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : '👤'}
                            </span>
                        )}
                    </div>
                </div>

                <div className='flex justify-between items-center pl-40 pt-4'>
                    <div className='flex flex-col gap-3 w-[600px]'>
                        <h3 className='text-2xl font-semibold text-blue-500'>
                            {user?.firstName || ''} {user?.lastName || ''}
                        </h3>
                        <p className='text-sm tracking-wide text-gray-500'>
                            I specialize in social media management, graphic design, and data entry.
                            Passionate about helping clients achieve their goals through efficient task completion.
                        </p>
                        <div className='text-blue-500 flex gap-3 items-center'>
                            <BsGeoAlt size={20}/>
                            <p className='text-xs text-blue-500'>Texas, USA.</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 w-[300px]'>
                        <div className='flex bg-gray-300 rounded-md h-[10px] w-full'>
                            <div className='bg-orange-500 h-full rounded-md' style={{ width: `${profileCompletion}%` }}></div>
                        </div>
                        <p className='text-blue-500 text-sm'>Your Profile is <span>{profileCompletion}%</span> complete</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className='w-full flex justify-between mt-24'>
                    <div className='w-[22%] px-10 py-6 rounded-md border border-gray-300 flex gap-5'>
                        <div className='w-fit h-fit p-4 rounded-md bg-blue-100'>
                            <AiTwotoneSchedule size={25} color='blue' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h4 className='text-gray-400'>Total Tasks Completed</h4>
                            <p className='text-4xl font-semibold text-black'>{user?.tasksCompleted || 0}</p>
                        </div>
                    </div>

                    <div className='w-[22%] px-10 py-6 rounded-md border border-gray-300 flex gap-5'>
                        <div className='w-fit h-fit p-4 rounded-md bg-green-100'>
                            <FaDatabase size={25} color='green' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h4 className='text-gray-400'>Total Earnings</h4>
                            <p className='text-4xl font-semibold text-black'>${user?.totalEarnings || 0}</p>
                        </div>
                    </div>

                    <div className='w-[22%] px-10 py-6 rounded-md border border-gray-300 flex gap-5'>
                        <div className='w-fit h-fit p-4 rounded-md bg-orange-100'>
                            <CiStar size={25} color='orange' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h4 className='text-gray-400'>Average Rating</h4>
                            <p className='text-4xl font-semibold text-black'>{user?.averageRating || 0}/5</p>
                        </div>
                    </div>

                    <div className='w-[22%] px-10 py-6 rounded-md border border-gray-300 flex gap-5'>
                        <div className='w-fit h-fit p-4 rounded-md bg-green-100'>
                            <BsFillPatchCheckFill size={25} color='green' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h4 className='text-gray-400'>Job Success Rate</h4>
                            <p className='text-4xl font-semibold text-black'>{user?.successRate || 0}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;