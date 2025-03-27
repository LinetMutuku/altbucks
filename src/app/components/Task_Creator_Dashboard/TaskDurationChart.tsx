"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", value: 4500 },
  { name: "Feb", value: 4000 },
  { name: "Mar", value: 3000 },
  { name: "Apr", value: 2000 },
  { name: "May", value: 2780 },
  { name: "Jun", value: 4500 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 3000 },
  { name: "Oct", value: 2000 },
  { name: "Nov", value: 3900 },
  { name: "Dec", value: 5000 },
];

const TaskDuration = () => {
  return (
    <div className=" rounded-lg p-6 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-8 border border-gray-200 px-8 py-4 rounded-lg">
        <div className="pl-5 mb-1 w-full">
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="bg-white" strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip contentStyle={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskDuration;
