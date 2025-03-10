"use client";

import { tasks } from "@/lib/paymentHistory";
import Image from "next/image";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

const TableContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 12;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${currentPage === i ? "bg-blue-500 text-white" : "text-gray-700"}`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={i} className="mx-2 text-gray-700">...</span>);
      }
    }
    return pages;
  };

  return (
    <div>
      {/* Search & Filter */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow gap-2 lg:gap-0">
        <div className="flex items-center border p-2 rounded-lg w-full max-w-md ">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search here..."
            className="outline-none w-full"
          />
        </div>
        <button className="flex items-center text-[#344054] px-4 py-2 rounded-lg border outline-none">
        <BsFilter className="mr-2 text-xl" /> Filter
        </button>
      </div>

      {/* Payment History Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full border-collapse text-[#667085]">
          <thead>
            <tr className="">
              <th className="p-4 text-left">Task Name</th>
              <th className="p-4 text-left">Task Type</th>
              <th className="p-4">Date Completed</th>
              <th className="p-4">Payout</th>
            </tr>
          </thead>
          <tbody>
            {tasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage).map((task, index) => (
              <tr key={index} 
              className={`border border-gray-200 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
              // className="border-t"
              >
                <td className="p-4 flex items-center space-x-3">
                  <Image
                    src={task.image}
                    alt="task"
                    className="w-10 h-10 rounded-lg"
                    width={100}
                    height={100}
                  />
                  <div>
                    <p>{task.name}</p>
                    <p className="text-gray-500 text-sm">{task.email}</p>
                  </div>
                </td>
                <td className="p-4">{task.type}</td>
                <td className="p-4 text-center">{task.date}</td>
                <td className="p-4 text-center">{task.payout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="w-10 h-10 flex items-center justify-center border rounded-full text-gray-700"
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full"
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TableContent;














// "use client";

// import { tasks } from "@/lib/paymentHistory";
// import Image from "next/image";
// import { useState } from "react";
// import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

// const TableContent = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const tasksPerPage = 12;
//   const totalPages = Math.ceil(tasks.length / tasksPerPage);
//   return (
//     <div>
//       {/* Search & Filter */}
//       <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
//         <div className="flex items-center border p-2 rounded-lg">
//           <FaSearch className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="outline-none"
//           />
//         </div>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
//           Filter
//         </button>
//       </div>

//       {/* Payment History Table */}
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-4 text-left">Task Name</th>
//               <th className="p-4 text-left">Task Type</th>
//               <th className="p-4">Date Completed</th>
//               <th className="p-4">Payout</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks
//               .slice(
//                 (currentPage - 1) * tasksPerPage,
//                 currentPage * tasksPerPage
//               )
//               .map((task, index) =>
//                 <tr key={index} className="border-t">
//                   <td className="p-4 flex items-center space-x-3">
//                     <Image
//                       src={task.image}
//                       alt="task"
//                       className="w-10 h-10 rounded-lg"
//                       width={100}
//                       height={100}
//                     />
//                     <div>
//                       <p>
//                         {task.name}
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         {task.email}
//                       </p>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     {task.type}
//                   </td>
//                   <td className="p-4 text-center">
//                     {task.date}
//                   </td>
//                   <td className="p-4 text-center">
//                     {task.payout}
//                   </td>
//                 </tr>
//               )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center space-x-2 mt-2">
//         <button
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           className="p-2"
//         >
//           <FaChevronLeft />
//         </button>
//         {[...Array(totalPages)].map((_, index) =>
//           <button
//             key={index}
//             onClick={() => setCurrentPage(index + 1)}
//             className={`p-2 ${currentPage === index + 1
//               ? "bg-blue-500 text-white rounded-full"
//               : "bg-gray-200"}`}
//           >
//             {index + 1}
//           </button>
//         )}
//         <button
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//           className="p-2"
//         >
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TableContent;
