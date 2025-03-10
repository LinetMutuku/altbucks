"use client"
import { post_data } from '@/lib/data'
import React, { useEffect, useState } from 'react'
import TaskCreatorTasksTaskCard from './TaskCreator-Tasks-TaskCard'
import axios from 'axios'
import { API_URL } from '@/lib/utils'

interface Task {
    _id: string;
    title: string;
    description: string;
}

type Tasks = Task[]



export default function TasksCreatorTasksRecentPosts({newTaskModal, setNewTaskModal,  updateTaskModal,setUpdateTaskModal, taskDetails, setTaskDetails, setTaskInfo, taskInfo, updateTaskInfo, setUpdateTaskInfo}:any) {
    const [userTasks, setUserTasks] = useState<Tasks | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUserTasks = async ()=> {
        setLoading(true)
        const response = await axios.get(`${API_URL}/tasks/tasks/user`, {withCredentials:true})
        setUserTasks(response.data.userTasks);
        setLoading(false)
    }
    useEffect(() => {
        handleUserTasks()
    }, [])

  return (
    <div className='flex w-full flex-col gap-5'>
        <div className='w-full flex items-center justify-between '>      
            <div className='w-fit h-fit'>
                <h3 className='text-xl font-bold'>Recent Posts</h3>
            </div>

            <div className='w-fit h-fit'>
                <button  
                    onClick={() => setNewTaskModal(!newTaskModal)}
                    className='w-fit h-fit px-8 py-3 bg-blue-500 text-sm text-white rounded-md shadow-lg hover:bg-blue-600 transition-all duration-500'>Create a Task</button>
            </div>        
        </div>

        <div className='w-full flex flex-wrap justify-start gap-8 mt-8'>
            
            {
                userTasks?.length === 0 ? <p>You don't have a task posted yet!</p> :
                userTasks?.map((post) => {
                    return (
                        <TaskCreatorTasksTaskCard setTaskInfo={setTaskInfo} taskInfo={taskInfo} 
                            taskDetails={taskDetails} setTaskDetails={setTaskDetails} 
                            updateTaskModal={updateTaskModal} setUpdateTaskModal={setUpdateTaskModal} 
                            post={post} key={post?._id} updateTaskInfo={updateTaskInfo} setUpdateTaskInfo={setUpdateTaskInfo}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}
