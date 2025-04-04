"use client";

import React, { useState, useEffect } from "react";
import RecentTasks from "@/app/components/Tasks_Components/RecentTasks";
import TaskTable from "@/app/components/Tasks_Components/Table";
import CreateTaskForm from "@/app/components/Tasks_Components/CreateTaskForm";
import { IoIosSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import api from "@/lib/api";
import { API_URL } from "@/lib/utils";
import Pagination from "@/app/components/Pagination/Pagination";
import CreatorHeader from "@/app/components/Task_Creator_Dashboard/CreatorHeader";

const Task: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);


  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await api.post(`${API_URL}/api/v1/tasks/applications/creator`);

      if (!response) throw new Error("Failed to fetch tasks");

      const data = response.data.data;
      console.log("when u walk", data)
      setTasks(data || []);
      setTotalPages(data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]); 

  // Fetch tasks from API based on filters & searchQuery
  const fetchTasksQuery = async () => {
    try {
      const response = await api.post(`${API_URL}/api/v1/tasks/applications/creator`, {
        search: searchQuery,
        status: filterStatus,
        page, 
        limit: pageSize,
      });

      if (!response) throw new Error("Failed to fetch tasks");

      const data = response.data.data;
      setTasks(data || []);
      setTotalPages(data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if(searchQuery || filterStatus) {
      fetchTasksQuery();
    }
  }, [searchQuery, filterStatus, page]); 

  return (
    <>
      <CreatorHeader />
      <div className="min-h-screen bg-white font-Satoshi overflow-x-hidden">
        {/* Recent Posts Section */}
        <div className="relative">
          <div className="flex justify-between items-center w-full p-8">
            <p className="text-xl font-medium">Recent Posts</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => setIsFormOpen(true)}
            >
              Create a Task
            </button>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <RecentTasks />
          </div>
        </div>

        {/* Task List */}
        <p className="text-xl w-full font-medium pt-8 pl-8">Task List</p>

        <div className="bg-white rounded-xl px-12 py-5 shadow-sm border border-gray-100 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            {/* Search Input */}
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1); 
                }}
                className="p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-100"
              />
              <IoIosSearch className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Filter Button */}
            <button
              className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md"
              onClick={() => setIsFilterOpen(true)}
            >
              <MdFilterList className="text-xl" />
              <span className="mr-2 font-medium">
                {filterStatus ? `Filtered: ${filterStatus}` : "Filter Tasks"}
              </span>
            </button>
          </div>

          {tasks.length > 0 ? (
            <TaskTable tasks={tasks} />
          ) : (
            <p className="text-center text-gray-500">No tasks found.</p>
          )}
        </div>

        {/* Create Task Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className="w-full sm:max-w-2xl bg-white p-6 rounded-lg shadow-lg">
              <CreateTaskForm onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        )}

        {/* Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Filter by Status</h3>
              <div className="space-y-3">
                {["Pending", "In Progress", "Cancelled", "Completed"].map((status) => (
                  <button
                    key={status}
                    className={`block w-full px-4 py-2 rounded-md text-left ${
                      filterStatus === status
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setFilterStatus(status);
                      setPage(1); 
                      setIsFilterOpen(false);
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button
                className="mt-4 w-full text-red-500 hover:text-red-700"
                onClick={() => {
                  setFilterStatus("");
                  setPage(1); 
                  setIsFilterOpen(false);
                }}
              >
                Clear Filter
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
};

export default Task;
