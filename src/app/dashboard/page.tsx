"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "../components/User-Dashboard/HeroSection";
import UserCards from "../components/User-Dashboard/UserCards";
import LineGraph from "../components/User-Dashboard/LineGraph";
import FeaturedTask from "../components/task/FeaturedTask";
import PersonalProfile from "../components/User-Dashboard/PersonalProfile";
import TaskSummaryCard from "../components/User-Dashboard/TaskSummaryCard";
import ReferralCard from "../components/User-Dashboard/ReferralCard";
import Header from "../components/Dashboard_Components/Header";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface OverviewData {
  cancelledTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  profileCompletion: string;
  totalEarnings: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, user, profileAuth } = useAuthStore();
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.isTaskCreator) {
      router.push("/dashboard_taskcreator");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await api.get("/api/v1/dashboard/overview/earner");
        setOverviewData(response.data?.data || null);
      } catch (err) {
        console.error("Failed to fetch overview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  const handleButtonClick = () => {
    router.push("/dashboard/task");
  };

  if (!isAuthenticated || loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen w-full flex flex-col bg-white font-mulish overflow-x-hidden">
      <div className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
        <Header />
      </div>

      <div className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <HeroSection
                title="Build a hands-on team to work on your project faster and easier with"
                subtitle="We've got a whole new pack of updates coming soon, you'll love them."
                buttonText="Start a Task"
                onButtonClick={handleButtonClick}
                imageSrc="/assets/Arrows(2).png"
                imageAlt="Illustration of arrows"
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <UserCards overviewData={overviewData} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[600px] sm:min-w-0">
                  <LineGraph />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
              <FeaturedTask />
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
            <PersonalProfile profileCompletion={overviewData?.profileCompletion ?? '0'} />
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              <TaskSummaryCard overView={overviewData} />
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              <ReferralCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
