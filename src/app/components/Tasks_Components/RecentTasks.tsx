"use client";

import React, { useEffect, useState } from "react";
import Card from "@/app/components/Tasks_Components/Card";
import { Loader2 } from "lucide-react";
import { useTaskStore } from "@/store/taskStore";
import Pagination from "../Pagination/Pagination";

const RecentTasks = () => {
  const { tasks, isLoading, error, fetchTasks, totalPages } = useTaskStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks(page);
  }, [fetchTasks, page]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-8 bg-gray-50 rounded-lg shadow-sm">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <div className="text-lg font-medium text-gray-600">Loading your tasks...</div>
        <div className="text-sm text-gray-400 mt-2">Please wait while we fetch the latest updates</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-500 font-medium mb-2">Oops! Something went wrong</div>
        <div className="text-red-400 text-sm">{error}</div>
        <button
          onClick={() => fetchTasks(page)}
          className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="text-gray-400 text-lg font-medium mb-2">No tasks available</div>
        <div className="text-gray-400 text-sm">Check back later for new opportunities</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <Card key={task._id} {...task} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default RecentTasks;
