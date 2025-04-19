import { useState, useEffect } from "react";
import api from "@/lib/api";
import { API_URL } from "@/lib/utils";

const useTaskAnalytics = (selectedTab: number = 0, range: "1y" | "30d" | "7d" | "today" = "30d") => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getEndpoint = () => {
    switch (selectedTab) {
      case 0:
        return `${API_URL}/api/v1/analytics/popular-tasks`; 
      case 1:
        return `${API_URL}/api/v1/analytics/worker-engagement?range=${range}`;
      case 2:
        return `${API_URL}/api/v1/analytics/task-duration?range=${range}`;
      default:
        return `${API_URL}/api/v1/analytics/popular-tasks`; // Default to popular tasks
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        const endpoint = getEndpoint();
        if (!endpoint) throw new Error("Invalid API endpoint");

        const response = await api.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnalyticsData(response.data.data);
      } catch (err: any) {
        console.error("API Fetch Error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, range]);

  return { analyticsData, loading, error };
};

export default useTaskAnalytics;