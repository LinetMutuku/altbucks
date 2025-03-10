import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";


export default function FeaturedTask() {
  return (
    <div className='flex flex-col gap-4'>
        <h2 className="text-2xl font-bold ">Featured Task</h2>
        <div className="flex flex-col gap-8 border border-gray-200 px-10 py-12 rounded-lg">            
            <div className='w-full flex items-center justify-between'>            
                <div className='flex flex-col gap-2'>
                    <h3 className='text-xl font-semibold'>Tasks Activities</h3>
                    <p className='text-sm text-gray-400'>Complete the tasks below to improve yor rating</p>
                </div>

                <div className='flex items-center gap-3'>
                    <p className='text-blue-500 text-sm'>Go to Task Page</p>
                    <IoIosArrowForward size={15} className='text-blue-500'/>
                </div>
            </div>
            <table className=''>                
                <tbody className='flex flex-col gap-6 w-full'>
                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td className='w-fit h-fit p-1 px-3 gap-2 bg-[#FEE2E2] flex items-center rounded-xl'><GoDotFill className='text-[#EF4444] ' size={15}/>Cancelled</td>
                        <td className='text-base font-semibold'>Survey</td>
                        <td>
                            <div className='flex flex-col gap-2'>
                                <h4 className='text-sm font-semibold'>$10.04</h4>
                                <p className='text-sm font-extralight'>Oct 15, 2024</p>
                            </div>
                        </td>
                        <td className='text-sm text-gray-400'>Facebook</td>
                        <td>...</td>
                    </tr>

                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td className='w-fit h-fit p-1 px-3 gap-2 bg-[#FEF9C3] flex items-center rounded-xl'><GoDotFill className='text-[#FACC15]' size={15}/>Pending</td>
                        <td className='text-base font-semibold'>Writing</td>
                        <td>
                            <div className='flex flex-col gap-2'>
                                <h4 className='text-sm font-semibold'>$99.00</h4>
                                <p className='text-sm font-extralight'>Jan 17, 2022</p>
                            </div>
                        </td>
                        <td className='text-sm text-gray-400'>Facebook</td>
                        <td>...</td>
                    </tr>

                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td className='w-fit h-fit p-1 px-3 gap-2 bg-[#FEF9C3] flex items-center rounded-xl'><GoDotFill className='text-[#FACC15]' size={15}/>Pending</td>
                        <td className='text-base font-semibold'>Video review</td>
                        <td>
                            <div className='flex flex-col gap-2'>
                                <h4 className='text-sm font-semibold'>$249.94</h4>
                                <p className='text-sm font-extralight'>Jan 17, 2022</p>
                            </div>
                        </td>
                        <td className='text-sm text-gray-400'>Netflix</td>
                        <td>...</td>
                    </tr>


                    <tr className='border-b border-gray-300 w-full flex justify-between'>
                        <td className='w-fit h-fit p-1 px-3 gap-2 bg-[#FEE2E2] flex items-center rounded-xl'><GoDotFill className='text-[#EF4444] ' size={15}/>Cancelled</td>
                        <td className='text-base font-semibold'>Writing</td>
                        <td>
                            <div className='flex flex-col gap-2'>
                                <h4 className='text-sm font-semibold'>$199.24</h4>
                                <p className='text-sm font-extralight'>Jan 17, 2022</p>
                            </div>
                        </td>
                        <td className='text-sm text-gray-400'>Amazon Prime</td>
                        <td>...</td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
  )
}
