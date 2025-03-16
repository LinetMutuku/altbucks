import React from "react";

type TaskCardProps = {
  title: string;
  company: string;
  type: string;
  earnings: string;
  appliedOn: string;
  deadline: string;
  status: "Completed" | "Pending" | "In Progress";
  description: string;
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  company,
  type,
  earnings,
  appliedOn,
  deadline,
  status,
  description,
}) => {
  return (
    <div className="bg-white flex flex-col gap-3 rounded-lg p-2 md:p-6 w-full border border-gray-200 font-satoshi">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-[#4C2909]">{company}</h3>
        <span
          className={`text-sm font-semibold ${
            status === "Completed" ? "text-[#14532D]" : "text-yellow-500"
          }`}
        >
          ● {status}
        </span>
      </div>
      <div>
      <h2 className="text-sm font-semibold text-[#1E1E1E] opacity-80">{title}</h2>
      <p className="text-black opacity-50 text-sm mb-2">{type}</p>
      </div>
      <div className="flex justify-between text-sm w-full md:w-1/2">
        <p className="flex flex-col text-[#1E1E1E]">
          <span className="font-medium opacity-50">Earnings:</span> <span className="font-semibold">{earnings}</span>
        </p>
        <p className="flex flex-col text-[#1E1E1E]">
          <span className="font-medium opacity-50">Applied On:</span> <span className="font-semibold">{appliedOn}</span>
        </p>
        
      <p className="flex flex-col text-red-600 font-medium text-sm">
        <span className="font-bold opacity-50">Deadline:</span> <span className="font-semibold">{deadline}</span>
      </p>
      </div>
      <p className="text-black opacity-50 text-sm mb-4">{description}</p>
      <div className="flex justify-end">
      <button className="px-3 py-1 md:px-6 md:py-2 border border-[#2877EA] text-[#2877EA] rounded-md transition">
        View Task
      </button>
      </div>
    </div>
  );
};

export default TaskCard;
