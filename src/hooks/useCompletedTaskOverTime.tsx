import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/lib/utils";

interface TaskOverTimeData {
  date: string;
  count: number;
}

const useCompletedTasksOverTime = (range: string) => {
  const [data, setData] = useState<TaskOverTimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `${API_URL}/api/v1/analytics/tasks-over-time?range=${range}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            signal: controller.signal
          }
        );

        setData(response.data.data);
      } catch (err: unknown) {
        if (!axios.isCancel(err)) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || err.message);
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      controller.abort();
    };
  }, [range]);

  return { data, loading, error };
};

export default useCompletedTasksOverTime;