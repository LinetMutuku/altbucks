import { useState, useEffect } from "react";
import api from "@/lib/api";

const useFilteredTasks = (filters: any, searchQuery: string, page: number, pageSize: number) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFilteredTasks = async () => {
      setIsLoading(true);
      setError(null);

      // Prepare search and filter payload
      const payload: Record<string, any> = {
        search: searchQuery.trim() || undefined,
        ...filters,
        page,
        limit: pageSize,
      };

      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined && value !== "" && value !== null)
      );

      try {
        const response = await api.post("/api/v1/tasks/search", cleanPayload);
        setTasks(response.data.data);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } catch (err) {
        setError("Failed to load filtered tasks");
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery || Object.keys(filters).length > 0) {
      fetchFilteredTasks();
    }
  }, [filters, searchQuery, page, pageSize]);

  return { tasks, isLoading, error, totalPages };
};

export default useFilteredTasks;
