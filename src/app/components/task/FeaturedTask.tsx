"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { API_URL } from "@/lib/utils";
import api from "@/lib/api";
import { TaskApplication } from "@/interface/TaskApplication";


export default function FeaturedTask() {
  const [tasks, setTasks] = useState<TaskApplication>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const taskId = tasks?.taskId;
  const applicationId = tasks?._id;
  const { title, taskType, deadline, compensation } = taskId || {};


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const isDashboard = typeof window !== "undefined" && window.location.pathname.includes("/dashboard");
        const apiUrl = isDashboard
          ? `${API_URL}/api/v1/tasks/applications/featured/earner`
          : `${API_URL}/api/v1/tasks/applications/featured/creator`;

        const response = await api.get(apiUrl);

        if (!response) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.data.data;
        setTasks(data); 
      } catch (err) {
        setError("Error fetching tasks");
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
        return { bg: "bg-[#D1FAE5]", text: "text-[#10B981]" };
      default:
        return { bg: "bg-gray-200", text: "text-gray-500" };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Featured Task</h2>

      <div className="flex flex-col gap-8 border border-gray-200 px-10 py-12 rounded-lg">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Tasks Activities</h3>
            <p className="text-sm text-gray-400">Complete the tasks below to improve your rating</p>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-blue-500 text-sm cursor-pointer">Go to Task Page</p>
            <IoIosArrowForward size={15} className="text-blue-500" />
          </div>
        </div>

        {/* {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks?.length === 0 ? (
          <p className="text-center text-gray-400">No featured tasks available.</p>
        ) : (
          <table className="w-full">
            <tbody className="flex flex-col gap-6 w-full">
              {tasks.map((task) => {
                const statusStyle = getStatusStyle(task.status);
                return (
                  <tr key={task.id} className="border-b border-gray-300 w-full flex justify-between">
                    <td className={`w-fit h-fit p-1 px-3 gap-2 ${statusStyle.bg} flex items-center rounded-xl`}>
                      <GoDotFill className={statusStyle.text} size={15} />
                      {task.status}
                    </td>
                    <td className="text-base font-semibold">{task.title}</td>
                    <td>
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-semibold">${task.amount.toFixed(2)}</h4>
                        <p className="text-sm font-extralight">{task.date}</p>
                      </div>
                    </td>
                    <td className="text-sm text-gray-400">{task.platform}</td>
                    <td>...</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )} */}
      </div>
    </div>
  );
}
