"use client"
import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

const ProfileInformation = ({ user }) => {
    const [imagePreview, setImagePreview] = useState(user?.photoURL || null);
    const { updateUserProfile } = useAuthStore();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File is too large. Please select an image under 5MB.');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        // Create a preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);

            // Upload to storage and update user profile
            uploadImageAndUpdateProfile(file);
        };
        reader.readAsDataURL(file);
    };

    const uploadImageAndUpdateProfile = async (file) => {
        try {
            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('profileImage', file);

            // Upload the image to your server
            const response = await fetch('/api/upload-profile-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();

            // Update user profile with the new image URL
            await updateUserProfile({
                photoURL: data.imageUrl,
            });

        } catch (error) {
            console.error('Error uploading profile image:', error);
            alert('Failed to upload image. Please try again.');
            // Reset preview if upload fails
            setImagePreview(user?.photoURL || null);
        }
    };
    return (
        <div>
            <div className='flex justify-center mb-8'>
                <div className='text-center'>
                    <div className='w-24 h-24 bg-yellow-100 rounded-full mx-auto flex items-center justify-center overflow-hidden'>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className='text-3xl font-bold text-blue-700'>
                                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : '👤'}
                            </span>
                        )}
                    </div>
                    <input
                        type="file"
                        id="profile-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    <label
                        htmlFor="profile-upload"
                        className='mt-3 text-blue-500 text-sm border border-blue-500 rounded-md px-3 py-1 inline-block cursor-pointer hover:bg-blue-50 transition-colors'
                    >
                        Change Picture
                    </label>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-6 mb-6'>
                <div>
                    <label className='block text-sm font-medium mb-1'>First Name</label>
                    <input
                        type="text"
                        defaultValue={user?.firstName || ''}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium mb-1'>Last Name</label>
                    <input
                        type="text"
                        defaultValue={user?.lastName || ''}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        placeholder="Last Name"
                    />
                </div>
            </div>

            <div className='mb-6'>
                <label className='block text-sm font-medium mb-1'>Bio</label>
                <textarea
                    className='w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]'
                    defaultValue="I specialize in social media management, graphic design, and data entry. Passionate about helping clients achieve their goals through efficient task completion."
                    placeholder="Give a brief info about yourself..."
                ></textarea>
                <div className='text-right text-xs text-gray-500 mt-1'>4/240</div>
            </div>

            <div className='mb-6'>
                <label className='block text-sm font-medium mb-1'>Categories of Expertise</label>
                <div className='relative'>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'>
                        <option>Select Your Preferred Task Categories</option>
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className='mb-6'>
                <label className='block text-sm font-medium mb-1'>Languages</label>
                <div className='relative'>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'>
                        <option>Languages Spoken</option>
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className='mb-6'>
                <label className='block text-sm font-medium mb-1'>Location</label>
                <div className='relative'>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'>
                        <option>Choose Your City and Country</option>
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className='flex justify-end space-x-4'>
                <button className='px-4 py-2 border border-gray-300 rounded-md text-gray-700'>Cancel</button>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Save</button>
            </div>
        </div>
    );
};

export default ProfileInformation;