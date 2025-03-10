
"use client";

import React, { useEffect } from "react";
import HeroSection from "../components/User-Dashboard/HeroSection";
import UserCards from "../components/User-Dashboard/UserCards";
import LineGraph from "../components/User-Dashboard/LineGraph";
import FeaturedTask from "../components/User-Dashboard/FeaturedTask";
import PersonalProfile from "../components/User-Dashboard/PersonalProfile";
import TaskSummaryCard from "../components/User-Dashboard/TaskSummaryCard";
import ReferralCard from "../components/User-Dashboard/ReferralCard";
import "../globals.css";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Header from "../components/Dashboard_Components/Header";

interface User {
    _id: string;
    isTaskCreator: string;
    name?: string;
    email?: string;
    balance?: number;
    totalEarnings?: number;
    tasksCompleted?: number;
    profilePicture?: string;
}

export default function Dashboard() {
    const router = useRouter();
    const { isAuthenticated, user, profileAuth } = useAuthStore();

    const handleButtonClick = () => {
        console.log("Post a Task button clicked!");
    };

    useEffect(() => {
        profileAuth();
        if (user?.isTaskCreator) {
            router.push("/dashboard_taskcreator");
        }
    }, [user, router, profileAuth]);



    return (
        <div className="min-h-screen w-full flex flex-col bg-white font-mulish overflow-x-hidden">
            {/* Header with shadow for better visual hierarchy */}
            <div className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
                <Header />
            </div>

            {/* Main Content */}
            <div className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                    {/* Left Column */}
                    <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
                        {/* Hero Section */}
                        <div className="bg-white rounded-xl shadow-sm">
                            <HeroSection
                                title="Build a hands-on team to work on your project faster and easier with"
                                subtitle="We've got a whole new pack of updates coming soon, you'll love them."
                                buttonText="Post a Task"
                                onButtonClick={handleButtonClick}
                                imageSrc="/assets/Arrows(2).png"
                                imageAlt="Illustration of arrows"
                            />
                        </div>

                        {/* User Cards */}

                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <UserCards />
                        </div>


                        {/* Line Graph Section */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <h2 className="text-base sm:text-lg font-bold text-black mb-4 font-mulish">
                                Spending Over Time
                            </h2>
                            <div className="w-full overflow-x-auto">
                                <div className="min-w-[600px] sm:min-w-0">
                                    <LineGraph />
                                </div>
                            </div>
                        </div>

                        {/* Featured Task Section */}
                        <div className="bg-white rounded-xl shadow-sm">
                            <FeaturedTask />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
                        {/* Personal Profile */}
                        <div className="bg-white rounded-xl shadow-sm">
                            <PersonalProfile />
                        </div>


                        {/* Task Summary */}
                        <div className="bg-white rounded-xl shadow-sm">
                            <TaskSummaryCard />
                        </div>

                        {/* Referral Card */}
                        <div className="bg-white rounded-xl shadow-sm">
                            <ReferralCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
