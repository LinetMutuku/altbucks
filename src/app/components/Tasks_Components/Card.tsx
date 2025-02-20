"use client";

import React, { useState } from "react";
import TaskDetails from "./TaskDetails";
import UpdateTaskForm from "./UpdateTaskForm";
import { MdModeEdit } from "react-icons/md";

interface TaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

const Card = (props: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [taskData, setTaskData] = useState(props);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
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
        <div className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col h-full">
            <div className="pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{taskData.title}</h2>
                <p className="text-gray-500 text-xs whitespace-nowrap ml-2">Posted: {taskData.posted}</p>
              </div>
              <p className="text-gray-500 text-sm mb-1">{taskData.taskType}</p>
              <p className="text-gray-500 text-sm">{taskData.category}</p>
            </div>

            <div className="flex-grow">
              <p className="text-gray-600 text-sm line-clamp-2 my-4">{taskData.description}</p>

              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Earnings</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${taskData.compensation?.amount?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm mb-1">Deadline</p>
                  <p className="text-gray-900 text-sm">{formatDate(taskData.deadline)}</p>
                </div>
              </div>

              <div className="flex justify-end items-center gap-2">
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  View Details
                </button>
                <button
                    onClick={() => setIsUpdateOpen(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                >
                  <MdModeEdit className="text-lg" />
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </div>

        <TaskDetails
            isOpen={isModalOpen}
            onClose={handleClose}
            task={taskData}
        />

        {/* Update Task Modal */}
        {isUpdateOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white w-[120vw] h-[80vh] p-6 rounded-lg shadow-lg overflow-auto">
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