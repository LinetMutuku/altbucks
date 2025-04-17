"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { API_URL } from "@/lib/utils";
import api from "@/lib/api";
import { TaskApplication } from "@/interface/TaskApplication";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import TaskDetails from "../Tasks_Components/FeaturedTask";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function FeaturedTask() {
  const {user} = useAuthStore();
  const [tasks, setTasks] = useState<TaskApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskApplication | null>(null);
  const [showMiniModalId, setShowMiniModalId] = useState<string | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const router = useRouter();
  console.log(activeMenu)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const isDashboard =
          typeof window !== "undefined" &&
          window.location.pathname.includes("/dashboard_taskcreator");

        const apiUrl = isDashboard
        ? `${API_URL}/api/v1/tasks/applications/featured/creator`
        : `${API_URL}/api/v1/tasks/applications/featured/earner`;

        const response = await api.get(apiUrl);

        if (!response?.data?.data) {
          throw new Error("Failed to fetch tasks or data is missing.");
        }

        setTasks(response.data.data);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Failed to update task status";
        toast.error(message);      
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return { bg: "bg-[#FEE2E2]", text: "text-[#EF4444]" };
      case "pending":
        return { bg: "bg-[#FEF9C3]", text: "text-[#FACC15]" };
      case "completed":
        return { bg: "bg-green-200", text: "text-green-500" };
      default:
        return { bg: "bg-gray-200", text: "text-gray-500" };
    }
  };

  const handleRoute = () => {
    if (user?.isTaskCreator) {
      router.push("/dashboard_taskcreator/task");
    }else{
      router.push("/dashboard/task");
    }
  } 

  const handleViewClick = (task: TaskApplication) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
    setShowMiniModalId(null);
  };

  const updateTaskStatus = async (
    applicationId: string,
    taskId: string,
    status: "Completed" | "Cancelled" | "Pending"
  ) => {
    setActiveMenu(null);
    try {
      const response = await api.patch(
        `${API_URL}/api/v1/tasks/${taskId}/applications/${applicationId}/status`,
        { earnerStatus: status }
      );
      if (response.status === 200) {
        toast.success(`Task status updated to ${status}`);
        setTasks(prev =>
          prev.map(task =>
            task._id === applicationId
              ? { ...task, earnerStatus: status }
              : task
          )
        );
        setShowMiniModalId(null);
      }      
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Failed to update task status";
        toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Featured Task</h2>

      <div className="flex flex-col gap-8 border border-gray-200 px-10 py-12 rounded-lg">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Tasks Activities</h3>
            <p className="text-sm text-gray-400">
              Complete the tasks below to improve your rating
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p onClick={handleRoute} className="text-blue-500 text-sm cursor-pointer">
              Go to Task Page
            </p>
            <IoIosArrowForward size={15} className="text-blue-500" />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400">No featured tasks available.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Payout</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
        
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => {
              const statusStyle = getStatusStyle(task.earnerStatus);
              const isOpen = showMiniModalId === task._id;
        
              return (
                <tr key={task._id} className="relative">
                  <td className="px-4 py-2">
                    <div className={`w-fit h-fit p-1 px-3 gap-2 ${statusStyle.bg} flex items-center rounded-xl`}>
                      <GoDotFill className={statusStyle.text} size={15} />
                      {task.earnerStatus}
                    </div>
                  </td>
        
                  <td className="px-4 py-2 text-base font-semibold">
                    {task.taskId.title}
                  </td>
        
                  <td className="px-4 py-2">
                    <h4 className="text-sm font-semibold">
                      ${task.taskId.compensation.amount.toFixed(2)}
                    </h4>
                  </td>
        
                  <td className="px-4 py-2 text-sm font-extralight">
                    {new Date(task.taskId.deadline).toLocaleDateString()}
                  </td>
        
                  <td className="px-4 py-2 text-sm text-gray-400">
                    {task.taskId.location}
                  </td>
        
                  <td className="px-4 py-2 text-right relative">
                    <button
                      onClick={() => setShowMiniModalId((prev) => (prev === task._id ? null : task._id))}
                      className="text-blue-500 underline text-sm"
                    >
                      ⋯
                    </button>
        
                    {isOpen && (
                      <div className="absolute whitespace-nowrap right-0 bottom-10 bg-white border shadow-lg rounded-xl z-50 p-4 w-56">
                        <div className="flex flex-col gap-4">
                          <button
                            onClick={() => updateTaskStatus(task._id, task.taskId._id, "Cancelled")}
                             className="flex items-center gap-2 text-sm text-red-500 hover:opacity-80">
                            <div className="bg-red-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                              </svg>
                            </div>
                            Delete Task
                          </button>

                          <button
                            onClick={() => handleViewClick(task)}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:opacity-80"
                          >
                            <div className="bg-blue-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 01-6 0m6 0a3 3 0 00-6 0m6 0H9" />
                              </svg>
                            </div>
                            View Task
                          </button>

                          <button 
                            onClick={() => updateTaskStatus(task._id, task.taskId._id, "Completed")}
                            className="flex items-center gap-2 text-sm text-green-600 hover:opacity-80">
                            <div className="bg-green-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            Mark Task as Complete
                          </button>

                          <button
                          onClick={() => updateTaskStatus(task._id, task.taskId._id, "Pending")}
                          className="flex items-center gap-2 text-sm text-yellow-600 hover:opacity-80">
                            <div className="bg-yellow-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m0-4h.01M12 20h.01" />
                              </svg>
                            </div>
                            Mark Task as Pending
                          </button>
                        </div>
                      </div>
                    )}

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        )}
      </div>

      {/* Task Details Modal */}
      {showTaskDetails && selectedTask && (
        <TaskDetails
          isOpen={true}
          onClose={() => setShowTaskDetails(false)}
          task={selectedTask.taskId}
        />
      )}
    </div>
  );
}
