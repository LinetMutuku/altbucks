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

export default function FeaturedTask() {
  const {user} = useAuthStore();
  const [tasks, setTasks] = useState<TaskApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskApplication | null>(null);
  const [showMiniModalId, setShowMiniModalId] = useState<string | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const router = useRouter();

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
      } catch (err: any) {
        setError(err.message || "Error fetching tasks");
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
        return { bg: "bg-gray-200", text: "text-gray-500" };
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
                      <div className="absolute whitespace-nowrap right-0 top-8 bg-white border shadow-lg rounded-md z-10 p-2">
                        <button
                          onClick={() => handleViewClick(task)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Task
                        </button>
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
