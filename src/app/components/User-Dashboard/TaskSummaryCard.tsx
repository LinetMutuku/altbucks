"use client";

import React from 'react';

const TaskSummaryCard = () => {
  return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-gray-900">Task Total</h3>
          <span className="text-2xl font-bold text-[#2877EA]">178</span>
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
                strokeDashoffset="70.7"
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
                strokeDashoffset="141.4"
                strokeDashoffset="212.1"
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
                strokeDashoffset="254.5"
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

export default TaskSummaryCard;