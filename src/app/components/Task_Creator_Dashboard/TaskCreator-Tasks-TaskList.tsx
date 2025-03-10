import React from 'react'
import { GoDotFill } from 'react-icons/go'
import { IoFilterOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";


export default function TaskCreatorTasksTaskList() {

  return (
    <div className='flex flex-col gap-5 py-12 cursor-pointer' >
          <h2 className='text-2xl font-bold'>Task List</h2>      
          <div className='w-full flex flex-col gap-5 border-gray-300 border p-6 rounded-lg'>
            <div className='w-full flex items-center justify-between'>
                <div className='w-fit h-fit relative'>
                    <CiSearch size={15} className='text-gray-500 absolute top-[30%] left-2'/>
                    <input type="text" placeholder='Search here...' className='w-[300px] px-8 h-[35px] text-xs border-gray-300 bg-white border rounded-md' />
                </div>
                <button className='h-fit w-fit text-sm flex items-center gap-3 text-gray-900 font-semibold rounded-md px-4 py-1 border border-gray-400'><IoFilterOutline size={15} className='text-gray-400'/> Filter</button>
            </div>

            <table className='flex flex-col gap-4'> 
                <thead className='w-full'>
                    <tr className='flex w-full justify-between'>
                        <td className='text-sm font-semibold text-gray-500'>Task Name</td>
                        <td className='text-sm font-semibold text-gray-500'>Task Type</td>
                        <td className='text-sm font-semibold text-gray-500'>Status</td>
                        <td className='text-sm font-semibold text-gray-500'>Deadline</td>
                        <td className='text-sm font-semibold text-gray-500'>Payout</td>
                    </tr>
                </thead>               
                <tbody className='flex flex-col gap-6 w-full'>
                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-xs font-semibold'>Carry out survey</h4>
                                <p className='text-xs text-gray-500 '>200KB</p>
                            </div>
                        </td>

                        <td className='text-xs font-semibold text-gray-500 '>
                            Writing
                        </td>
                        <td className='text-xs font-semibold text-green-500 w-fit h-fit bg-green-100 rounded-md px-4 py-1'>Completed</td>
                        <td className='text-xs font-semibold text-gray-500 '>Oct 14, 2024</td>
                        <td className='text-xs font-semibold text-gray-500 '>$2,500.00</td>
                    </tr>

                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-xs font-semibold'>Carry out survey</h4>
                                <p className='text-xs text-gray-500 '>200KB</p>
                            </div>
                        </td>

                        <td className='text-xs font-semibold text-gray-500 '>
                            Writing
                        </td>
                        <td className='text-xs font-semibold text-gray-500 w-fit h-fit bg-gray-100 rounded-md px-4 py-1'>In Progress</td>
                        <td className='text-xs font-semibold text-gray-500 '>Oct 14, 2024</td>
                        <td className='text-xs font-semibold text-gray-500 '>$2,500.00</td>
                    </tr>

                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-xs font-semibold'>Carry out survey</h4>
                                <p className='text-xs text-gray-500 '>200KB</p>
                            </div>
                        </td>

                        <td className='text-xs font-semibold text-gray-500 '>
                            Writing
                        </td>
                        <td className='text-xs font-semibold text-green-500 w-fit h-fit bg-green-100 rounded-md px-4 py-1'>Completed</td>
                        <td className='text-xs font-semibold text-gray-500 '>Oct 14, 2024</td>
                        <td className='text-xs font-semibold text-gray-500 '>$2,500.00</td>
                    </tr>

                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-xs font-semibold'>Carry out survey</h4>
                                <p className='text-xs text-gray-500 '>200KB</p>
                            </div>
                        </td>

                        <td className='text-xs font-semibold text-gray-500 '>
                            Writing
                        </td>
                        <td className='text-xs font-semibold text-yellow-500 w-fit h-fit bg-yellow-100 rounded-md px-4 py-1'>Pending</td>
                        <td className='text-xs font-semibold text-gray-500 '>Oct 14, 2024</td>
                        <td className='text-xs font-semibold text-gray-500 '>$2,500.00</td>
                    </tr>

                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-xs font-semibold'>Carry out survey</h4>
                                <p className='text-xs text-gray-500 '>200KB</p>
                            </div>
                        </td>

                        <td className='text-xs font-semibold text-gray-500 '>
                            Writing
                        </td>
                        <td className='text-xs font-semibold text-green-500 w-fit h-fit bg-green-100 rounded-md px-4 py-1'>Completed</td>
                        <td className='text-xs font-semibold text-gray-500 '>Oct 14, 2024</td>
                        <td className='text-xs font-semibold text-gray-500 '>$2,500.00</td>
                    </tr>

                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-xs font-semibold'>Carry out survey</h4>
                                <p className='text-xs text-gray-500 '>200KB</p>
                            </div>
                        </td>

                        <td className='text-xs font-semibold text-gray-500 '>
                            Writing
                        </td>
                        <td className='text-xs font-semibold text-green-500 w-fit h-fit bg-green-100 rounded-md px-4 py-1'>Completed</td>
                        <td className='text-xs font-semibold text-gray-500 '>Oct 14, 2024</td>
                        <td className='text-xs font-semibold text-gray-500 '>$2,500.00</td>
                    </tr>
                </tbody>
            </table>
          </div>
    </div>
  )
}
