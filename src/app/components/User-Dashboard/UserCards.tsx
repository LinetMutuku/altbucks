"use client"

import React, { useEffect, useState } from 'react';
import { IoBagHandleOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation'; // Changed to next/navigation for App Router
import api from '@/lib/api';
import { API_URL } from '@/lib/utils';

interface User {
  _id: number;
  firstName: string;
  email: string;
  lastName: string;
  phoneNumber: string;  
}

interface DashboardData {
  totalAmountSpent: number;
  workInProgressTasks: number;
  completedTasks: number;
  spendingOverTime: {
    graphData: { date: string; amount: number }[];
    taskEarningReport: {
      allTime: number;
      last30Days: number;
      last7Days: number;
      today: number;
    };
  };
}

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const UserCards: React.FC = () => {
    const { user, profileAuth } = useAuthStore();
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        profileAuth();
        if (user?.isTaskCreator) {
            router.push("/dashboard_taskCreator");
        }
    }, [user, profileAuth, router]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const authToken = localStorage.getItem("authToken");
        
            if (authToken) {
                try {
                    const decodedToken = jwtDecode<CustomJwtPayload>(authToken);
                    const userIdFromToken = decodedToken.userId;
                    setUserId(userIdFromToken);
                } catch (error) {
                    console.error("Error decoding token:", error);
                    router.push("/log-in");
                }
            } else {
                console.error("No authToken found in localStorage");
                router.push("/log-in");
            }
        }
    }, [router]);

    useEffect(() => {
        if (!userId) return;
    
        const fetchDashboardData = async () => {
            try {
                const response = await api.get(
                    `${API_URL}/api/v1/tasks/earner/dashboard?userId=${userId}`
                );
                const data = await response.data;
                setDashboardData(data.dashboardData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false); 
            }
        };
    
        fetchDashboardData();
    }, [userId]);
  
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 rounded-lg text-black border-2 border-transparent">
            {/* Card 1 */}
            <div className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg border-[1px] border-solid border-black-200">
                <div className="flex-shrink-0 w-fit p-3 h-fit bg-gray-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
                    <IoBagHandleOutline color='blue' size={30} />
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left">
                    <h2 className="text-sm font-extralight text-gray-400">Amount Earned</h2>
                    <p className="text-3xl max-lg:text-base font-semibold tracking-wide">
                        ${dashboardData?.totalAmountSpent || 0}
                    </p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg border-[1px] border-solid border-black-200">
                <div className="flex-shrink-0 w-fit p-3 h-fit bg-green-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
                    <CiBookmark color='green' size={30} />
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left">
                    <h2 className="text-sm font-extralight text-gray-400">Work In Progress</h2>
                    <p className="text-3xl max-lg:text-base font-semibold tracking-wide">
                        {dashboardData?.workInProgressTasks || 0}
                    </p>
                </div>
            </div>

            {/* Card 3 */}
            <div className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg border-[1px] border-solid border-black-200">
                <div className="flex-shrink-0 w-fit p-3 h-fit bg-purple-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
                    <CgProfile color='purple' size={30} />
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left">
                    <h2 className="text-sm font-extralight text-gray-400">Task Completed</h2>
                    <p className="text-3xl max-lg:text-base font-semibold tracking-wide">
                        {dashboardData?.completedTasks || 0}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserCards;