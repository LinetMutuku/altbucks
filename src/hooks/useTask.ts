import { useState, useEffect } from "react";
import api from "@/lib/api";

const useTasks = (page: number, pageSize: number) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(`/api/v1/tasks/all?page=${page}&limit=${pageSize}`);
        if (response.data && response.data.data) {
          setTasks(response.data.data);
          setTotalPages(response.data.pagination?.totalPages || 1);
        } else {
          setTasks([]);
          setTotalPages(1);
        }
      } catch (err) {
        setError("Failed to load tasks");
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [page, pageSize]);

  return { tasks, isLoading, error, totalPages };
};

export default useTasks;
