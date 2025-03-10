"use client"
import React, { useEffect, useState } from 'react';
import { AiTwotoneSchedule } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { BsFillPatchCheckFill, BsGeoAlt } from "react-icons/bs";
import { FaDatabase } from 'react-icons/fa';
import { useProfileInformationStore } from '@/store/profileStore';

const ProfileHeader = ({ user }) => {
    // Get profile data from the store
    const {
        bio,
        languages,
        expertise,
        firstName,
        lastName,
        location,
        avatar
    } = useProfileInformationStore();

    // Local state for image preview
    const [imagePreview, setImagePreview] = useState(null);

    // Local state for user data
    const [userData, setUserData] = useState({
        ...user,
        firstName: firstName || user?.firstName || '',
        lastName: lastName || user?.lastName || '',
        bio: bio || user?.bio || '',
        location: location || user?.location || '',
    });

    // Update profile image when avatar changes
    useEffect(() => {
        if (avatar && avatar instanceof File) {
            // For new file uploads, create a preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(avatar);
        } else if (user?.photoURL) {
            // For existing images from the backend
            setImagePreview(user.photoURL);
        }
    }, [avatar, user?.photoURL]);

    // Update user data when store values change
    useEffect(() => {
        setUserData({
            ...user,
            firstName: firstName || user?.firstName || '',
            lastName: lastName || user?.lastName || '',
            bio: bio || user?.bio || '',
            location: location || user?.location || '',
        });
    }, [user, firstName, lastName, bio, location]);

    // Calculate profile completion
    const calculateProfileCompletion = () => {
        if (!userData) return 0;

        let completed = 0;
        const fields = ['firstName', 'lastName', 'email', 'phoneNumber', 'bio', 'location'];
        const totalFields = fields.length;

        fields.forEach(field => {
            if (userData[field]) completed++;
        });

        return Math.round((completed / totalFields) * 100);
    };

    const profileCompletion = calculateProfileCompletion();

    return (
        <div className='w-full'>
            {/* Top Section */}
            <div className='w-full h-[100px] sm:h-[200px] overflow-hidden relative rounded-2xl'>
                <img
                    src={"./assets/92b9ff1824dfb796e7236321131c3140.jpeg"}
                    className='w-full h-full object-cover'
                    alt="Banner"
                />
                <div className='absolute bg-blue-600 opacity-60 top-0 left-0 right-0 bottom-0'></div>
            </div>

            {/* Profile Section with overlapping avatar */}
            <div className='w-full h-fit mt-8 sm:mt-16 relative'>
                {/* Profile Picture - positioned to overlap with the hero banner */}
                <div className='absolute -top-12 sm:-top-20 left-4 sm:left-8'>
                    <div className='w-16 h-16 sm:w-24 sm:h-24 bg-yellow-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md'>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className='text-xl sm:text-3xl font-bold text-blue-700'>
                                {userData?.firstName ? userData.firstName.charAt(0).toUpperCase() : '👤'}
                            </span>
                        )}
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:pl-40 pt-4'>
                    <div className='flex flex-col gap-2 sm:gap-3 w-full sm:w-[600px] mb-4 sm:mb-0'>
                        <h3 className='text-xl sm:text-2xl font-semibold text-blue-500'>
                            {userData?.firstName || ''} {userData?.lastName || ''}
                        </h3>
                        <p className='text-xs sm:text-sm tracking-wide text-gray-500'>
                            {userData?.bio || 'No bio available'}
                        </p>
                        <div className='text-blue-500 flex gap-2 sm:gap-3 items-center'>
                            <BsGeoAlt size={16} className='sm:w-5 sm:h-5'/>
                            <p className='text-xs text-blue-500'>
                                {userData?.location || 'Location not specified'}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 sm:gap-3 w-full sm:w-[300px]'>
                        <div className='flex bg-gray-300 rounded-md h-[8px] sm:h-[10px] w-full'>
                            <div className='bg-orange-500 h-full rounded-md' style={{ width: `${profileCompletion}%` }}></div>
                        </div>
                        <p className='text-blue-500 text-xs sm:text-sm'>Your Profile is <span>{profileCompletion}%</span> complete</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-24 px-4'>
                    <div className='px-4 sm:px-10 py-4 sm:py-6 rounded-md border border-gray-300 flex gap-3 sm:gap-5'>
                        <div className='w-fit h-fit p-2 sm:p-4 rounded-md bg-blue-100'>
                            <AiTwotoneSchedule size={20} className="sm:w-6 sm:h-6" color='blue' />
                        </div>
                        <div className='flex flex-col gap-1 sm:gap-3'>
                            <h4 className='text-xs sm:text-sm text-gray-400'>Total Tasks</h4>
                            <p className='text-lg sm:text-4xl font-semibold text-black'>{userData?.tasksCompleted || 0}</p>
                        </div>
                    </div>

                    <div className='px-4 sm:px-10 py-4 sm:py-6 rounded-md border border-gray-300 flex gap-3 sm:gap-5'>
                        <div className='w-fit h-fit p-2 sm:p-4 rounded-md bg-green-100'>
                            <FaDatabase size={20} className="sm:w-6 sm:h-6" color='green' />
                        </div>
                        <div className='flex flex-col gap-1 sm:gap-3'>
                            <h4 className='text-xs sm:text-sm text-gray-400'>Total Earnings</h4>
                            <p className='text-lg sm:text-4xl font-semibold text-black'>${userData?.totalEarnings || 0}</p>
                        </div>
                    </div>

                    <div className='px-4 sm:px-10 py-4 sm:py-6 rounded-md border border-gray-300 flex gap-3 sm:gap-5'>
                        <div className='w-fit h-fit p-2 sm:p-4 rounded-md bg-orange-100'>
                            <CiStar size={20} className="sm:w-6 sm:h-6" color='orange' />
                        </div>
                        <div className='flex flex-col gap-1 sm:gap-3'>
                            <h4 className='text-xs sm:text-sm text-gray-400'>Average Rating</h4>
                            <p className='text-lg sm:text-4xl font-semibold text-black'>{userData?.averageRating || 0}/5</p>
                        </div>
                    </div>

                    <div className='px-4 sm:px-10 py-4 sm:py-6 rounded-md border border-gray-300 flex gap-3 sm:gap-5'>
                        <div className='w-fit h-fit p-2 sm:p-4 rounded-md bg-green-100'>
                            <BsFillPatchCheckFill size={20} className="sm:w-6 sm:h-6" color='green' />
                        </div>
                        <div className='flex flex-col gap-1 sm:gap-3'>
                            <h4 className='text-xs sm:text-sm text-gray-400'>Job Success Rate</h4>
                            <p className='text-lg sm:text-4xl font-semibold text-black'>{userData?.successRate || 0}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;