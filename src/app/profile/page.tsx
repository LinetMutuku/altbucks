"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Header from "../components/User-Dashboard/Header";
import ProfileHeader from '../components/Profile_Components/ProfileHeader';
import ProfileInformation from '../components/Profile_Components/ProfileInformation';
import AccountSettings from '../components/Profile_Components/AccountSettings';

export default function ProfilePage() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState('profile');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // useEffect(() => {
    //     profileAuth();
    // }, [profileAuth]);

    return (
        <div className='min-h-screen w-full flex flex-col bg-white font-mulish overflow-x-hidden'>
            {/* Header with shadow for better visual hierarchy */}
            <div className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
                <Header />
            </div>

            <div className='container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-grow'>
                <div className='w-full flex flex-col gap-5 mt-8'>
                    {/* Profile Header Component */}
                    <ProfileHeader user={user} />

                    {/* Tabs Section */}
                    <div className='flex flex-col lg:flex-row mt-12'>
                        {/* Mobile Tab Toggle */}
                        <div className='lg:hidden'>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className='w-full p-4 bg-gray-100 flex justify-between items-center'
                            >
                                <span className='font-medium'>
                                    {activeTab === 'profile' ? 'Profile Information' : 'Account Settings'}
                                </span>
                                <svg
                                    className={`w-6 h-6 transform transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Sidebar navigation */}
                        <div className={`
                            w-full lg:w-1/4 lg:pr-6 
                            ${isMobileMenuOpen ? 'block' : 'hidden'} 
                            lg:block
                        `}>
                            <div
                                className={`
                                    py-4 px-6 flex flex-col cursor-pointer
                                    ${activeTab === 'profile' ? 'lg:border-l-4 border-blue-500' : ''}
                                    hover:bg-gray-50 transition-colors
                                `}
                                onClick={() => {
                                    setActiveTab('profile');
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <h3 className={`
                                    font-medium 
                                    ${activeTab === 'profile' ? 'text-blue-500' : 'text-gray-500'}
                                `}>
                                    Profile Information
                                </h3>
                                <p className='text-xs text-gray-500 mt-1'>
                                    You can change your personal information settings here.
                                </p>
                            </div>

                            <div
                                className={`
                                    py-4 px-6 flex flex-col cursor-pointer
                                    ${activeTab === 'account' ? 'lg:border-l-4 border-blue-500' : ''}
                                    hover:bg-gray-50 transition-colors
                                `}
                                onClick={() => {
                                    setActiveTab('account');
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <h3 className={`
                                    font-medium 
                                    ${activeTab === 'account' ? 'text-blue-500' : 'text-gray-500'}
                                `}>
                                    Account Settings
                                </h3>
                                <p className='text-xs text-gray-500 mt-1'>
                                    Change your Account Settings.
                                </p>
                            </div>
                        </div>

                        {/* Content area for tabs */}
                        <div className='
                            w-full lg:w-3/4
                            bg-white
                            p-4 sm:p-6
                            border border-gray-200
                            rounded-lg
                            mt-4 lg:mt-0
                        '>
                            {/* Profile Information Tab Content */}
                            {activeTab === 'profile' && <ProfileInformation user={user} />}

                            {/* Account Settings Tab Content */}
                            {activeTab === 'account' && <AccountSettings />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}