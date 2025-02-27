"use client"
import React from 'react';

const AccountSettings = () => {
    return (
        <div>
            <h3 className='text-lg font-medium mb-6'>Change Password</h3>

            <div className='mb-6'>
                <label className='block text-sm font-medium mb-1'>Current Password</label>
                <input
                    type="password"
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    placeholder="Enter Current Password"
                />
            </div>

            <div className='grid grid-cols-2 gap-6 mb-8'>
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
                        placeholder="Enter New Password"
                    />
                </div>
            </div>

            <h3 className='text-lg font-medium mb-4'>Email Notifications</h3>

            <div className='space-y-4 mb-8'>
                <div className='flex items-start'>
                    <input
                        type="checkbox"
                        id="notification1"
                        className='mt-1 mr-3'
                        defaultChecked
                    />
                    <label htmlFor="notification1" className='text-sm'>
                        Get notified about new tasks, task status changes, and feedback.
                    </label>
                </div>

                <div className='flex items-start'>
                    <input
                        type="checkbox"
                        id="notification2"
                        className='mt-1 mr-3'
                        defaultChecked
                    />
                    <label htmlFor="notification2" className='text-sm'>
                        Receive payment confirmations and earnings reports.
                    </label>
                </div>

                <div className='flex items-start'>
                    <input
                        type="checkbox"
                        id="notification3"
                        className='mt-1 mr-3'
                        defaultChecked
                    />
                    <label htmlFor="notification3" className='text-sm'>
                        Receive payment confirmations and earnings reports.
                    </label>
                </div>
            </div>

            <div className='flex justify-end space-x-4'>
                <button className='px-4 py-2 border border-gray-300 rounded-md text-gray-700'>Cancel</button>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Save</button>
            </div>
        </div>
    );
};

export default AccountSettings;