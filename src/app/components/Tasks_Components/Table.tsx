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

interface TaskCardProps {
  taskApplication?: TaskApplication;
}

const TaskTable: React.FC<TaskCardProps> = ({ taskApplication }) => {
  const taskId = taskApplication?.taskId;
  const applicationId = taskApplication?._id;
  const { title, taskType, deadline, compensation } = taskId || {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [earnerStatus, setEarnerStatus] = useState(
    taskApplication?.earnerStatus || "Pending"
  );
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateTaskStatus = async (status: "Approved" | "Rejected" | "Pending") => {

    if (!taskId || !applicationId) {
      toast.error("Invalid task or application ID");
      return;
    }
    
    try {


      const response = await api.patch(
        `${API_URL}/api/v1/tasks/${taskId?._id}/applications/${applicationId}/status`,
        {
          reviewStatus: status,
        }
      );

      if (response.status === 200) {
        setEarnerStatus(status);
        closeMenu();
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
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full">
                  <LuFileQuestion className="text-xl" />
                </div>
                <div className="ml-2">
                  <div className="font-medium text-gray-800">{title}</div>
                  <div className="text-gray-400 text-xs">20kb</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-2">{taskType}</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 text-xs rounded-md ${
                  earnerStatus === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : earnerStatus === "Completed"
                    ? "bg-green-100 text-green-700"
                    : earnerStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {earnerStatus}
              </span>
            </td>
            <td className="px-4 py-2">{deadline}</td>
            <td className="px-4 py-2">${compensation?.amount}</td>

            {/* Three-dot action button with modal */}
            <td className="px-4 py-2 relative">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <HiDotsVertical className="w-5 h-5 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-[274px] bg-[#FFFFFF] rounded-lg shadow-lg border p-2 z-50"
                >
                  <button className="flex items-center gap-2 text-blue-600 w-full px-3 py-2 hover:bg-blue-50 rounded-md">
                    <IoEyeSharp className="text-lg" /> View Task
                  </button>
                  <button
                    className="flex items-center whitespace-nowrap gap-2 text-green-600 w-full px-3 py-2 hover:bg-green-50 rounded-md"
                    onClick={() => updateTaskStatus("Approved")}
                  >
                    <MdDoneAll className="text-lg" /> Mark Task as Complete
                  </button>
                  <button
                    className="flex items-center gap-2 whitespace-nowrap text-yellow-600 w-full px-3 py-2 hover:bg-yellow-50 rounded-md"
                    onClick={() => updateTaskStatus("Pending")}
                  >
                    <MdPendingActions className="text-lg" /> Mark Task as Pending
                  </button>
                  <button
                    className="flex items-center gap-2 text-red-500 w-full px-3 py-2 hover:bg-red-50 rounded-md"
                    onClick={() => updateTaskStatus("Rejected")}
                  >
                    <FaTrashAlt className="text-lg" /> Reject Task
                  </button>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;

  // <div ref={menuRef} className="absolute right-0 mt-2 w-[274px] bg-[#FFFFFF] rounded-lg shadow-lg border p-2 z-50">
                //   <button className="flex items-center gap-2 text-red-500 w-full px-3 py-2 hover:bg-red-50 rounded-md">
                //     <FaTrashAlt className="text-lg" /> Delete Task
                //   </button>
                //   <button className="flex items-center gap-2 text-blue-600 w-full px-3 py-2 hover:bg-blue-50 rounded-md">
                //     <IoEyeSharp className="text-lg" /> View Task
                //   </button>
                //   <button className="flex items-center whitespace-nowrap gap-2 text-green-600 w-full px-3 py-2 hover:bg-green-50 rounded-md">
                //     <MdDoneAll className="text-lg" /> Mark Task as Complete
                //   </button>
                //   <button className="flex items-center gap-2 whitespace-nowrap text-yellow-600 w-full px-3 py-2 hover:bg-yellow-50 rounded-md">
                //     <MdPendingActions className="text-lg" /> Mark Task as Pending
                //   </button>
                // </div>
