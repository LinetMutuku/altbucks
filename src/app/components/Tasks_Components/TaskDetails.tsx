"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { toast } from 'react-toastify';
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

// Define interfaces at the top level
interface Compensation {
  amount: number;
  currency?: string;
}

interface TaskData {
  _id: string;
  title: string;
  taskType: string;
  description: string;
  compensation: Compensation;
  deadline: string;
  postedAt: string;
  requirements: string | string[];
  link1?: string;
  link2?: string;
}

interface TaskApplication {
  _id: string;
  earnerStatus: string;
  taskId: TaskData;
}

// Add the missing props interface
interface TaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskData | null; 
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const requirementsList = Array.isArray(task.requirements)
    ? task.requirements
    : task.requirements ? [task.requirements] : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const applyForTask = async () => {
    setIsLoading(true);
    try {
      const userId = task._id; 
      await api.post(`/api/v1/tasks/${userId}/applications`);
      toast.success("Application Successful! 🎉");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Something went wrong.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const modalContent = (
    <>
      <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium"
              >
                ← Back
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 max-h-[calc(90vh-8rem)]">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{task.title}</h2>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="text-gray-500 text-sm mb-1">Task Type</h3>
                <p className="text-gray-900 font-medium">{task.taskType}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm mb-1">Earnings</h3>
                <p className="text-gray-900 font-medium">${task.compensation.amount}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm mb-1">Deadline</h3>
                <p className="text-gray-900 font-medium">{formatDate(task.deadline)}</p>
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-gray-900 font-medium mb-2 ">Description</h3>
                <p className="text-gray-600">{task.description}</p>
              </section>

              <section>
                <h3 className="text-gray-900 font-medium mb-4">Task Requirements</h3>
                <div>
                  <h4 className="text-gray-600 mb-2">Instructions:</h4>
                </div>

                {requirementsList.length > 0 && (
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {requirementsList.map((req, index) => (
                        <li key={index} className="text-gray-600 flex gap-2">
                          <span className="text-blue-600">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="text-gray-600 mb-2">Criteria for Completion:</h4>
                  <ol className="list-decimal ml-4 space-y-2">
                    <li className="text-gray-600 pl-1">Complete the video review by answering all questions in the feedback form.</li>
                    <li className="text-gray-600 pl-1">Submit feedback before the deadline.</li>
                    <li className="text-gray-600 pl-1">Provide at least 3 suggestions for improvement in the video.</li>
                  </ol>
                </div>
              </section>

              {/* Video and Feedback Form Links */}
              {(task.link1 || task.link2) && (
                <div className="border-t pt-4 px-6 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    {task.link1 && (
                      <div>
                        <h4 className="text-gray-600 mb-2">Video Link</h4>
                        <a
                          href={task.link1}
                          className="text-blue-600 hover:underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {task.link1}
                        </a>
                      </div>
                    )}
                    {task.link2 && (
                      <div>
                        <h4 className="text-gray-600 mb-2">Feedback Form Link</h4>
                        <a
                          href={task.link2}
                          className="text-blue-600 hover:underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {task.link2}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          {!user?.isTaskCreator && (
            <div className="border-t p-4 flex justify-between">
              <button 
                onClick={applyForTask}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors duration-200"
              >
                {isLoading ? "Applying..." : "Apply for Task"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default TaskDetails;
