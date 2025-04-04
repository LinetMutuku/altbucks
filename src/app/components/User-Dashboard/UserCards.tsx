import React from 'react';
import { IoBagHandleOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

interface OverviewData {
  cancelledTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  profileCompletion: string;
  totalEarnings: number;
}

interface Props {
  overviewData: OverviewData | null;
}

const UserCards: React.FC<Props> = ({ overviewData }) => {
  return (
    <div className="bg-white w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 rounded-lg text-black border-2 border-transparent">
      <div className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg border-[1px] border-solid border-black-200">
        <div className="flex-shrink-0 w-fit p-3 h-fit bg-gray-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
          <IoBagHandleOutline color='blue' size={30} />
        </div>
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-sm font-extralight text-gray-400">Amount Earned</h2>
          <p className="text-3xl max-lg:text-base font-semibold tracking-wide">
            ${overviewData?.totalEarnings ?? 0}
          </p>
        </div>
      </div>

      <div className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg border-[1px] border-solid border-black-200">
        <div className="flex-shrink-0 w-fit p-3 h-fit bg-green-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
          <CiBookmark color='green' size={30} />
        </div>
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-sm font-extralight text-gray-400">Work In Progress</h2>
          <p className="text-3xl max-lg:text-base font-semibold tracking-wide">
            {overviewData?.inProgressTasks ?? 0}
          </p>
        </div>
      </div>

      <div className="flex px-8 py-10 sm:flex-row flex-col items-center sm:items-start w-full sm:w-[30%] bg-white p-4 rounded-lg border-[1px] border-solid border-black-200">
        <div className="flex-shrink-0 w-fit p-3 h-fit bg-purple-100 rounded-lg sm:mr-4 mb-2 sm:mb-0">
          <CgProfile color='purple' size={30} />
        </div>
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-sm font-extralight text-gray-400">Task Completed</h2>
          <p className="text-3xl max-lg:text-base font-semibold tracking-wide">
            {overviewData?.completedTasks ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
