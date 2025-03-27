"use client";

import React, { useState } from "react";
import TaskDetails from "./TaskDetails";
import UpdateTaskForm from "./UpdateTaskForm";
import { FaAngleRight } from "react-icons/fa";

interface TaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

const Card: React.FC = (props: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [taskData, setTaskData] = useState(props); 

  // Format Date Function (MM/DD/YYYY)
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"; 
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC", 
    }).format(date);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleTaskUpdate = (updatedTask: any) => {
    console.log("Task updated in Card:", updatedTask);
    setTaskData(updatedTask);
    setIsUpdateOpen(false);
  };

  return (
    <>
      <div className="border border-gray-300 font-Satoshi rounded-lg p-4 bg-white">
        <div className="flex flex-col space-y-4">
          <div className="pb-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-base">{taskData.title}</h2>
              <p className="text-black text-xs opacity-60">
                Posted: {formatDate(taskData.posted)}
              </p>
            </div>
            <p className="text-gray-500 text-sm mb-1">{taskData.taskType}</p>
            <p className="text-black text-sm opacity-50">{taskData.category}</p>
          </div>

          <p className="text-black text-sm opacity-70 line-clamp-3">
            {taskData.description}
          </p>

          <div className="flex justify-between gap-2 items-end text-sm text-black">
            <div className="flex flex-col space-y-2">
              <p className="text-black text-sm opacity-50">Earnings </p>
              <p className="text-md">${taskData.compensation?.amount || "0.00"}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-black text-sm opacity-50">Deadline</p>
              <p className="text-md">{formatDate(taskData.deadline)}</p>
            </div>
            <div className="flex flex-col justify-end">
              <button
                onClick={() => setModalOpen(true)}
                className="flex gap-2 justify-center text-blue-500 text-sm hover:underline self-start"
              >
                View Details <FaAngleRight className="mt-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <TaskDetails isOpen={isModalOpen} onClose={handleClose} task={taskData} />

      {/* Update Task Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[120vw] h-[80vh] p-6 rounded-lg overflow-auto">
            <UpdateTaskForm
              onClose={() => setIsUpdateOpen(false)}
              task={taskData}
              onUpdate={handleTaskUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
