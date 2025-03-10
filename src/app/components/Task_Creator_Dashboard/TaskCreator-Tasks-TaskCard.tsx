"use client";
import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import moment from "moment"
import axios from 'axios';
import { API_URL } from '@/lib/utils';

export default function TaskCreatorTasksTaskCard({post, setUpdateTaskModal, updateTaskModal, taskDetails, setTaskDetails, setTaskInfo, taskInfo, updateTaskInfo, setUpdateTaskInfo}:any) {
    const [loading, setLoading] = useState(false)
    
    const deleteTaskByTaskId = async (id:any) => {
        setLoading(true)        
        const response = await axios.delete(`${API_URL}/tasks/delete-task/${id}`)
        setLoading(false);
        window.location.reload();
    }

    const handleTaskInfo = async (id:any) => {    
        const response = await axios.get(`${API_URL}/tasks/task/${id}`)
        setTaskInfo(response.data.task);
        setTaskDetails(!taskDetails);
    }

    const handleUpdateTaskInfo = async (id:any) => {
        const response = await axios.post(`${API_URL}/tasks/update-task/${id}`, )
    }

  return (
    <div className='w-[23%] bg-white flex flex-col gap-5 p-5 border border-gray-300 rounded-lg cursor-pointer shadow-xl' >
        <div className='w-full items-center flex justify-between border-b border-gray-300 pb-4'>
            <div className='flex flex-col gap-1'>
                <h4 className='text-sm text-black font-semibold'>{post.taskTitle}</h4>
                <p className='text-xs text-gray-400'>{post.taskType}</p>
            </div>
            <p className='text-xs text-gray-400'>Posted 3 hours ago</p>
        </div>

        <div className='flex items-center justify-center'>
            <p className='text-gray-400 text-xs'>{post.taskDescription}</p>
        </div>

        <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col gap-1'>
                <h4 className='text-xs text-gray-400'>Earnings</h4>
                <p className='text-black text-xs font-semibold'>${post.taskCompensation}</p>
            </div>

            <div className='flex flex-col gap-1'>
                <h4 className='text-xs text-gray-400'>Deadline</h4>
                <p className='text-black text-xs font-semibold'>{moment(post.createdAt).format("MMMM Do YYYY")}</p>
            </div>

            <div className='flex flex-col gap-1 text-xs text-blue-400 cursor-pointer' >
                <p className='flex gap-2 text-xs items-center' onClick={() => handleTaskInfo(post._id)}>
                    View Details
                    <IoIosArrowForward size={15} className='text-blue-500'/>
                </p>            
            </div>
        </div>

        <div className='flex items-center justify-start gap-4'>
            <p className='flex gap-2 text-xs items-center text-indigo-500' onClick={() => setUpdateTaskModal(!updateTaskModal)}>
                Update task Details
            </p>

            <p className='flex gap-2 text-xs items-center text-red-500' onClick={() => deleteTaskByTaskId(post._id)}>
                Delete Task
            </p>

        </div>
    </div>
  )
}

