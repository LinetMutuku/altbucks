// PopularTaskTable.tsx
import React from 'react';

interface PopularTaskTableProps {
  popularTasks: { 
    _id: string; 
    posted: number; 
    completed: number; 
    averageDuration: string; 
    engagementPercentage: number; 
    accepted: number;
    color: string
   }[] | null;
}

const PopularTaskTable: React.FC<PopularTaskTableProps> = ({ popularTasks }) => {
  if (!popularTasks) {
    return <p>No popular tasks available.</p>;
  }

console.log("pop", popularTasks)
  return (
    <div className="block p-6 w-full overflow-x-auto border rounded-lg">
      <table className="w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Task</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Posted</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Completed</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Average Duration</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Engagement</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase">Accepted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {popularTasks.map((task, index) => (
            <tr key={index} className="text-gray-500">
              <th className="border-t-0 px-4 py-4 text-sm font-normal text-left">{task._id}</th>
              <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">{task.posted}</td>
              <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">{task.completed}</td>
              <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">{task.averageDuration}</td>
              <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">
                <div className="flex items-center">
                  <span className="mr-2">{task.engagementPercentage}%</span>
                  <div className="relative w-full">
                    <div className="w-full bg-gray-200 rounded-sm h-2">
                      <div className="h-2 rounded-sm" style={{ width: `${task.engagementPercentage}%`, backgroundColor: "green" }}></div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="border-t-0 px-4 py-4 text-xs font-medium text-gray-900">{task.accepted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PopularTaskTable;
