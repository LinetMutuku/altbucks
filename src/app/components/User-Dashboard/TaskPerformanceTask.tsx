import React from 'react';
import { IoBagHandleOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

interface User{
  _id:number,
  firstName:string,
  email:string,
  lastName:string,
  phoneNumber:string,  
}

interface TaskPerformanceProps {
  analyticData?: any;
}


const TaskPerformanceTask: React.FC<TaskPerformanceProps> = ({ analyticData  }) => {
  return (
    <div
      className="bg-white w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 rounded-lg 
      text-black border-2 border-transparent  "
    >
      {/* Card 1 */}
      <div
        className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg 
            border-[1px] border-solid border-black-200 
            "
      >
        {/* Left: Image Icon */}
        <div className="flex-shrink-0 w-fit p-3 h-fit bg-gray-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
          <IoBagHandleOutline className='' color='blue' size={30} />
        </div>

        {/* Right: Title and Subtitle */}
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-sm font-extralight text-gray-400">
            Total Tasks Posted
          </h2>
          <p className="text-3xl max-lg:text-base font-semibold tracking-wide  ">
            {analyticData.totalTasksPosted}
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg border-[1px] border-solid border-black-200">
        {/* Left: Image Icon */}
        <div className="flex-shrink-0 w-fit p-3 h-fit bg-green-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
          <CiBookmark className='' color='green' size={30} />
        </div>

        {/* Right: Title and Subtitle */}
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-sm font-extralight text-gray-400">
          Total Budget
          </h2>
          <p className="text-3xl max-lg:text-base font-semibold tracking-wide  ">
          ${analyticData.totalBudget}
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg 
            border-[1px] border-solid border-black-200">
        {/* Left: Image Icon */}
        <div className="flex-shrink-0 w-fit p-3 h-fit bg-purple-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
          <CgProfile className='' color='purple' size={30} />
        </div>

        {/* Right: Title and Subtitle */}
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-sm font-extralight text-gray-400">
          Task Success Rate
          </h2>
          <p className="text-3xl max-lg:text-base font-semibold tracking-wide  ">
            {analyticData.taskSuccessRate}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskPerformanceTask;
