"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Dynamically import components with SSR disabled
const AnalyticChart = dynamic(() => import('@/app/components/Task_Creator_Dashboard/AnalyticChart'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
});

const CreatorHeader = dynamic(() => import('@/app/components/Task_Creator_Dashboard/CreatorHeader'), { 
  ssr: false 
});

const TaskDuration = dynamic(() => import('@/app/components/Task_Creator_Dashboard/TaskDurationChart'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
});

const PopularTaskTable = dynamic(() => import('@/app/components/User-Dashboard/PopularTaskTable'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
});

const TaskPerformanceTask = dynamic(() => import('@/app/components/User-Dashboard/TaskPerformanceTask'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
});

const BarChart = dynamic(() => import('@/components/tables/earnerWalletTable'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
});

interface WorkerEngagement {
  date: string;
  count: number;
}

interface WorkerEngagementAnalytics {
  averageWorkerPerTask: number;
  workerEngagements: WorkerEngagement[];
}

interface AverageDuration {
  date: string;
  averageDuration: string;
}

interface TotalDurationAnalytics {
  percentageChange: number;
  totalAverageDuration: number;
  averageDurations: AverageDuration[];
}

const AnalyticsDashboard = () => {
  const router = useRouter();
  const tabs = ["Popular Task Analysis", "Worker Engagement", "Task Duration"];
  const [selected, setSelected] = useState<number>(0);
  const [activeRange, setActiveRange] = useState<"1y" | "30d" | "7d" | "today">("1y");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [popularTasks, setPopularTasks] = useState<any>(null);
  const [workerEngagements, setWorkerEngagements] = useState<WorkerEngagementAnalytics | null>(null);
  const [totalDuration, setTotalDuration] = useState<TotalDurationAnalytics | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Initialize component (client-side only)
  useEffect(() => {
    setIsMounted(true);
    
    // Load saved tab selection
    const storedTab = localStorage.getItem("selectedTab") || "0";
    setSelected(Number(storedTab));

    // Fetch initial data
    fetchAnalyticsOverview();
  }, []);

  // Save tab selection to localStorage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("selectedTab", String(selected));
    }
  }, [selected, isMounted]);

  const fetchAnalyticsOverview = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please log in to view analytics");
        router.push("/login");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/analytics/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
    } catch (err: any) {
      console.error("API Fetch Error:", err.message);
      setError(err.message);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  // Handle tab content based on selection
  useEffect(() => {
    if (!data) return;

    switch (selected) {
      case 0:
        setPopularTasks(data.popularTasks);
        break;
      case 1:
        setWorkerEngagements(data.workerEngagement);
        break;
      case 2:
        setTotalDuration(data.taskDuration);
        break;
      default:
        break;
    }
  }, [selected, data]);

  if (!isMounted || loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[300px] bg-gray-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={fetchAnalyticsOverview}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CreatorHeader />
      <div className="bg-white min-h-screen px-6">
        <div className="container mx-auto px-4 py-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytic Reports</h1>
            <p className="text-lg text-gray-600 mt-2">
              Gain valuable insights into your task performance
            </p>
          </div>

          {/* Performance Overview */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Task performance overview</h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
            ) : (
              <TaskPerformanceTask analyticData={data} />
            )}
          </div>

          {/* Analytics Chart */}
          <div className="mb-10">
            <AnalyticChart />
          </div>

          {/* Detailed Reports Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Reports</h2>
              
              {/* Tabs and Download Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selected === index 
                          ? "bg-blue-600 text-white shadow-sm" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelected(index)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Download report
                </button>
              </div>

              {/* Tab Content */}
              <div className="border-t border-gray-200 pt-6">
                {/* Popular Task Analysis */}
                {selected === 0 && (
                  <div className="overflow-x-auto">
                    <PopularTaskTable popularTasks={popularTasks} />
                  </div>
                )}

                {/* Worker Engagement */}
                {selected === 1 && (
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Average worker per task</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900">
                            {workerEngagements?.workerEngagements?.reduce((total, entry) => total + entry.count, 0) || 0}
                          </span>
                          <span className={`text-sm font-semibold ${
                            (workerEngagements?.averageWorkerPerTask || 0) >= 0 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {workerEngagements?.averageWorkerPerTask?.toFixed(1) || 0}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["1y", "30d", "7d", "today"].map((period) => (
                          <button
                            key={period}
                            className={`px-3 py-1.5 text-xs rounded-md border ${
                              activeRange === period 
                                ? 'bg-blue-50 border-blue-200 text-blue-600 font-medium' 
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveRange(period as "1y" | "30d" | "7d" | "today")}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-[400px]">
                      <BarChart workerEngagements={workerEngagements?.workerEngagements ?? []} />
                    </div>
                  </div>
                )}

                {/* Task Duration */}
                {selected === 2 && (
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Average completion time</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900">
                            {totalDuration?.totalAverageDuration || 0}
                          </span>
                          <span className={`text-sm font-semibold ${
                            (totalDuration?.percentageChange || 0) >= 0 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {totalDuration?.percentageChange || 0}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["1y", "30d", "7d", "today"].map((period) => (
                          <button
                            key={period}
                            className={`px-3 py-1.5 text-xs rounded-md border ${
                              activeRange === period 
                                ? 'bg-blue-50 border-blue-200 text-blue-600 font-medium' 
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveRange(period as "1y" | "30d" | "7d" | "today")}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-[400px]">
                      <TaskDuration workerEngagements={totalDuration?.averageDurations ?? []} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Wrap in Suspense boundary
export default function DashboardPage() {
  return (
    <React.Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    }>
      <AnalyticsDashboard />
    </React.Suspense>
  );
}