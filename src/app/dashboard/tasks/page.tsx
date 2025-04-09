"use client";

import { useEffect, useState } from "react";
import Card from "@/app/components/Tasks_Components/Card";
import Filter from "@/app/components/Tasks_Components/Filter";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import Header from "../../components/Dashboard_Components/Header";
import useScrollToTop from "@/hooks/useScrollToTop";
import Pagination from "@/app/components/Pagination/Pagination";
import { FaSpinner } from "react-icons/fa";
import api from "@/lib/api";
import { Filters } from "@/interface/Filter";

interface Pagination {
  page: number;
  total: number;
  limit: number
  totalPages: number;
}

interface TaskResponse {
  data: any[];
  pagination: Pagination;
}

const Tasks: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  useScrollToTop(page);

  const handleSearchAndFilter = async () => {

    const applicationRange = filters["Number of Applications"];
    const isApplicationRangeObject =
      applicationRange &&
      typeof applicationRange === "object" &&
      !Array.isArray(applicationRange) &&
      "minApplications" in applicationRange &&
      "maxApplications" in applicationRange;

     const taskPay = filters["Task Pay"];
     const isTaskPayObject = taskPay && typeof taskPay === "object" && "minPay" in taskPay && "maxPay" in taskPay;
      
    
    const payload: Record<string, any> = {
      search: searchQuery?.trim() || undefined,
      taskType: filters["Skill"]?.[0] || undefined,
      maxApplications: isApplicationRangeObject ? applicationRange.maxApplications : undefined,
      minApplications: isApplicationRangeObject ? applicationRange.minApplications : undefined,
      maxPay: isTaskPayObject ? taskPay.maxPay : undefined,
      minPay: isTaskPayObject ? taskPay.minPay : undefined,
      datePosted: filters["Date posted"]?.[0] || undefined,
      page,
      limit: 20,
    };

    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== undefined && value !== "" && value !== null
      )
    );

    try {
      setIsLoading(true)
      setError(null);
      const response = await api.post<TaskResponse>("/api/v1/tasks/search", cleanPayload);
      setSearchResult(response.data.data);
      const pagination = response.data.pagination.totalPages; 
      setTotalPages(pagination)
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      setError(
        error?.response?.data?.message ||
        "Something went wrong while fetching tasks. Please try again later."
      );
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSearchResult([]); 
    handleSearchAndFilter();
  }, [filters, searchQuery, page]);

  // Reset page to 1 when filters or searchQuery are cleared
  useEffect(() => {
    const isSearchEmpty = searchQuery.trim() === "";
    const areFiltersEmpty = Object.values(filters).every(
      (val) =>
        !val ||
        (Array.isArray(val) && val.length === 0) ||
        (typeof val === "object" &&
          Object.values(val).every((v) => v === null || v === ""))
    );

    if (isSearchEmpty && areFiltersEmpty) {
      setPage(1);
    }
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
          onClick={() => setIsFilterOpen(true)} 
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
          <div className="flex justify-center items-center h-48">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          </div>
            ) : error ? (
              <div className="text-center text-red-600 font-medium py-6 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            ) : searchResult.length > 0 ? (
              // Show search results if available
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {searchResult.map((card, index) => (
                  <Card key={index} {...card} />
                ))}
              </div>
            ) : (
            <div className="text-center text-gray-500 mt-10">
            No tasks found. Try adjusting your search or filters.
          </div>          
          )}
        </div>

        {/* Pagination */}
        </div>
          <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
};

export default Tasks;
