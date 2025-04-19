"use client";
import Image from 'next/image'
import React from 'react'
import profileImage from "../../../../public/assets/52c8f0d76821a360324586d8bc58cc5f.png";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

// Define the user type
interface User {
  userImageUrl?: any;
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

interface ViewProfileProps {
  user: User;
  dashboardData: any;
}

const ViewProfile: React.FC<ViewProfileProps> = ({ user, dashboardData }) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const numericProfileCompletion = parseFloat(dashboardData?.profileCompletion.replace('%', ''));
  
  return (
        <div className="w-full bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative w-24 h-24 flex justify-center items-center mb-4 rounded-full overflow-hidden">
            <div className="absolute w-20 h-20 rounded-full opacity-20 bg-gray-300"></div>
              <Image
                src={user.userImageUrl ? user.userImageUrl : profileImage}
                alt="User Profile"
                width={96}
                height={96}
                className="rounded-full z-10 object-cover"
              />
            </div>
    
            {/* User Info */}
            <div className="text-center mb-3">
              <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {isAuthenticated ? 'Online' : 'Offline'}
              </span>
            </div>
    
            {/* Profile Completion */}
            <div className="w-full mt-2 mb-4">
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${numericProfileCompletion}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Your profile is {numericProfileCompletion} complete.
                {numericProfileCompletion < 100 && ' Finish setting up'}
              </p>
            </div>
    
            {/* View Profile Button */}
            <Link href="/profile" className="w-full">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      );
}

export default ViewProfile;