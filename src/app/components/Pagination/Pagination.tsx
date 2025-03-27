import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={() => setPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md text-sm bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          disabled={currentPage === i + 1}
          className={`px-4 py-2 rounded-md text-sm ${
            currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md text-sm bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
