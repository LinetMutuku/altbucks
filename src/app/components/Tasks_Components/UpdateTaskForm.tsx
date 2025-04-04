"use client";

import { API_URL } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface UpdateTaskFormProps {
    onClose: () => void;
    task: any;
    onUpdate?: (updatedTask: any) => void;
}

const UpdateTaskForm = ({ onClose, task, onUpdate }: UpdateTaskFormProps) => {
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    // Form state
    const [title, setTitle] = useState("");
    const [taskType, setTaskType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [deadline, setDeadline] = useState("");
    const [requirements, setRequirements] = useState("");
    const [files, setFiles] = useState<File | null>(null);
    const [link1, setLink1] = useState("");
    const [link2, setLink2] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState({USD: true, EUR: false});
    const [noOfRespondents, setNoOfRespondents] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load task details when task changes
    useEffect(() => {
        console.log("Task prop received:", task);
        console.log("Task ID:", task?._id);
        if (task) {
            setTitle(task.title || "");
            setTaskType(task.taskType || "");
            setDescription(task.description || "");
            setLocation(task.location || "");
            setDeadline(task.deadline || "");
            setRequirements(task.requirements || "");
            setLink1(task.link1 || "");
            setLink2(task.link2 || "");
            setAmount(task.compensation?.amount || "");
            setCurrency(task.compensation?.currency || "USD");
            setNoOfRespondents(task.noOfRespondents || "");
        }
    }, [task]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const taskId = task?._id || task?.id;
            console.log("Using task ID for update:", taskId);

            if (!taskId) {
                throw new Error("Task ID is required for updating");
            }

            const formData = new FormData();
            formData.append("title", title);
            formData.append("taskType", taskType);
            formData.append("description", description);
            formData.append("location", location);
            formData.append("deadline", deadline);
            formData.append("requirements", requirements);
            formData.append("link1", link1);
            formData.append("link2", link2);
            formData.append("amount", amount);
            formData.append("currency", currency);
            formData.append("noOfRespondents", noOfRespondents);
            if (files) {
                formData.append("files", files);
            }

            const response = await fetch(
                `${API_URL}/api/v1/tasks/update/${taskId}`,
                {
                    method: "PUT",
                    body: formData,
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || "Failed to update task");
            }

            const responseData = await response.json();
            console.log("Update successful:", responseData);

            const updatedTask = {
                ...task,
                title,
                taskType,
                description,
                location,
                deadline,
                requirements,
                link1,
                link2,
                compensation: {
                    amount: parseFloat(amount),
                    currency
                },
                noOfRespondents
            };

            if (typeof onUpdate === 'function') {
                try {
                    onUpdate(updatedTask);
                } catch (error) {
                    console.error("Error in onUpdate callback:", error);
                }
            }

            toast.success("Task updated successfully!");
            onClose();
        } catch (error: any) {
            console.error("Update task error:", error);
            setError(error.message || "Failed to update task");
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const modalContent = (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
            onClick={onClose}
        >
            <div
                className="w-full md:w-[90%] lg:w-[80%] xl:w-[60%] max-h-[90vh] mx-auto bg-white shadow-lg rounded-lg p-4 md:p-8 overflow-y-auto"
                onClick={stopPropagation}
            >
                {/* Back Button */}
                <div className="mb-4">
                    <button
                        className="text-black text-xs flex gap-1 items-center"
                        onClick={onClose}
                    >
                        <IoArrowBackOutline className="text-lg" /> Back
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Update Your Task</h2>
                    <p className="text-sm text-gray-500">Modify the details below and save changes.</p>

                    {/* Task Title and Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
                            <select
                                value={taskType}
                                onChange={(e) => setTaskType(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            >
                                <option value="">Choose Task Type</option>
                                <option value="writing">Writing</option>
                                <option value="review">Review</option>
                                <option value="delivery">Delivery</option>
                            </select>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">No of Respondents</label>
                            <select
                                value={noOfRespondents}
                                onChange={(e) => setNoOfRespondents(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            >
                                <option value="">0-5</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full h-28"
                            required
                        ></textarea>
                    </div>

                    {/* Location, Compensation, and Deadline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            >
                                <option value="">Select Location</option>
                                <option value="Remote">Remote</option>
                                <option value="Onsite">On-site</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Compensation</label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 flex">
                                    <span className="p-2 border border-gray-300 rounded-l-md bg-gray-100">$</span>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="p-2 border-t border-b border-r border-gray-300 rounded-r-md w-full"
                                        required
                                    />
                                </div>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md w-24"
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                        <textarea
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full h-28"
                            required
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link 1</label>
                            <input
                                type="url"
                                value={link1}
                                onChange={(e) => setLink1(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link 2</label>
                            <input
                                type="url"
                                value={link2}
                                onChange={(e) => setLink2(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        } text-white`}
                    >
                        {loading ? "Updating..." : "Update Task"}
                    </button>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default UpdateTaskForm;