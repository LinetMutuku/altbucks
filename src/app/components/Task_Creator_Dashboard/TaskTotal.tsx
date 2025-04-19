"use client";

import React from 'react';

interface TaskSummaryCardProps {
  dashboardData: any;
}

const TaskTotal: React.FC<TaskSummaryCardProps> = ({ dashboardData }) => {
  // Handle the case where overView might be null
  if (!dashboardData) return null;

    const completedTasks = dashboardData?.completedTasks || 0;
    const pendingTasks = dashboardData?.inProgressTasks || 0;
    const cancelledTasks = dashboardData?.cancelledTasks || 0;

  // Total tasks count
  const totalTasks = cancelledTasks + completedTasks + pendingTasks;

  // Calculate the percentage for each task category
  const completedPercentage = (completedTasks / totalTasks) * 100;
  const pendingPercentage = (pendingTasks / totalTasks) * 100;
  const cancelledPercentage = (cancelledTasks / totalTasks) * 100;

  // Calculate the stroke offsets based on the percentages
  const completedOffset = 282.7 - (completedPercentage / 100) * 282.7;
  const pendingOffset = 282.7 - (pendingPercentage / 100) * 282.7;
  const cancelledOffset = 282.7 - (cancelledPercentage / 100) * 282.7;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-semibold text-gray-900">Task Total</h3>
        <span className="text-2xl font-bold text-[#2877EA]">{dashboardData?.numberOfTasks || 0}</span>
      </div>

      {/* Progress Circle */}
      <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-6">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          {/* Completed Tasks - Green */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#22C55E"
            strokeWidth="10"
            fill="none"
            strokeDasharray="282.7"
            strokeDashoffset={completedOffset}
          />
          {/* Pending Tasks - Blue */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#2877EA"
            strokeWidth="10"
            fill="none"
            strokeDasharray="282.7"
            strokeDashoffset={pendingOffset}
          />
          {/* Cancelled Tasks - Red */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#EF4444"
            strokeWidth="10"
            fill="none"
            strokeDasharray="282.7"
            strokeDashoffset={cancelledOffset}
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2877EA]"></div>
          <span className="text-sm text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
          <span className="text-sm text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default TaskTotal;