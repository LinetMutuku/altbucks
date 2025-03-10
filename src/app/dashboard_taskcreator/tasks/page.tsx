"use client";
import Header from '@/app/components/Task_Creator_Dashboard/Header'
import TasksCreatorTasksRecentPosts from '@/app/components/Task_Creator_Dashboard/TaskCreator-Tasks-RecentPosts'
import TaskCreatorTasksTaskList from '@/app/components/Task_Creator_Dashboard/TaskCreator-Tasks-TaskList'
import { API_URL } from '@/lib/utils';
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import {useDropzone} from "react-dropzone"
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from 'react-toastify';


axios.defaults.withCredentials = true

interface Task{
  taskTitle:"",
  taskType:"",
  taskNumberofRespondent:"",
  taskDescription:"",
  taskLocation:"",
  taskCompensation:"",
  taskDeadline:"",
  taskRequirements:"",
  taskLinkUpload:"",
  taskLinkUploadTwo:"",
  _id: ""
}

export default function page() {
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [taskDetails, setTaskDetails ] = useState(false) ;
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})  
  const [newTask, setNewTask] = useState({
    taskTitle:"",
    taskType:"",
    taskNumberofRespondent:"",
    taskDescription:"",
    taskLocation:"",
    taskCompensation:"",
    taskDeadline:"",
    taskRequirements:"",
    taskLinkUpload:"",
    taskLinkUploadTwo:"",
  })

  const [taskInfo, setTaskInfo] = useState<Task | null>(null)  
  const [updateTaskInfo, setUpdateTaskInfo] = useState<Task | null>(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try{
      const response = await axios.post(`${API_URL}/tasks/create-task`, newTask, {withCredentials:true, headers: { "Content-Type": "multipart/form-data" }});
      console.log(response.data);
      toast.success("Task successfully created!")
      window.location.reload();
    }catch(err){
      console.log(err)
      toast.warn("Task creation unsuccessful!")
    }  
  }


//   const handleUpdateTaskInfo = async (id:any) => {
//     const response = await axios.post(`${API_URL}/tasks/update-task/${id}`, taskInfo, {withCredentials:true, headers:{"Content-Type":"multipart/form-data"}});
//     toast.success("Task updated successfully")
// }
 
  return (
    <div className='relative z-10 h-fit flex flex-col gap-2 overflow-hidden'>
      <Header />
      <div className='flex flex-col gap-5 justify-between w-[85%] mx-auto mt-10'>
        <TasksCreatorTasksRecentPosts 
          taskInfo={taskInfo} setTaskInfo={setTaskInfo}
          taskDetails={taskDetails} setTaskDetails={setTaskDetails} 
          newTaskModal={newTaskModal} setNewTaskModal={setNewTaskModal} 
          updateTaskModal={updateTaskModal} setUpdateTaskModal={setUpdateTaskModal}
          updateTaskInfo={updateTaskInfo} setUpdateTaskInfo={setUpdateTaskInfo}
        />
        <TaskCreatorTasksTaskList/>
      </div>
      {
        newTaskModal &&
        <div
          className='w-screen absolute z-30 top-0 left-0 right-0 h-screen bg-black opacity-95'
        >
          <form onSubmit={handleSubmit} className='bg-white rounded-lg p-8 h-[600px] overflow-y-scroll flex flex-col gap-4 w-[50%] mx-auto absolute top-[5%] left-[25%]'>
            <div className='w-fit flex items-center gap-4 cursor-pointer h-fit' onClick={() => setNewTaskModal(!newTaskModal)}>
              <FaArrowLeft className='' size={20}/>
              <p className='text-sm font-light'>Back</p>
            </div>
            <h3 className='font-bold text-xl mt-8'>Create a New Task</h3>
            <p className='text-sm text-gray-500'>Fill in the details blow to post your task and connect with the best professionals</p>
            <div className='w-full flex justify-between'>
              
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Task Title</h3>
                <input placeholder='Enter a descriptive title for your task...' 
                  className='text-xs border border-gray-300 px-4 py-2 rounded-md'
                  onChange={(e) => setNewTask({
                    ...newTask, taskTitle:e.target.value
                  })}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Task Type</h3>
                <input placeholder='Enter a descriptive title for your task...' 
                  className='text-xs border border-gray-300 px-4 py-2 rounded-md'
                  onChange={(e) => setNewTask({
                    ...newTask, taskType:e.target.value
                  })}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>No of Respondents</h3>
                <input placeholder='0 - 20' 
                  className='text-xs  border border-gray-300 px-4 py-2 rounded-md'
                  onChange={(e) => setNewTask({
                    ...newTask, taskNumberofRespondent:e.target.value
                  })}
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-sm font-semibold'>Task Description</h3>
              <textarea 
                className='w-full h-[250px] rounded-md border border-gray-300 p-4' 
                placeholder='Provide a  detaled description of the task, including specific requirements...'
                onChange={(e) => setNewTask({
                  ...newTask, taskDescription:e.target.value
                })}
              >
              </textarea>
            </div>

            <div className='w-full flex justify-between'>
              
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Location Preference (Optional)</h3>
                <input placeholder='Select Your Location' 
                  className='text-xs border border-gray-300 px-4 py-2 rounded-md'
                  onChange={(e) => setNewTask({
                    ...newTask, taskLocation:e.target.value
                  })}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Compensation</h3>
                <input placeholder='Ener Amount' 
                  className='text-xs border border-gray-300 px-4 py-2 rounded-md'
                  onChange={(e) => setNewTask({
                    ...newTask, taskCompensation:e.target.value
                  })}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Task Deadline</h3>
                <input placeholder='00/00/0000' 
                  className='text-xs border border-gray-300 px-4 py-2 rounded-md'
                  onChange={(e) => setNewTask({
                    ...newTask, taskDeadline:e.target.value
                  })}
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-sm font-semibold'>Task Requirements</h3>
              <textarea 
                className='w-full h-[250px] rounded-md border border-gray-300 p-4 text-sm' 
                placeholder='Provide a  detaled description of the task, including specific requirements...'
                onChange={(e) => setNewTask({
                  ...newTask, taskRequirements:e.target.value
                })}
              >
              </textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-sm font-semibold'>Additional Information Upload(Optional)</h3>
              <div className='w-full h-[250px] flex items-center justify-center border border-gray-300 rounded-md' {...getRootProps()}>
                <input {...getInputProps()}/>
                {
                  isDragActive ?
                      <p>Drag 'n' Drop some files here, or click to select files</p>
                    :
                      <div className='flex flex-col gap-3 '>
                        <p className='text-sm text-gray-400'><span className='text-blue-400'>Upload a file</span> or drag and drop</p>
                        <p className='text-sm text-gray-400'>PNG, JPG, GIF up to 5MB</p>
                      </div>
                }
              </div>
            </div>

            <p className='w-full text-center text-gray-300'>________________________________ {" "} OR {" "} _____________________________________________</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-1'>
                <h4>Link Uploads (1)</h4>
                <input placeholder='Add file URL' 
                  className='text-xs border border-gray-300 px-4 py-2 rounded-md'
                  onChange={(e) => setNewTask({
                    ...newTask, taskLinkUpload:e.target.value
                  })}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <h4>Link Uploads (2)</h4>
                <input placeholder='Add file URL' 
                  className='text-xs border border-gray-300 px-4 py-2 rounded-md'
                  onChange={(e) => setNewTask({
                    ...newTask, taskLinkUploadTwo:e.target.value
                  })}
                />
              </div>

            </div>

            <div className='w-full h-fit '>
              <button type='submit' 
                className='text-white bg-blue-500 h-[40px] w-full rounded-md text-sm'

    
              >Create Task</button>
            </div>
          </form>
        </div>
      }  
      {
        updateTaskModal &&
        <div className='w-screen absolute z-30 top-0 left-0 right-0 h-screen bg-black opacity-95'>
          <form className='bg-white rounded-lg p-8 h-[600px] overflow-y-scroll flex flex-col gap-4 w-[50%] mx-auto absolute top-[5%] left-[25%]'>
            <div className='w-fit flex items-center gap-4 cursor-pointer h-fit' onClick={() => setUpdateTaskModal(!updateTaskModal)}>
              <FaArrowLeft className='' size={20}/>
              <p className='text-sm font-light'>Back</p>
            </div>
            <h3 className='font-semibold text-xl mt-8'>Update Task</h3>
            <p className='text-sm text-gray-500'>Fill in the details blow to post your task and connect with the best professionals</p>
            <div className='w-full flex justify-between'>
              
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Task Title</h3>
                <input 
                  placeholder='Enter a descriptive title for your task...' className='text-xs border border-gray-300 px-4 py-2 rounded-md'/>
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Task Title</h3>
                <input placeholder='Enter a descriptive title for your task...' className='text-xs border border-gray-300 px-4 py-2 rounded-md'/>
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Task Title</h3>
                <input placeholder='0 - 20' className='text-xs border border-gray-300 px-4 py-2 rounded-md'/>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-sm font-semibold'>Task Description</h3>
              <textarea 
                className='w-full h-[250px] rounded-md border border-gray-300 p-4' 
                placeholder='Provide a  detaled description of the task, including specific requirements...'
              >
              </textarea>
            </div>

            <div className='w-full flex justify-between'>
              
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Location Preference (Optional)</h3>
                <input placeholder='Select Your Location' className='text-xs border border-gray-300 px-4 py-2 rounded-md'/>
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Compensation</h3>
                <input placeholder='Ener Amount' className='text-xs border border-gray-300 px-4 py-2 rounded-md'/>
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-sm font-semibold'>Task Deadline</h3>
                <input placeholder='00/00/0000' className='text-xs border border-gray-300 px-4 py-2 rounded-md'/>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-sm font-semibold'>Task Requirements</h3>
              <textarea 
                className='w-full h-[250px] rounded-md border border-gray-300 p-4 text-sm' 
                placeholder='Provide a  detaled description of the task, including specific requirements...'
              >
              </textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-sm font-semibold'>Additional Information Upload(Optional)</h3>
              <div className='w-full h-[250px] flex items-center justify-center border border-gray-300 rounded-md' {...getRootProps()}>
                <input {...getInputProps()}/>
                {
                  isDragActive ?
                      <p>Drag 'n' Drop some files here, or click to select files</p>
                    :
                      <div className='flex flex-col gap-3 '>
                        <p className='text-sm text-gray-400'><span className='text-blue-400'>Upload a file</span> or drag and drop</p>
                        <p className='text-sm text-gray-400'>PNG, JPG, GIF up to 5MB</p>
                      </div>
                }
              </div>
            </div>

            <p className='w-full text-center text-gray-300'>________________________________ {" "} OR {" "} _____________________________________________</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-1'>
                <h4>Link Uploads (1)</h4>
                <input placeholder='Add file URL' className='text-xs border border-gray-300 px-4 py-2 rounded-md'/>
              </div>
              <div className='flex flex-col gap-1'>
                <h4>Link Uploads (2)</h4>
                <input placeholder='Add file URL' className='text-xs border border-gray-300 px-4 py-2 rounded-md'/>
              </div>
            </div>

            <div className='w-full h-fit '>
              <button className='text-white bg-blue-500 h-[40px] w-full rounded-md text-sm'>Update Task</button>
            </div>
          </form>
        </div>
      }  

      {
        taskDetails &&
        <div className='w-screen absolute z-30 top-0 left-0 right-0 h-full bg-black opacity-95'>
          <div className='bg-white rounded-lg p-8 h-fit flex flex-col gap-4 w-[50%] mx-auto absolute top-[5%] left-[25%]'>
            <div className='w-fit flex items-center gap-4 cursor-pointer h-fit' onClick={() => setTaskDetails(!taskDetails)}>
              <FaArrowLeft className='' size={20}/>
              <p className='text-sm font-light'>Back</p>
            </div>
            <h3 className='font-semibold text-xl mt-8 text-blue-500'>{taskInfo?.taskTitle}</h3>

            <p className='text-gray-400 text-sm'><span className='text-sm text-black font-semibold'>Task Type: </span> {taskInfo?.taskType}</p>
            <p className='text-gray-400 text-sm'><span className='text-sm text-black font-semibold'>Compensation: </span> ${taskInfo?.taskCompensation}</p>
            <p className='text-gray-400 text-sm'><span className='text-sm text-black font-semibold'>Deadline: </span> Oct 28, 2024</p>

            <div className='flex flex-col gap-2'>
              <p className='text-sm font-semibold text-black'>Description</p>
              <p className='text-sm text-gray-400'>
                {taskInfo?.taskDescription}
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm font-semibold text-black'>Task Requirements</p>
              <p className='text-sm font-medium text-black'>Instructions</p>
              <ul className='flex flex-col gap-2 text-sm text-gray-400'>
                <li>{taskInfo?.taskRequirements}</li>
              </ul>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-sm font-semibold text-black'>Criteria for Completion:</p>
              <ul className='flex flex-col gap-2 text-sm text-gray-400'>
                <li>{taskInfo?.taskRequirements}</li>
              </ul>
            </div>  

            <div className='flex items-center gap-6'>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm'>Video link</p>
                <p className='text-sm text-blue-500 cursor-pointer'>{taskInfo?.taskLinkUpload}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm'>Video link</p>
                <p className='text-sm text-blue-500 cursor-pointer'>{taskInfo?.taskLinkUploadTwo}</p>
              </div>
            </div>
          </div>
        </div>
      } 

    </div>
  )
}
