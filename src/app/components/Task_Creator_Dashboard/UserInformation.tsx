import React from 'react'
import { TiShoppingBag } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";

interface UserInformationProps {
    totalAmountSpent?: number;
    workInProgressTasks?: number;
    completedTasks?: number;
  }

const UserInformation: React.FC<UserInformationProps> = ({
    totalAmountSpent,
    workInProgressTasks,
    completedTasks,
}) => {
  return (
    <div className='w-full flex justify-between h-fit items-center '>
        <div className='flex w-fit gap-8 border border-gray-200 rounded-md px-12 py-8'>
            <div className='w-fit h-fit p-3 bg-gray-100 rounded-md'>
                <TiShoppingBag size={25} color='gray' />
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-gray-400 text-xs'>Amount Spent</p>
                <h2 className='text-gray-800 font-bold text-xl'>${totalAmountSpent?.toLocaleString()}</h2>
            </div>
        </div>

        <div className='flex w-fit gap-8 border border-gray-200 rounded-md px-12 py-8'>
            <div className='w-fit h-fit p-3 bg-green-100 rounded-md'>
                <CiBookmark size={25} color='green' />
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-gray-400 text-xs'>Work In Progress</p>
                <h2 className='text-gray-800 font-bold text-xl'>{workInProgressTasks}</h2>
            </div>
        </div>

        <div className='flex w-fit gap-8 border border-gray-200 rounded-md px-12 py-8'>
            <div className='w-fit h-fit p-3 bg-indigo-100 rounded-md'>
                <MdOutlinePersonOutline size={25} color='indigo' />
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-gray-400 text-xs'>Task Completed</p>
                <h2 className='text-gray-800 font-bold text-xl'>{completedTasks}</h2>
            </div>
        </div>       
    </div>
  )
}

export default UserInformation;