"use client";

import React from "react";

const TaskActivities = () => {
  const tasks = [
    {
      status: "Cancelled",
      description: "Survey",
      date: "Oct 15, 2024",
      amount: "$10.04",
      platform: "Facebook",
    },
    {
      status: "Pending",
      description: "Writing",
      date: "Jan 17, 2022",
      amount: "$99.00",
      platform: "Facebook",
    },
    {
      status: "Pending",
      description: "Video review",
      date: "Jan 17, 2022",
      amount: "$249.94",
      platform: "Netflix",
    },
    {
      status: "Cancelled",
      description: "Writing",
      date: "Jan 17, 2022",
      amount: "$199.24",
      platform: "Amazon Prime",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 border 
      border-transparent hover:border-4 hover:border-blue-600 font-mulish">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-black mb-2">Featured Task</h1>
      </div>

      {/* Tasks Activities Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">Tasks Activities</h2>
        <a href="#" className="text-blue-500 text-sm font-medium hover:underline">
          Go to Task Page &rarr;
        </a>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Complete the tasks below to improve your rating
      </p>

      {/* Task List */}
      <div>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-centre justify-between py-4 border-b last:border-0"
          >
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  task.status === "Cancelled" ? "bg-red-500" : "bg-yellow-500"
                }`}
              ></span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-md ${
                  task.status === "Cancelled"
                    ? "bg-red-100 text-red-500"
                    : "bg-yellow-100 text-yellow-500"
                }`}
              >
                {task.status}
              </span>
            </div>

            {/* Task Description */}
            <div className="flex-1 ml-28 max-w-xs">
              <p className="text-sm font-medium text-gray-900 truncate">{task.description}</p>
              <p className="text-xs text-gray-500">{task.date}</p>
            </div>

            {/* Task Amount */}
            <div className="text-sm font-medium text-gray-900 flex-shrink-0 ml-0 mr-60">
              {task.amount}
            </div>

            {/* Task Platform */}
            <div className="text-sm text-gray-500 mr-20">{task.platform}</div>

            {/* Actions */}
            <button className="text-gray-400 hover:text-gray-700">
              ...
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskActivities;
