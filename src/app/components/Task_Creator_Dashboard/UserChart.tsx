"use client";

import api from "@/lib/api";
import { API_URL } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface GraphData {
  date: string;
  amount: number;
}

interface UserChartProps {
  graphData: GraphData[];
  taskEarningReport: {
    allTime: number;
    last30Days: number;
    last7Days: number;
    today: number;
  };
}

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const UserChart = ({ graphData, taskEarningReport }: UserChartProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("allTime");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        try {
          const decodedToken = jwtDecode<CustomJwtPayload>(authToken);
          setUserId(decodedToken.userId);
        } catch (error) {
          console.error("Invalid JWT token", error);
        }
      }
    }
  }, []);

  // Format date to "MMM dd, yyyy" (e.g., Oct 20, 2029)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Convert raw graph data to show only months on X-axis
  const processedData = graphData.map((entry) => ({
    ...entry,
    month: new Date(entry.date).toLocaleString("en-US", { month: "short" }), // "Oct"
  }));

  // Filter graph data based on selected period
  const filteredGraphData = processedData.filter((entry) => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    switch (selectedPeriod) {
      case "last30Days":
        return entryDate >= new Date(now.setDate(now.getDate() - 30));
      case "last7Days":
        return entryDate >= new Date(now.setDate(now.getDate() - 7));
      case "today":
        return entryDate.toDateString() === new Date().toDateString();
      default:
        return true; // All time
    }
  });

  // Custom Tooltip to show date in "MMM dd, yyyy"
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            {formatDate(payload[0].payload.date)}
          </p>
          <p className="text-xs text-gray-600">
            Earnings: ${payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Handle Export PDF button click
  const handleExportPdf = async () => {
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    try {
      const response = await api.get(
        `${API_URL}/api/v1/tasks/task-creator/dashboard?userId=${userId}&exportPdf=true`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to export PDF");
      }

      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-report.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-bold">Spending Over Time</h2>
      <div className="flex flex-col gap-8 border border-gray-200 px-8 py-8 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-black">Task Earning Report</h2>
          <div className="flex gap-4">
            {["allTime", "last30Days", "last7Days", "today"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 text-xs font-medium ${
                  selectedPeriod === period ? "bg-blue-100" : "bg-gray-100"
                } text-gray-600 rounded-md hover:bg-gray-200`}
              >
                {period === "allTime"
                  ? "All time"
                  : period === "last30Days"
                  ? "30 Days"
                  : period === "last7Days"
                  ? "7 Days"
                  : "Today"}
              </button>
            ))}
            <button
              onClick={handleExportPdf}
              className="flex items-center bg-gray-100 text-gray-600 px-6 py-2 rounded-md shadow hover:bg-gray-200"
            >
              <span className="mr-2">Export PDF</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-8m-6-9l6 6m-6-6v6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Line Chart */}
        <div className="mt-10 mb-1">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={filteredGraphData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="bg-white" strokeDasharray="none" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserChart;
