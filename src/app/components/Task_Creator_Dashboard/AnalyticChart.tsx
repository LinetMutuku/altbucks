"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
{ name: "Jan", uv: 4500, pv: 4900 },
  { name: "Feb", uv: 4000, pv: 2400 },
  { name: "Mar", uv: 3000, pv: 1398 },
  { name: "Apr", uv: 2000, pv: 9800 },
  { name: "May", uv: 2780, pv: 3908 },
  { name: "Jun", uv: 4500, pv: 5000 },
  { name: "Jul", uv: 3490, pv: 4300 },
  { name: "Aug", uv: 4000, pv: 4700 },
  { name: "Sep", uv: 3000, pv: 3500 },
  { name: "Oct", uv: 2000, pv: 4200 },
  { name: "Nov", uv: 3900, pv: 4800 },
  { name: "Dec", uv: 5000, pv: 5200 },
];

const AnalyticChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-6 w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-8 border border-gray-200 px-8 py-8 rounded-lg">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold ">Task completed over time</h2>
            <div className="flex gap-4">
                <button className="px-4 py-2 text-xs font-medium bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                    All time
                </button>
                <button className="px-4 py-2 text-xs font-medium bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                    30 Days
                </button>
                <button className="px-4 py-2 text-xs font-medium bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                    7 Days
                </button>
                <button className="px-4 py-2 text-xs font-medium bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                    Today
                </button>
            </div>
        </div>
      

      {/* Line Chart */}
      <div className="mt-10 mb-1">
        <ResponsiveContainer width="100%" height={350}>
            <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
            <CartesianGrid stroke="bg-white" strokeDasharray="none" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            />
            <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
            />
            <Line
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
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

export default AnalyticChart;