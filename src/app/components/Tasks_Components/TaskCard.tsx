import { TaskApplication } from "@/interface/TaskApplication";
import React from "react";

interface TaskCardProps {
  taskApplication?: TaskApplication;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskApplication }) => {

  const taskId = taskApplication?.taskId;
  const earnerStatus = taskApplication?.earnerStatus || "Pending"; 

  const {
    title,
    taskType,
    deadline,
    compensation,
    description,
  } = taskId || {};

  // Format the deadline date
  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No Deadline";

  // Status styling
  const statusStyles = {
    Pending: "text-yellow-500",
    "In Progress": "text-blue-500",
    Completed: "text-green-500",
  };

  return (
    <div className="bg-white flex flex-col gap-3 rounded-lg p-2 md:p-6 w-full border border-gray-200 font-satoshi">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-[#4C2909]">{taskType}</h3>
        <span
          className={`text-sm font-semibold ${
            statusStyles[earnerStatus] || "text-gray-500"
          }`}
        >
          ● {earnerStatus}
        </span>
      </div>

      {/* Task Details */}
      <div>
        <h2 className="text-sm font-semibold text-[#1E1E1E] opacity-80">
          {title}
        </h2>
      </div>

      {/* Earnings and Dates */}
      <div className="flex justify-between text-sm w-full md:w-1/2">
        <p className="flex flex-col text-[#1E1E1E]">
          <span className="font-medium opacity-50">Earnings:</span>
          <span className="font-semibold">
            {/* {compensation.currency} {compensation.amount} */}
          </span>
        </p>
        <p className="flex flex-col text-red-600 font-medium text-sm">
          <span className="font-bold opacity-50">Deadline:</span>
          <span className="font-semibold">{formattedDeadline}</span>
        </p>
      </div>

      {/* Description */}
      <p className="text-black opacity-50 text-sm mb-4">{description}</p>

      {/* View Task Button */}
      <div className="flex justify-end">
        <button
          className="px-3 py-1 md:px-6 md:py-2 border border-[#2877EA] text-[#2877EA] rounded-md transition hover:bg-[#2877EA] hover:text-white"
          aria-label="View Task Details"
        >
          View Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;