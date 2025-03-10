"use client";

import { useState } from "react";
import Card from "@/app/components/Tasks_Components/Card";
import { CardsData } from "@/app/components/Tasks_Components/CardsData";
import Filter from "@/app/components/Tasks_Components/Filter";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import Header from "@/app/components/Tasks_Components/Header";

const Tasks: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
    <Header />
      <div className="bg-white p-3 md:p-8 font-Satoshi">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col my-auto w-full md:w-1/2">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Find Your Dream Task Here.
            </h1>
            {/* Subheading */}
            <p className="text-gray-500 text-sm mb-6">
              Curated tasks across the globe for you.
            </p>
            {/* Search Box */}
            <div className="flex items-center w-full space-x-4">
              {/* Input Field */}
              <div className="relative z-10 flex-grow">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-3 pl-10 text-sm border rounded-md focus:ring-none focus:outline-none"
                />
                <div className="absolute left-3 top-3">
                  <IoSearchOutline className="text-xl opacity-70 text-blue-600 font-semibold" />
                </div>
              </div>
              {/* Explore Button */}
              <button className="px-2 py-2 md:px-6 md:py-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none">
                Explore
              </button>
            </div>
          </div>
          {/* Image */}
          <div className="w-full md:w-72 h-72 p-3">
            <img
              src="/assets/task-image.png"
              alt="Task illustration"
              className="w-full md:w-60 h-60"
            />
          </div>
        </div>

        {/* Filter Button (Small Screens) */}
        <div className="md:hidden w-full flex justify-end p-3">
        <button
          className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md"
          onClick={() => setIsFilterOpen(true)} // Open filter
        >
          <MdFilterList className="text-xl" />{" "}
          <span className="mr-2 font-medium">Filter</span>
        </button>
        </div>

        {/* Filter Panel (Small Screens) */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex z-50">
            <div className="w-full md:w-3/4 h-full p-4 overflow-y-auto">
            <div className="bg-white rounded-lg">
              <button
                className="w-full flex justify-end bg-white rounded-lg p-2"
                onClick={() => setIsFilterOpen(false)} // Close filter
              >
                <IoClose className="text-2xl right-2"/>
              </button>
              <Filter />
            </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filter Section (Large Screens) */}
          <div className="hidden md:block w-1/3 rounded-lg border border-gray-300">
            <Filter />
          </div>

          {/* Cards Section */}
          <div className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CardsData.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
