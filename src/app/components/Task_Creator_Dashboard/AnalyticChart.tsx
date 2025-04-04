"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import useCompletedTasksOverTime from "@/hooks/useCompletedTaskOverTime";

const AnalyticChart = () => {
  const [timeRange, setTimeRange] = useState<string>("all");
  const { data, loading, error } = useCompletedTasksOverTime(timeRange);

  // Format data based on time range
  const formattedData = data.map((item, index) => {
    const date = parseISO(item.date);
    
    switch(timeRange) {
      case "today":
        return {
          ...item,
          formattedDate: format(date, 'HH:00'), // Hour format (00:00 - 23:00)
          tooltipDate: format(date, 'h a') // 12-hour format with AM/PM (1 PM)
        };
      case "7d":
        return {
          ...item,
          formattedDate: format(date, 'EEE'), // Short day name (Mon, Tue)
          tooltipDate: format(date, 'EEEE') // Full day name (Monday)
        };
      case "30d":
        return {
          ...item,
          formattedDate: format(date, 'd'), // Day of month (1-30)
          tooltipDate: format(date, 'MMM d') // Month + day (Jan 1)
        };
      default: // "all"
        return {
          ...item,
          formattedDate: format(date, 'MMM yyyy'), // Month + year (Jan 2023)
          tooltipDate: format(date, 'MMMM yyyy') // Full month + year (January 2023)
        };
    }
  });

  // Custom X-axis tick formatter
  const xAxisTickFormatter = (value: string) => {
    if (timeRange === "30d") return `${value}`; // Just show day number
    return value; // For other ranges, use the formatted value
  };

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-6 w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-8 border border-gray-200 px-8 py-8 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Task completed over time</h2>
          <div className="flex gap-4">
            {["all", "30d", "7d", "today"].map((range) => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-xs font-medium rounded-md ${
                  timeRange === range
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {range === "all" ? "All time" : 
                 range === "30d" ? "30 Days" : 
                 range === "7d" ? "7 Days" : "Today"}
              </button>
            ))}
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <p>Loading data...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-64 text-red-500">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Line Chart */}
        {!loading && !error && (
          <div className="mt-10 mb-1 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={xAxisTickFormatter}
                />
                <YAxis 
                  label={{ 
                    value: 'Tasks Completed', 
                    angle: -90, 
                    position: 'insideLeft',
                    fontSize: 12
                  }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [`${value} tasks`, "Completed"]}
                  labelFormatter={(label) => {
                    const item = formattedData.find(d => d.formattedDate === label);
                    return item?.tooltipDate || label;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Completed Tasks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticChart;