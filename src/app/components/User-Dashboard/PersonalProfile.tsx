"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import profileImg from "../../../../public/assets/Ellipse68.png";
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import axios from "axios";
import { API_URL } from "@/lib/utils";

const PersonalProfile = () => {
  const { isAuthenticated } = useAuthStore();
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data directly
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const { data } = await axios.get(`${API_URL}/users/user-profile`, {
          Credentials: true,
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setProfileData(data.profile || data.user || null);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) return null;

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let count = 0;
    ['email', 'firstName', 'lastName', 'phoneNumber'].forEach(field => {
      if (profileData[field]) count++;
    });
    if (profileData.photoURL || profileData.profilePicture) count++;

    return Math.round((count / 5) * 100);
  };

  const profileCompletion = calculateCompletion();
  const fullName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();

  return (
      <div className="w-full bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative w-24 h-24 flex justify-center items-center mb-4">
            <div className="absolute w-20 h-20 bg-green-500 rounded-full opacity-20"></div>
            <Image
                src={profileData.photoURL || profileData.profilePicture || profileImg}
                alt="User Profile"
                width={70}
                height={70}
                className="rounded-full z-10"
            />
          </div>

          {/* User Info */}
          <div className="text-center mb-3">
            <h2 className="text-xl font-bold">{fullName}</h2>
            <p className="text-sm text-gray-500 mb-2">ID: {profileData._id || 'Not available'}</p>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {isAuthenticated ? 'Online' : 'Offline'}
          </span>
          </div>

          {/* Profile Completion */}
          <div className="w-full mt-2 mb-4">
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Your profile is {profileCompletion}% complete.
              {profileCompletion < 100 && ' Finish setting up'}
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
};

export default PersonalProfile;