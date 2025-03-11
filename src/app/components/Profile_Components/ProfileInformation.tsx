"use client"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '@/store/authStore'; // Import existing auth store

const ProfileInformation = () => {
    // Get user from auth store
    const { user, isAuthenticated } = useAuthStore();

    // Profile state
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        languages: '',
        expertise: '',
        location: '',
        avatar: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize with user data when component mounts or user changes
    useEffect(() => {
        if (user) {
            setProfileData({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                bio: user?.bio || '',
                languages: user?.languages || '',
                expertise: user?.expertise || '',
                location: user?.location || '',
                avatar: null
            });

            if (user.photoURL) {
                setImagePreview(user.photoURL);
            }
        }
    }, [user]);

    // Allowed values
    const allowedLanguages = ["English", "French", "Spanish", "German", "Chinese"];
    const allowedExpertise = ["Web Development", "Content Writing", "DevOps", "UI/UX Design"];
    const locations = ["Nigeria", "Rwanda", "Kenya", "United States", "Spain", "France"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // For all fields, just store the direct value (as a string)
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File is too large. Please select an image under 5MB.');
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
            setProfileData(prev => ({
                ...prev,
                avatar: file
            }));
            toast.success(`Image ${file.name} uploaded successfully`);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Get auth token
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            // Super minimal approach - only send non-problematic fields
            const minimalData = {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                bio: profileData.bio,
                location: profileData.location,
                expertise: profileData.expertise,
                languages: profileData.languages
            };

            console.log('Sending minimal data:', minimalData);

            // Make profile update API call
            const response = await fetch('https://altbucks-server-t.onrender.com/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(minimalData)
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                toast.success('Profile updated successfully!');

                // Refresh the user profile data in auth store after update
                // We need to call profileAuth() to refresh the user data
                try {
                    // Since profileAuth is async, we need to wait for it
                    await useAuthStore.getState().profileAuth();
                } catch (refreshError) {
                    console.error('Failed to refresh profile data:', refreshError);
                }

                // Handle avatar separately if present
                if (profileData.avatar) {
                    try {
                        const formData = new FormData();
                        formData.append('avatar', profileData.avatar);

                        // FIXED: Use the correct endpoint for avatar upload
                        const avatarResponse = await fetch('https://altbucks-server-t.onrender.com/users/profile', {
                            method: 'PUT',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: formData
                        });

                        if (!avatarResponse.ok) {
                            console.error('Avatar update failed with status:', avatarResponse.status);
                            toast.warning('Profile updated but avatar failed to update');
                        } else {
                            toast.success('Avatar also updated successfully!');

                            // Refresh the user profile data in auth store again after avatar update
                            try {
                                await useAuthStore.getState().profileAuth();
                            } catch (refreshError) {
                                console.error('Failed to refresh profile data after avatar update:', refreshError);
                            }
                        }
                    } catch (avatarError) {
                        console.error('Avatar update failed:', avatarError);
                        toast.warning('Profile updated but avatar failed to update');
                    }
                }
            } else {
                // Try to parse error response
                let errorMessage = 'Failed to update profile';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    // If can't parse JSON, use status code
                    errorMessage = `Server error: ${response.status}`;
                }

                throw new Error(errorMessage);
            }
        } catch (err) {
            console.error('Update failed:', err);
            setError(err.message);
            toast.error(err.message);
        }

        setIsLoading(false);
    };

    return (
        <div className='space-y-6 relative'>
            <ToastContainer position="top-right" autoClose={3000} />
            <form onSubmit={handleSubmit}>
                {/* Profile Picture Upload */}
                <div className='flex justify-center mb-4 sm:mb-8'>
                    <div className='text-center'>
                        <div className='w-20 h-20 sm:w-24 sm:h-24 bg-yellow-100 rounded-full mx-auto flex items-center justify-center overflow-hidden'>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-2xl sm:text-3xl font-bold text-blue-700'>
                                    {profileData.firstName ? profileData.firstName.charAt(0).toUpperCase() : '👤'}
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
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleInputChange}
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
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        placeholder="Write your bio here..."
                        maxLength={240}
                    ></textarea>
                    <div className='text-right text-xs text-gray-500 mt-1'>
                        {profileData.bio.length}/240
                    </div>
                </div>

                {/* Expertise Categories */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Categories of Expertise</label>
                    <div className='relative'>
                        <select
                            className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'
                            name="expertise"
                            value={profileData.expertise}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Your Preferred Task Categories</option>
                            {allowedExpertise.map((category, index) => (
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
                        <select
                            className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'
                            name="languages"
                            value={profileData.languages}
                            onChange={handleInputChange}
                        >
                            <option value="">Languages Spoken</option>
                            {allowedLanguages.map((lang, index) => (
                                <option key={index} value={lang}>{lang}</option>
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
                        <select
                            className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'
                            name="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                        >
                            <option value="">Choose Your City and Country</option>
                            {locations.map((loc, index) => (
                                <option key={index} value={loc}>{loc}</option>
                            ))}
                        </select>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Error message */}
                {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6'>
                    <button
                        type="button"
                        className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'
                        onClick={() => {
                            window.location.reload();
                            toast.info('Changes discarded');
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className='w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileInformation;