import React from "react";

interface PaginationProps {
  tablepage: number;
  applicationtotalPages: number;
  setApplicationPage: (page: number) => void;
}

const ApplicationPagination: React.FC<PaginationProps> = ({ tablepage, applicationtotalPages, setApplicationPage }) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (applicationtotalPages <= 5) {
      for (let i = 1; i <= applicationtotalPages; i++) pages.push(i);
    } else {
      if (tablepage <= 3) {
        pages.push(1, 2, 3, "...", applicationtotalPages);
      } else if (tablepage >= applicationtotalPages - 2) {
        pages.push(1, "...", applicationtotalPages - 2, applicationtotalPages - 1, applicationtotalPages);
      } else {
        pages.push(1, "...", tablepage - 1, tablepage, tablepage + 1, "...", applicationtotalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => setApplicationPage(Math.max(tablepage - 1, 1))}
        disabled={tablepage === 1}
        className="px-3 py-1 rounded-md text-sm bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      {generatePageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setApplicationPage(Number(page))}
            className={`px-3 py-1 rounded-md text-sm ${
              tablepage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => setApplicationPage(Math.min(tablepage + 1, applicationtotalPages))}
        disabled={tablepage === applicationtotalPages}
        className="px-3 py-1 rounded-md text-sm bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default ApplicationPagination;
