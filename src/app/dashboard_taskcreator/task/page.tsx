"use client"
import React, { useState } from 'react';
import RecentTasks from '@/app/components/Tasks_Components/RecentTasks';
import TaskTable from '@/app/components/Tasks_Components/Table';
import CreateTaskForm from '@/app/components/Tasks_Components/CreateTaskForm';
import { Sparkles, PlusCircle } from 'lucide-react';
import Header from '@/app/components/Tasks_Components/Header'

const Task: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-white font-Satoshi overflow-x-hidden">
                {/* Recent Posts Section */}
                <div className="relative">
                    <div className="flex justify-between items-center w-full p-8">
                        <p className='text-xl font-medium'>Recent Posts</p>
                            <button 
                            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                            onClick={openForm}
                            >
                            Create a Task
                            </button>
                    </div>
                </div>

                {/* Recent Tasks Card */}
                <div className="px-4 sm:px-8 pb-6 sm:pb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                        <RecentTasks />
                    </div>
                </div>

                {/* Task List Section */}
                <p className='text-xl w-full font-medium pt-8 pl-8'>Task List</p>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                        <TaskTable />
                    </div>

                {/* Create Task Form Modal - Full screen on mobile */}
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
                        <div className="w-full h-full sm:h-auto sm:max-w-2xl mx-auto sm:mt-20">
                            <CreateTaskForm onClose={closeForm} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Task;
// "use client"
// import Card from "@/app/components/Tasks_Components/Card";
// import { CardsData } from "@/app/components/Tasks_Components/CardsData";
// import React, { useState } from 'react'
// import Header from '@/app/components/Tasks_Components/Header'
// import TaskTable from '@/app/components/Tasks_Components/Table'
// import CreateTaskForm from '@/app/components/Tasks_Components/CreateTaskForm'

// const Task: React.FC = () => {
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const openForm = () => {
//       setIsFormOpen(true);
//     };
  
//     const closeForm = () => {
//       setIsFormOpen(false);
//     };
//   return (
//     <>
//       <Header />
//     <div className='bg-white font-Satoshi'>
//         <div className="flex justify-between items-center w-full p-8">
//             <p className='text-xl font-medium'>Recent Posts</p>
//             <button 
//             className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
//             onClick={openForm}
//             >
//                 Create a Task
//                 </button>
//         </div>
//       <div className="bg-white px-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {CardsData.map((card, index) => (
//           <Card key={index} {...card} />
//         ))}
//       </div>
//     </div>
//         <p className='text-xl w-full font-medium pt-8 pl-8'>Task List</p>
//         <TaskTable />
//               {/* Conditional rendering for modal */}
//       {isFormOpen && (
//         <div>
//           <CreateTaskForm onClose={closeForm} />
//         </div>
//       )}
//     </div>
//     </>
//   )
// }
// export default Task;