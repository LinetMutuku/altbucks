"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Header from "../components/User-Dashboard/Header";
import ProfileHeader from '../components/Profile_Components/ProfileHeader';
import ProfileInformation from '../components/Profile_Components/ProfileInformation';
import AccountSettings from '../components/Profile_Components/AccountSettings';

export default function ProfilePage() {
    const { user, profileAuth } = useAuthStore();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        profileAuth();
    }, [profileAuth]);

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
                    <div className='flex mt-12'>
                        {/* Sidebar navigation */}
                        <div className='w-1/4 pr-6'>
                            <div
                                className={`py-4 px-6 flex flex-col ${activeTab === 'profile' ? 'border-l-4 border-blue-500' : ''}`}
                                onClick={() => setActiveTab('profile')}
                                style={{cursor: 'pointer'}}
                            >
                                <h3 className={`font-medium ${activeTab === 'profile' ? 'text-blue-500' : 'text-gray-500'}`}>
                                    Profile Information
                                </h3>
                                <p className='text-xs text-gray-500 mt-1'>
                                    You can change your personal information settings here.
                                </p>
                            </div>

                            <div
                                className={`py-4 px-6 flex flex-col ${activeTab === 'account' ? 'border-l-4 border-blue-500' : ''}`}
                                onClick={() => setActiveTab('account')}
                                style={{cursor: 'pointer'}}
                            >
                                <h3 className={`font-medium ${activeTab === 'account' ? 'text-blue-500' : 'text-gray-500'}`}>
                                    Account Settings
                                </h3>
                                <p className='text-xs text-gray-500 mt-1'>
                                    Change your Account Settings.
                                </p>
                            </div>
                        </div>

                        {/* Content area for tabs */}
                        <div className='w-3/4 bg-white p-6 border border-gray-200 rounded-lg'>
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