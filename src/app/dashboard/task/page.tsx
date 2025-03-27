"use client";

import { useEffect, useState } from "react";
import Card from "@/app/components/Tasks_Components/Card";
import Header from "@/app/components/Tasks_Components/Header-earner";
import CreateTaskForm from "@/app/components/Tasks_Components/CreateTaskForm";
import Link from "next/link";
import api from "@/lib/api";
import { FaSpinner } from "react-icons/fa";
import useScrollToTop from "@/hooks/useScrollToTop";
import useTasks from "@/hooks/useTask";
import Pagination from "@/app/components/Pagination/Pagination";
import { API_URL } from "@/lib/utils";
import { HiDotsVertical } from "react-icons/hi";
import { LuFileQuestion } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdDoneAll, MdFilterList, MdPendingActions } from "react-icons/md";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io";

const Task: React.FC = () => {
  const [page, setPage] = useState(1);
  const [tablepage, setTablePage] = useState(1);
  const pageSize = 12;
  const { tasks, isLoading, error, totalPages } = useTasks(page, pageSize);
  const [applicationtotalPages, setApplicationtotalPages] = useState(1);
  const [tasksApplications, setTasksApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useScrollToTop(page);

  const closeForm = () => setIsFormOpen(false);

  // Fetch tasks Application
  const fetchTasks = async () => {
    try {
      const response = await api.post(`${API_URL}/api/v1/tasks/applications/earner`);

      if (!response) throw new Error("Failed to fetch tasks");

      const data = response.data.data;
      setTasksApplications(data || []);
      setApplicationtotalPages(data?.pagination?.totalPages || 1);
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
      const response = await api.post(`${API_URL}/api/v1/tasks/applications/earner`, {
        search: searchQuery,
        status: filterStatus,
        page: tablepage, 
        limit: pageSize,
      });

      if (!response) throw new Error("Failed to fetch tasks");

      const data = response.data.data;
      setTasksApplications(data || []);
      setApplicationtotalPages(data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if(searchQuery || filterStatus) {
      fetchTasksQuery();
    }
  }, [searchQuery, filterStatus, page]);

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const updateTaskStatus = async (applicationId: string, taskId: string, status: "Approved" | "Rejected" | "Pending") => {
    setActiveMenu(null);
    try {
      const response = await api.patch(
        `${API_URL}/api/v1/tasks/${taskId}/applications/${applicationId}/status`,
        { earnerStatus: status }
      );

      if (response.status === 200) {
        toast.success(`Task status updated to ${status}`);
        fetchTasks(); 
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };

  //format time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  

  return (
    <>
      <Header />
      <div className="bg-white font-Satoshi">
        <div className="flex justify-between items-center w-full p-8">
          <p className="text-xl font-medium">Available Tasks</p>
          <Link href="/dashboard/tasks" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Explore More
          </Link>
        </div>

        <div className="bg-white px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <FaSpinner className="animate-spin text-blue-500 text-3xl" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tasks.map((card: any, index: number) => (
                <Card key={index} {...card} />
              ))}
            </div>
          )}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />

        <p className="text-xl w-full font-medium pt-8 pl-8">Task List</p>

        <div className="w-full p-8 bg-[#FFFFFF] rounded-lg shadow-md font-Satoshi">
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
                {tasksApplications.length > 0 ? (
                  tasksApplications.map((application: any) => {
                    const taskId = application.taskId;
                    const { title, taskType, deadline, compensation } = taskId || {};
                    return (
                      <tr key={application._id} className="border-b">
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
                              application.earnerStatus === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : application.earnerStatus === "Completed"
                                ? "bg-green-100 text-green-700"
                                : application.earnerStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {application.earnerStatus}
                          </span>
                        </td>
                        <td className="px-4 py-2">{deadline ? formatDate(deadline) : "N/A"}</td>
                        <td className="px-4 py-2">${compensation?.amount}</td>
                        <td className="px-4 py-2 relative">
                          <button
                            onClick={() => toggleMenu(application._id)}
                            className="p-2 rounded-full hover:bg-gray-100"
                          >
                            <HiDotsVertical className="w-5 h-5 text-gray-600" />
                          </button>

                          {activeMenu === application._id && (
                            <div className="absolute right-0 mt-2 w-[274px] bg-[#FFFFFF] rounded-lg shadow-lg border p-2 z-50">
                              <button className="flex items-center gap-2 text-blue-600 w-full px-3 py-2 hover:bg-blue-50 rounded-md">
                                <IoEyeSharp className="text-lg" /> View Task
                              </button>
                              <button
                                className="flex items-center whitespace-nowrap gap-2 text-green-600 w-full px-3 py-2 hover:bg-green-50 rounded-md"
                                onClick={() => updateTaskStatus(application._id, taskId._id, "Approved")}
                              >
                                <MdDoneAll className="text-lg" /> Mark Task as Complete
                              </button>
                              <button
                                className="flex items-center gap-2 whitespace-nowrap text-yellow-600 w-full px-3 py-2 hover:bg-yellow-50 rounded-md"
                                onClick={() => updateTaskStatus(application._id, taskId._id, "Pending")}
                              >
                                <MdPendingActions className="text-lg" /> Mark Task as Pending
                              </button>
                              <button
                                className="flex items-center gap-2 text-red-500 w-full px-3 py-2 hover:bg-red-50 rounded-md"
                                onClick={() => updateTaskStatus(application._id, taskId._id, "Rejected")}
                              >
                                <FaTrashAlt className="text-lg" /> Reject Task
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination currentPage={tablepage} totalPages={applicationtotalPages} setPage={setTablePage} />
          </div>
        </div>

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

        {isFormOpen && <CreateTaskForm onClose={closeForm} />}
      </div>
    </>
  );
};

export default Task;