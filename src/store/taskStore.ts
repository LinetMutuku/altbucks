
import api from '@/lib/api';
import { create } from 'zustand';

interface Task {
    _id: string;
    title: string;
    description: string;
    category: string;
    compensation: {
        currency: string;
        amount: number;
    };
    deadline: string;
    posted: string;
}

interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('api/v1/tasks/');
            if (!response) throw new Error('Failed to fetch tasks');
            const data = await response.data;
            set({ tasks: data.data || data, isLoading: false });
        } catch (error) {
            console.error('Fetch error:', error);
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    deleteTask: async (taskId: string) => {
        try {
            const response = await api.delete(`/tasks/delete/${taskId}`);

            if (!response) throw new Error('Failed to delete task');

            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== taskId)
            }));
        } catch (error) {
            console.error('Delete error:', error);
            set({ error: (error as Error).message });
            throw error;
        }
    }
}));
