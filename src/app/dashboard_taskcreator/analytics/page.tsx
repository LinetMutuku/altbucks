"use client";

import AnalyticChart from '@/app/components/Task_Creator_Dashboard/AnalyticChart';
import CreatorHeader from '@/app/components/Task_Creator_Dashboard/CreatorHeader';
import Header from '@/app/components/Task_Creator_Dashboard/CreatorHeader';
import TaskDuration from '@/app/components/Task_Creator_Dashboard/TaskDurationChart';
import PopularTaskTable from '@/app/components/User-Dashboard/PopularTaskTable';
import TaskPerformanceTask from '@/app/components/User-Dashboard/TaskPerformanceTask';
import BarChart from '@/components/tables/earnerWalletTable';
import useTaskAnalytics from '@/hooks/useTaskAnalytics';
import api from '@/lib/api';
import { API_URL } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface WorkerEngagement {
  date: string;
  count: number;
}

interface WorkerEngagementAnalytics {
  averageWorkerPerTask: number;
  workerEngagements: WorkerEngagement[];
}

interface averageDuration {
  date: string;
  averageDuration: string;
}

interface totalDurationAnalytics {
  percentageChange: number;
  totalAverageDuration: number;
  averageDurations: averageDuration[];
}

export default function Page() {
  const tabs = ["Popular Task Analysis", "Worker Engagement", "Task Duration"];
  const [selected, setSelected] = useState<number>(0);
  const [activeRange, setActiveRange] = useState<"1y" | "30d" | "7d" | "today">("1y");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popularTasks, setPopularTasks] = useState(null);
  const [workerEngagements, setWorkerEngagements] = useState<WorkerEngagementAnalytics | null>(null);
  const [totalDuration, setTotalDuration] = useState<totalDurationAnalytics | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedTab = typeof window !== "undefined" ? localStorage.getItem("selectedTab") : "0";
    setSelected(Number(storedTab) || 0);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("selectedTab", String(selected));
    }
  }, [selected, isClient]);

  const { analyticsData } = useTaskAnalytics(selected, activeRange);

  useEffect(() => {
    if (selected === 0) {
      setPopularTasks(analyticsData);
    } else if (selected === 1) {
      setWorkerEngagements(analyticsData);
    } else {
      setTotalDuration(analyticsData);
    }
  }, [analyticsData]);

  useEffect(() => {
    const fetchAnalyticsOverview = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");
        const response = await api.get(`${API_URL}/api/v1/analytics/overview`);
        setData(response.data.data);
      } catch (err: any) {
        console.error("API Fetch Error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Error fetching analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsOverview();
  }, []);

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