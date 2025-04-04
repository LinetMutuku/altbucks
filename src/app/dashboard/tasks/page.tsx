"use client";

import { useEffect, useState } from "react";
import Card from "@/app/components/Tasks_Components/Card";
import { CardsData } from "@/app/components/Tasks_Components/CardsData";
import Filter from "@/app/components/Tasks_Components/Filter";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import Header from "@/app/components/Tasks_Components/Header";
import useTasks from "@/hooks/useTask";
import useScrollToTop from "@/hooks/useScrollToTop";
import Pagination from "@/app/components/Pagination/Pagination";
import { FaSpinner } from "react-icons/fa";
import api from "@/lib/api";
import { title } from "process";

const Tasks: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { tasks, isLoading, error, totalPages } = useTasks(page, pageSize);

  useScrollToTop(page);

  // Function to get ISO date range
  const getISODateRange = (dateRanges: string[]) => {
    const now = new Date();
    let minDate = now; // Start with current date

    dateRanges.forEach((range) => {
      let calculatedDate = new Date(now); // Copy current date

      switch (range) {
        case "past_24_hours":
          calculatedDate.setHours(now.getHours() - 24);
          break;
        case "past_week":
          calculatedDate.setDate(now.getDate() - 7);
          break;
        case "past_month":
          calculatedDate.setDate(now.getDate() - 30);
          break;
        case "anytime":
        default:
          return; // Don't modify for "anytime"
      }

      // Keep the oldest date (earliest timestamp)
      if (calculatedDate < minDate) {
        minDate = calculatedDate;
      }
    });

    return minDate.toISOString();
  };

  const handleSearchAndFilter = async () => {
    console.log("Current Filters:", filters);

    const datePosted = getISODateRange(filters["Date posted"] || []); // Ensure it's an array

    console.log("Converted ISO Date:", datePosted);

    const payload: Record<string, any> = {
      search: searchQuery,
      taskType: filters["Skill"]?.[0] || "",
      maxApplications: filters["Number of Applications"]?.[0] || "",
      minApplications: filters["Number of Applications"]?.[1] || "",
      maxPay: filters["Task Pay"]?.[0] || "",
      minPay: filters["Task Pay"]?.[1] || "",
      datePosted, // Now correctly formatted
      page: 1, // Ensure we reset page to 1 for new searches
      limit: 20,
    };

    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === undefined ||
        payload[key] === "" ||
        (Array.isArray(payload[key]) && payload[key].length === 0)
      ) {
        delete payload[key];
      }
    });

    console.log("Final Payload Sent to Backend:", payload);

    try {
      const response = await api.post("/api/v1/tasks/search", payload);
      setSearchResult(response.data.data); // Update the search result state
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Use useEffect to re-fetch tasks whenever filters or searchQuery change
  useEffect(() => {
    handleSearchAndFilter(); // Fetch new data whenever searchQuery or filters change
  }, [filters, searchQuery]);


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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 text-sm border rounded-md focus:ring-none focus:outline-none"
                />
                <div className="absolute left-3 top-3">
                  <IoSearchOutline className="text-xl opacity-70 text-blue-600 font-semibold" />
                </div>
              </div>
              {/* Explore Button */}
              <button 
                  onClick={handleSearchAndFilter}
                  className="px-2 py-2 md:px-6 md:py-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none"
              >
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
                onClick={() => setIsFilterOpen(false)} 
              >
                <IoClose className="text-2xl right-2"/>
              </button>
              <Filter filters={filters} setFilters={setFilters} onClick={handleSearchAndFilter}/>
            </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filter Section (Large Screens) */}
          <div className="hidden md:block w-80 rounded-lg border border-gray-300">
          <Filter filters={filters} setFilters={setFilters} onClick={handleSearchAndFilter}/>
          </div>

        {/* Cards Section */}
        <div className="bg-white w-full">
          {isLoading ? (
            // Show Spinner while loading
            <div className="flex justify-center items-center h-48">
              <FaSpinner className="animate-spin text-blue-500 text-3xl" />
            </div>
          ) : error ? (
            // Show error message
            <p className="text-red-500 text-center">{error}</p>
          ) : (searchResult.length > 0 ? (
            // Show search results if available
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchResult.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          ) : (
            // Show all tasks if no search results
            tasks.length === 0 ? (
              <p className="text-gray-500 text-center">No tasks available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tasks.map((card, index) => (
                  <Card key={index} {...card} />
                ))}
              </div>
            )
          ))}
        </div>

        {/* Pagination */}
        </div>
          <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
};

export default Tasks;
