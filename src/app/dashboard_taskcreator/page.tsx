"use client";

import React, { useEffect, useState } from "react";
import TopSection from "../components/Task_Creator_Dashboard/TopSection";
import UserInformation from "../components/Task_Creator_Dashboard/UserInformation";
import UserChart from "../components/Task_Creator_Dashboard/UserChart";
import FeaturedTask from "../components/task/FeaturedTask";
import TaskTotal from "../components/Task_Creator_Dashboard/TaskTotal";
import WithdrawNow from "../components/Task_Creator_Dashboard/WithdrawNow";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import api from "@/lib/api";
import { API_URL } from "@/lib/utils";
import CreatorHeader from "../components/Task_Creator_Dashboard/CreatorHeader";
import ViewProfile from "../components/Task_Creator_Dashboard/ViewProfile";

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

// Create an interface that matches what ViewProfile expects
interface ViewProfileUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isTaskCreator: boolean;
    referralCode: string;
    // Add any other required fields
}

const Page: React.FC = () => {
    const { user, profileAuth } = useAuthStore();
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        profileAuth();
        if (user?.isTaskEarner) {
            router.push("/dashboard");
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
                    `${API_URL}/api/v1/tasks/task-creator/dashboard?userId=${userId}`
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

    // Check if user has all required fields before rendering ViewProfile
    const hasRequiredUserFields = user &&
        user.email &&
        (user._id || user.id) &&
        user.firstName &&
        user.lastName &&
        user.phoneNumber;

    return (
        <>
            <CreatorHeader />
            <div className="flex justify-between w-[95%] mx-auto mt-10 overflow-x-hidden">
                <div className="w-[70%] flex flex-col gap-5">
                    <TopSection />
                    {dashboardData && (
                        <>
                            <UserInformation
                                totalAmountSpent={dashboardData.totalAmountSpent}
                                workInProgressTasks={dashboardData.workInProgressTasks}
                                completedTasks={dashboardData.completedTasks}
                            />
                            <UserChart
                                graphData={dashboardData.spendingOverTime.graphData}
                                taskEarningReport={dashboardData.spendingOverTime.taskEarningReport}
                            />
                        </>
                    )}
                    <FeaturedTask />
                </div>

                <div className="w-[28%] flex flex-col gap-5 justify-start">
                    {hasRequiredUserFields && (
                        <ViewProfile
                            user={{
                                _id: user._id || user.id,
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                phoneNumber: user.phoneNumber,
                                isTaskCreator: user.isTaskCreator || false,
                                referralCode: user.referralCode || '',
                                // Add any other required fields with default values
                            }}
                        />
                    )}
                    <TaskTotal />
                    <WithdrawNow />
                </div>
            </div>
        </>
    );
};

export default Page;