"use client"
import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

const ProfileInformation = ({ user }) => {
    const [imagePreview, setImagePreview] = useState(user?.photoURL || null);
    const { updateUserProfile } = useAuthStore();

    // Added predefined options for select fields
    const expertiseCategories = [
        "Social Media Management",
        "Content Creation",
        "Graphic Design",
        "Developmemt",
        "Writting",
        "Review",
        "Data Entry",
        "Virtual Assistance",
        "Customer Support",
        "Content Writing",
        "Translation",
        "Web Research",
        "Lead Generation",
        "Email Marketing",
        "Administrative Support",
        "Transcription",
        "Video Editing",
        "SEO"
    ];

    const languages = [
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese (Mandarin)",
        "Arabic",
        "Portuguese",
        "Russian",
        "Japanese",
        "Hindi",
        "Swahili",
        "Italian",
        "Korean",
        "Dutch",
        "Swedish"
    ];

    const locations = [
        "New York, USA",
        "Los Angeles, USA",
        "Chicago, USA",
        "Houston, USA",
        "Texas, USA",
        "London, UK",
        "Manchester, UK",
        "Toronto, Canada",
        "Sydney, Australia",
        "Melbourne, Australia",
        "Berlin, Germany",
        "Paris, France",
        "Madrid, Spain",
        "Tokyo, Japan",
        "Singapore",
        "Mumbai, India",
        "Nairobi, Kenya",
        "Lagos, Nigeria",
        "Cape Town, South Africa",
        "Mexico City, Mexico"
    ];

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
        <div className='space-y-6'>
            {/* Profile Picture Upload */}
            <div className='flex justify-center mb-4 sm:mb-8'>
                <div className='text-center'>
                    <div className='w-20 h-20 sm:w-24 sm:h-24 bg-yellow-100 rounded-full mx-auto flex items-center justify-center overflow-hidden'>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className='text-2xl sm:text-3xl font-bold text-blue-700'>
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
                        className='mt-2 sm:mt-3 text-blue-500 text-xs sm:text-sm border border-blue-500 rounded-md px-2 sm:px-3 py-1 inline-block cursor-pointer hover:bg-blue-50 transition-colors'
                    >
                        Change Picture
                    </label>
                </div>
            </div>

            {/* Name Inputs */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
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

            {/* Bio */}
            <div>
                <label className='block text-sm font-medium mb-1'>Bio</label>
                <textarea
                    className='w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]'
                    defaultValue="I specialize in social media management, graphic design, and data entry. Passionate about helping clients achieve their goals through efficient task completion."
                    placeholder="Give a brief info about yourself..."
                ></textarea>
                <div className='text-right text-xs text-gray-500 mt-1'>4/240</div>
            </div>

            {/* Expertise Categories */}
            <div>
                <label className='block text-sm font-medium mb-1'>Categories of Expertise</label>
                <div className='relative'>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'>
                        <option value="">Select Your Preferred Task Categories</option>
                        {expertiseCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Languages */}
            <div>
                <label className='block text-sm font-medium mb-1'>Languages</label>
                <div className='relative'>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'>
                        <option value="">Languages Spoken</option>
                        {languages.map((language, index) => (
                            <option key={index} value={language}>{language}</option>
                        ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div>
                <label className='block text-sm font-medium mb-1'>Location</label>
                <div className='relative'>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'>
                        <option value="">Choose Your City and Country</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4'>
                <button className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'>
                    Cancel
                </button>
                <button className='w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfileInformation;