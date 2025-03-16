import TaskCard from "@/app/components/Tasks_Components/TaskCard";
import React from "react";
import Header from '@/app/components/Tasks_Components/Header'
import { IoSearchOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";

type TaskCardProps = {
  company: string;
  title: string;
  type: string;
  earnings: string;
  appliedOn: string;
  deadline: string;
  status: "Completed" | "Pending" | "In Progress";
  description: string;
};

const tasks: TaskCardProps[] = [
  {
    company: "Brand Alpha",
    title: "Video Review",
    type: "Survey",
    earnings: "$35",
    appliedOn: "Oct 5, 2024",
    deadline: "Oct 15, 2024",
    status: "Completed",
    description:
      "Complete a detailed survey about customer service experiences at Brand Alpha stores. The survey includes questions on service speed, staff attitude, and overall satisfaction. Your responses will help improve the customer service process.",
  },
  {
    company: "Brand Alpha",
    title: "Customer Feedback Survey",
    type: "Survey",
    earnings: "$35",
    appliedOn: "Oct 5, 2024",
    deadline: "Oct 15, 2024",
    status: "Completed",
    description:
      "Complete a detailed survey about customer service experiences at Brand Alpha stores. The survey includes questions on service speed, staff attitude, and overall satisfaction. Your responses will help improve the customer service process.",
  },
  {
    company: "Brand Alpha",
    title: "Customer Feedback Survey",
    type: "Survey",
    earnings: "$35",
    appliedOn: "Oct 5, 2024",
    deadline: "Oct 15, 2024",
    status: "Completed",
    description:
      "Complete a detailed survey about customer service experiences at Brand Alpha stores. The survey includes questions on service speed, staff attitude, and overall satisfaction. Your responses will help improve the customer service process.",
  },
  {
    company: "Brand Alpha",
    title: "Customer Feedback Survey",
    type: "Survey",
    earnings: "$35",
    appliedOn: "Oct 5, 2024",
    deadline: "Oct 15, 2024",
    status: "Completed",
    description:
      "Complete a detailed survey about customer service experiences at Brand Alpha stores. The survey includes questions on service speed, staff attitude, and overall satisfaction. Your responses will help improve the customer service process.",
  },
];

const ApplicationsPage: React.FC = () => {
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
                  <div className="flex items-center justify-between w-full space-x-4">
                    {/* Input Field */}
                    <div className="relative flex items-center md:w-1/3 z-10">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Search by Task Name or Poster"
                        className="w-full px-3 py-2.5 pl-10 text-sm border rounded-md focus:ring-none focus:outline-none"
                      />
                      <div className="absolute left-3 top-3">
                        <IoSearchOutline className="text-xl opacity-70 text-blue-600 font-semibold" />
                      </div>
                      </div>
                       {/* Filter Button (Small Screens) */}
                        <div className="flex justify-end px-3">
                        <button
                          className="flex items-center gap-2"
                          // onClick={() => setIsFilterOpen(true)}
                        >
                          <MdFilterList className="text-2xl text-[#2877EA]" />{" "}
                          <span className="mr-2 font-medium opacity-50">Filter</span>
                        </button>
                        </div>
                      
                    </div>
                    {/* Explore Button */}
                    <button className="px-2 py-2 md:px-6 md:py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none">
                      Find Tasks
                    </button>
                  </div>
                </div>
              </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
        {tasks.map((task, index) => (
          <TaskCard  key={index} {...task}/>
        ))}
      </div>
    </div>
    </>
  );
};

export default ApplicationsPage;