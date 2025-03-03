"use client"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProfileInformationStore } from '@/store/profileStore';

const ProfileInformation = ({ user }) => {
    const [imagePreview, setImagePreview] = useState(user?.photoURL || null);

    // Get store actions and state - match function names with the store
    const {
        setAvatar,
        setBio,
        setLanguages,
        setExpertise,
        setFirstName,
        setLastName,
        setLocation,
        updateProfileInformation,
        isLoading,
        error
    } = useProfileInformationStore();

    // Initialize the store with user data when component mounts
    useEffect(() => {
        if (user) {
            if (user.firstName) setFirstName(user.firstName);
            if (user.lastName) setLastName(user.lastName);
            if (user.bio) setBio(user.bio);
            if (user.expertise) setExpertise(user.expertise);

            // Handle language initialization
            if (user.languages) {
                if (typeof user.languages === 'string') {
                    setLanguages([user.languages]); // Pass as array
                } else if (Array.isArray(user.languages) && user.languages.length > 0) {
                    setLanguages(user.languages); // Pass the array directly
                }
            }

            if (user.location) setLocation(user.location);
        }
    }, [user]);

    // Allowed values
    const allowedLanguages = ["English", "French", "Spanish", "German", "Chinese"];
    const allowedExpertise = ["Web Development", "Content Writing", "DevOps", "UI/UX Design"];
    const locations = [
        "New York, USA", "Los Angeles, USA", "Chicago, USA", "Houston, USA",
        "Texas, USA", "London, UK", "Manchester, UK", "Toronto, Canada",
        "Sydney, Australia", "Melbourne, Australia", "Berlin, Germany",
        "Paris, France", "Madrid, Spain", "Tokyo, Japan", "Singapore",
        "Mumbai, India", "Nairobi, Kenya", "Lagos, Nigeria",
        "Cape Town, South Africa", "Mexico City, Mexico"
    ];

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
            setAvatar(file);
            toast.success(`Image ${file.name} uploaded successfully`);
        };
        reader.readAsDataURL(file);
    };

    // Handle language change - convert single value to array
    const handleLanguageChange = (e) => {
        const value = e.target.value;
        setLanguages(value ? [value] : []); // Pass as array
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Use updateProfileInformation from the store
            const result = await updateProfileInformation();
            toast.success('Profile updated successfully!');

            // If the backend returns an updated photoURL, update the preview
            if (result && result.user && result.user.photoURL) {
                setImagePreview(result.user.photoURL);
            }
        } catch (err) {
            console.error('Error in handleSubmit:', err);
            toast.error(err.response?.data?.message || 'Failed to update profile. Please try again.');
        }
    };

    // Get the current languages from the store
    const currentLanguages = useProfileInformationStore(state => state.languages);
    // Extract the first language for the dropdown
    const currentLanguage = currentLanguages && currentLanguages.length > 0
        ? currentLanguages[0]
        : "";

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
                            onChange={(e) => setFirstName(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Last Name</label>
                        <input
                            type="text"
                            defaultValue={user?.lastName || ''}
                            onChange={(e) => setLastName(e.target.value)}
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
                        defaultValue={user?.bio || ''}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write your bio here..."
                        maxLength={240}
                    ></textarea>
                    <div className='text-right text-xs text-gray-500 mt-1'>
                        {user?.bio ? user.bio.length : 0}/240
                    </div>
                </div>

                {/* Expertise Categories */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Categories of Expertise</label>
                    <div className='relative'>
                        <select
                            className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'
                            defaultValue={user?.expertise || ""}
                            onChange={(e) => setExpertise(e.target.value)}
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

                {/* Languages - UPDATED to use setLanguages */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Languages</label>
                    <div className='relative'>
                        <select
                            className='w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white'
                            value={currentLanguage}
                            onChange={handleLanguageChange}
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
                            defaultValue={user?.location || ""}
                            onChange={(e) => setLocation(e.target.value)}
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