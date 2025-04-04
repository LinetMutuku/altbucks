"use client"

import React, { useEffect, useState } from "react";
import TaskCard from "@/app/components/Tasks_Components/TaskCard";
import Header from "@/app/components/Tasks_Components/Header";
import { IoSearchOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import api from "@/lib/api";

interface Compensation {
  currency: string;
  amount: number;
}


interface TaskDetails {
  _id: string;
  title: string;
  description: string;
  taskType: string;
  location: string;
  requirements: string;
  deadline: string;
  postedAt: string;
  compensation: Compensation;
  visibility: string;
  link1?: string;
  link2?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


type TaskCardProps = {
  _id: string;
  taskId: TaskDetails;
  earnerId: string;
  earnerStatus: string;
  email: string;
  publicId: string;
  reviewStatus: string;
  reviewedAt: string | null;
  submittedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  company: string;
  title: string;
  type: string;
  earnings: string;
  appliedOn: string;
  deadline: string;
  status: "Completed" | "Pending" | "In Progress";
  description: string;
};

const ApplicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [responseData, setResponseData] = useState<TaskCardProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

   const fetchData = async () => {
    try {
      const response = await api.post("/api/v1/tasks/applications/earner", {
        search: searchTerm,
      });

      setResponseData(response.data.data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setResponseData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(); 
  };
  
  console.log("responseData",responseData)

  return (
    <>
      <Header />
      <div className="p-4 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col my-auto w-full">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              My Applications
            </h1>
            {/* Subheading */}
            <p className="text-gray-500 text-sm mb-6">
              View and manage tasks you've applied for.
            </p>
            {/* Search Box */}
            <form onSubmit={handleSubmit} className="flex items-center justify-between w-full space-x-4">
              {/* Input Field */}
              <div className="relative flex items-center md:w-1/3 z-10">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search by Task Name or Poster"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2.5 pl-10 text-sm border rounded-md focus:ring-none focus:outline-none"
                  />
                  <div className="absolute left-3 top-3">
                    <IoSearchOutline className="text-xl opacity-70 text-blue-600 font-semibold" />
                  </div>
                </div>
                {/* Filter Button (Small Screens) */}
                <div className="flex justify-end px-3">
                  <button type="button" className="flex items-center gap-2">
                    <MdFilterList className="text-2xl text-[#2877EA]" />{" "}
                    <span className="mr-2 font-medium opacity-50">Filter</span>
                  </button>
                </div>
              </div>
              {/* Explore Button */}
              <button
                type="submit"
                className="px-2 py-2 md:px-6 md:py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Find Tasks
              </button>
            </form>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
          {responseData?.map((task, index) => (
            <TaskCard key={index} taskApplication={task} />
          ))}
        </div>
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </>
  );
};

export default ApplicationsPage;


// const data = await Data.findOne({email}, id)