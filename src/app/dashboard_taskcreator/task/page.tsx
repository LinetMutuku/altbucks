"use client"
import React, { useState } from 'react';
import RecentTasks from '@/app/components/Tasks_Components/RecentTasks';
import TaskTable from '@/app/components/Tasks_Components/Table';
import CreateTaskForm from '@/app/components/Tasks_Components/CreateTaskForm';
import { Sparkles, PlusCircle } from 'lucide-react';
import Header from '@/app/components/Task_Creator_Dashboard/Header';

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
                    {/* Responsive gradient backgrounds */}
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70" />
                    <div className="absolute -top-4 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
                    <div className="absolute -top-4 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

                    <div className="relative px-4 sm:px-6 py-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-3">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                </div>
                                <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                                    Recent Posts
                                </h1>
                            </div>

                            <button
                                onClick={openForm}
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-full
                                         bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600
                                         text-white font-medium tracking-wide text-sm sm:text-base
                                         shadow-lg shadow-blue-500/30
                                         hover:shadow-blue-500/50 hover:scale-[1.02]
                                         active:scale-[0.98]
                                         before:absolute before:inset-0
                                         before:bg-gradient-to-r before:from-white/20 before:via-white/20 before:to-transparent
                                         before:translate-x-[-100%] before:transition-transform before:duration-500
                                         hover:before:translate-x-[100%]
                                         transition-all duration-300 ease-out
                                         overflow-hidden"
                            >
                                <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
                                <span>Create Task</span>
                                <div className="absolute inset-0 ring-2 ring-white/20 rounded-full"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Tasks Card */}
                <div className="px-4 sm:px-8 pb-6 sm:pb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                        <RecentTasks />
                    </div>
                </div>

                {/* Task List Section */}
                <div className="px-4 sm:px-8 pb-6 sm:pb-8">
                    <div className="relative">
                        {/* Responsive gradient backgrounds */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70" />
                        <div className="absolute -top-4 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
                        <div className="absolute -top-4 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

                        <div className="relative px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                                    Task List
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                        <TaskTable />
                    </div>
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