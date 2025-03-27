"use client"

import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useTaskStore } from "@/store/taskStore"
import api from "@/lib/api";

interface CreateTaskFormProps {
    onClose: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onClose }) => {
    const fetchTasks = useTaskStore(state => state.fetchTasks);
    const [title, setTitle] = useState("");
    const [taskType, setTaskType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [deadline, setDeadline] = useState("");
    const [requirements, setRequirements] = useState("");
    const [files, setFiles] = useState<File | null>(null);
    const [link1, setLink1] = useState("");
    const [link2, setLink2] = useState("");
    const [amount, setAmount] = useState<string>("");
    const [currency, setCurrency] = useState<string>("USD");
    const [noOfRespondents, setNoOfRespondents] = useState<string>("")
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error("Please enter a valid compensation amount.");
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("requirements", requirements);
        formData.append("description", description);
        formData.append("compensation", JSON.stringify({ currency, amount }));
        formData.append("noOfRespondents", noOfRespondents);
        formData.append("deadline", deadline);
        formData.append("link1", link1);
        formData.append("taskType", taskType);
        formData.append("location", location);
        formData.append("link2", link2);
        if (files) {
            formData.append("addInfo", files);
          }
   
        try {
            const response = await api.post("/api/v1/tasks", formData);
            if (!response) {
                throw new Error("Task creation failed");
            }
            const data = await response.data;
            toast.success("Task created successfully");
            await fetchTasks();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 font-Satoshi flex items-center justify-center z-50 px-4"
            onClick={handleBackdropClick}
        >
            <div className="max-w-2xl max-h-[90%] mx-auto bg-white shadow-lg rounded-lg p-8 overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}
            >
                {/* Back Button */}
                <div className="mb-4">
                    <button
                        className="text-black text-xs flex gap-1 items-center"
                        onClick={onClose}
                    >
                        <IoArrowBackOutline className="text-lg"/> Back
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl max-h-[90%] mx-auto bg-white rounded-lg overflow-auto space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-gray-800">Create a New Task</h2>
                    <p className="text-sm text-gray-500">
                        Fill in the details below to post your task and connect with the best professionals
                    </p>

                    {/* Task Title and Type */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">
                                Task Title
                            </label>
                            <input
                                type="text"
                                id="taskTitle"
                                placeholder="Enter a descriptive title for your task"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="taskType" className="block text-sm font-medium text-gray-700">
                                Task Type
                            </label>
                            <select
                                id="taskType"
                                className="mt-1 p-2 text-gray-500 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                                value={taskType}
                                onChange={(e) => setTaskType(e.target.value)}
                                required
                            >
                                <option value="">Choose Task Type</option>
                                <option value="Writing">Writing</option>
                                <option value="Web Development">Review</option>
                                <option value="Design">Delivery</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="numRespondents" className="block text-sm font-medium text-gray-700">
                                No of Respondents
                            </label>
                            <select
                                id="numRespondents"
                                className="mt-1 p-2 border border-gray-300 text-gray-500 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                                value={noOfRespondents}
                                onChange={(e) => setNoOfRespondents(e.target.value)}
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

                    {/* Task Description */}
                    <div>
                        <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
                            Task Description
                        </label>
                        <textarea
                            id="taskDescription"
                            placeholder="Provide a detailed description of the task, including specific requirements..."
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-28 focus:ring-blue-500 focus:border-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Location, Compensation, and Deadline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location Preference (Optional)
                            </label>
                            <select
                                id="location"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">Select Your Location</option>
                                <option value="Remote">Remote</option>
                                <option value="Onsite">On-site</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="compensation" className="block text-sm font-medium text-gray-700">
                                Compensation
                            </label>
                            <div className="flex items-center mt-1">
                                <span className="p-2 border border-gray-300 rounded-l-md bg-gray-100">$</span>
                                <input
                                    type="text"
                                    id="compensation"
                                    placeholder="Enter Amount"
                                    className="p-2 border-t border-b border-r border-gray-300 rounded-r-md w-full focus:ring-blue-500 focus:border-blue-500"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                                <select
                                    className="ml-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                                Task Deadline
                            </label>
                            <input
                                type="date"
                                id="deadline"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Task Requirements */}
                    <div>
                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                            Task Requirements
                        </label>
                        <textarea
                            id="requirements"
                            placeholder="Provide detailed instructions and criteria for completion"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-28 focus:ring-blue-500 focus:border-blue-500"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Additional Information Upload (Optional)
                        </label>
                        <div className="mt-2 border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
                            <input
                                type="file"
                                id="fileUpload"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".png, .jpg, .jpeg, .gif"
                            />
                            <label
                                htmlFor="fileUpload"
                                className="cursor-pointer text-blue-500 hover:underline"
                            >
                                {files ? files.name : "Upload a file or drag and drop"}
                            </label>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                        </div>
                        {files && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-700">Selected File:</p>
                                <p className="text-sm font-medium text-gray-900">{files.name}</p>
                            </div>
                        )}
                    </div>

                    {/* Link Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="link1" className="block text-sm font-medium text-gray-700">
                                Link Uploads (1)
                            </label>
                            <input
                                type="url"
                                id="link1"
                                placeholder="Add file URL"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                                value={link1}
                                onChange={(e) => setLink1(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="link2" className="block text-sm font-medium text-gray-700">
                                Link Uploads (2)
                            </label>
                            <input
                                type="url"
                                id="link2"
                                placeholder="Add file URL"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                                value={link2}
                                onChange={(e) => setLink2(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskForm;