"use client";

import React, { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuFileQuestion } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdDoneAll, MdPendingActions } from "react-icons/md";
import { TaskApplication } from "@/interface/TaskApplication";
import api from "@/lib/api";
import { API_URL } from "@/lib/utils";
import { toast } from "react-toastify";
import TaskDetails from "./TaskDetails";

interface TaskTableProps {
  tasks: TaskApplication[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskApplication | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateTaskStatus = async (task: TaskApplication, status: "Approved" | "Rejected" | "Pending") => {
    if (!task.taskId || !task._id) {
      toast.error("Invalid task or application ID");
      return;
    }
    try {
      const response = await api.patch(
        `${API_URL}/api/v1/tasks/${task.taskId._id}/applications/${task._id}/review`,
        { reviewStatus: status }
      );
      if (response.status === 200) {
        task.earnerStatus = status;
        setMenuOpen(null);
        toast.success(`Task status updated to ${status}`);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };

  return (
    <div className="w-full p-8 bg-[#FFFFFF] rounded-lg shadow-md font-Satoshi">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-2">Task Name</th>
            <th className="px-4 py-2">Task Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Deadline</th>
            <th className="px-4 py-2">Payout</th>
            <th className="px-4 py-2">Earner Details</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b">
              <td className="px-4 py-2 flex items-center">
                <div className="bg-purple-100 p-2 rounded-full">
                  <LuFileQuestion className="text-xl" />
                </div>
                <div className="ml-2">
                  <div className="font-medium text-gray-800">{task.taskId?.title}</div>
                  <div className="text-gray-400 text-xs">20kb</div>
                </div>
              </td>
              <td className="px-4 py-2">{task.taskId?.taskType}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 text-xs rounded-md ${
                  task.earnerStatus === "In Progress" ? "bg-blue-100 text-blue-700" :
                  task.earnerStatus === "Completed" ? "bg-green-100 text-green-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {task.earnerStatus}
                </span>
              </td>
              <td className="px-4 py-2">
                {task.taskId?.deadline ? new Date(task.taskId.deadline).toLocaleDateString("en-US") : "N/A"}
              </td>
              <td className="px-4 py-2">${task.taskId?.compensation?.amount}</td>
              <td className="px-4 py-2">
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{task.email || "N/A"}</span>
                <span className="text-gray-400 text-xs">{task.publicId || "N/A"}</span>
              </div>
            </td>
              <td className="px-4 py-2 relative">
                <button
                  onClick={() => setMenuOpen(task._id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <HiDotsVertical className="w-5 h-5 text-gray-600" />
                </button>
                {isMenuOpen === task._id && (
                  <div ref={menuRef} className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border p-2 z-50">
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setModalOpen(true);
                      }}
                      className="flex items-center gap-2 text-blue-600 w-full px-3 py-2 hover:bg-blue-50 rounded-md"
                    >
                      <IoEyeSharp className="text-lg" /> View Task
                    </button>
                    <button className="flex items-center gap-2 text-green-600 w-full px-3 py-2 hover:bg-green-50 rounded-md" onClick={() => updateTaskStatus(task, "Approved")}>
                      <MdDoneAll className="text-lg" /> Mark Task as Complete
                    </button>
                    <button className="flex items-center gap-2 text-yellow-600 w-full px-3 py-2 hover:bg-yellow-50 rounded-md" onClick={() => updateTaskStatus(task, "Pending")}>
                      <MdPendingActions className="text-lg" /> Mark Task as Pending
                    </button>
                    <button className="flex items-center gap-2 text-red-500 w-full px-3 py-2 hover:bg-red-50 rounded-md" onClick={() => updateTaskStatus(task, "Rejected")}>
                      <FaTrashAlt className="text-lg" /> Reject Task
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedTask && (
        <TaskDetails isOpen={isModalOpen} onClose={() => setModalOpen(false)} task={selectedTask?.taskId} />
      )}
    </div>
  );
};

export default TaskTable;
