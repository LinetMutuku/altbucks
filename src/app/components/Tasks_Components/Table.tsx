"use client"

import React from "react";
import { TableData } from "./CardsData";
import { HiDotsVertical } from "react-icons/hi";
import { MdFilterList } from "react-icons/md";
import { LuFileQuestion } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";

const TaskTable: React.FC = () => {
  return (
    <div className="w-full p-8 bg-white rounded-lg shadow-md font-Satoshi">
      <div className="flex justify-between items-center mb-4">
      <div className="relative w-1/3">
  <input
    type="text"
    placeholder="Search here..."
    className="p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-100"
  />
  <IoIosSearch className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"/>
        </div>

        <button className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md">
          <MdFilterList className="text-xl"/> <span className="mr-2 font-medium">Filter</span>
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
          {TableData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full">
                  <LuFileQuestion className="text-xl"/>
                  </div>
                  <div className="ml-2">
                    <div className="font-medium text-gray-800">{data.title}</div>
                    <div className="text-gray-400 text-xs">{data.size}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">{data.type}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-xs rounded-md ${data.statusColor}`}
                >
                  {data.status}
                </span>
              </td>
              <td className="px-4 py-2">{data.deadline}</td>
              <td className="px-4 py-2">{data.payout}</td>
              <td className="px-4 py-2"><HiDotsVertical /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
