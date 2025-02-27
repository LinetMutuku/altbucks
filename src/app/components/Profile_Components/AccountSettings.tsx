"use client"
import React from 'react';

const AccountSettings = () => {
    return (
        <div className='w-full'>
            <h3 className='text-lg sm:text-xl font-medium mb-4 sm:mb-6'>Change Password</h3>

            <div className='mb-4 sm:mb-6'>
                <label className='block text-sm font-medium mb-1'>Current Password</label>
                <input
                    type="password"
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    placeholder="Enter Current Password"
                />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8'>
                <div>
                    <label className='block text-sm font-medium mb-1'>New Password</label>
                    <input
                        type="password"
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        placeholder="Enter New Password"
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium mb-1'>Confirm New Password</label>
                    <input
                        type="password"
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        placeholder="Confirm New Password"
                    />
                </div>
            </div>

            <h3 className='text-lg sm:text-xl font-medium mb-4'>Email Notifications</h3>

            <div className='space-y-3 sm:space-y-4 mb-6 sm:mb-8'>
                <div className='flex items-start'>
                    <input
                        type="checkbox"
                        id="notification1"
                        className='mr-3 mt-1 focus:ring-blue-500 text-blue-600 border-gray-300 rounded'
                        defaultChecked
                    />
                    <label htmlFor="notification1" className='text-sm text-gray-700'>
                        Get notified about new tasks, task status changes, and feedback.
                    </label>
                </div>

                <div className='flex items-start'>
                    <input
                        type="checkbox"
                        id="notification2"
                        className='mr-3 mt-1 focus:ring-blue-500 text-blue-600 border-gray-300 rounded'
                        defaultChecked
                    />
                    <label htmlFor="notification2" className='text-sm text-gray-700'>
                        Receive payment confirmations and earnings reports.
                    </label>
                </div>

                <div className='flex items-start'>
                    <input
                        type="checkbox"
                        id="notification3"
                        className='mr-3 mt-1 focus:ring-blue-500 text-blue-600 border-gray-300 rounded'
                        defaultChecked
                    />
                    <label htmlFor="notification3" className='text-sm text-gray-700'>
                        Receive platform updates and promotional offers.
                    </label>
                </div>
            </div>

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

export default AccountSettings;