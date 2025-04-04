import { useState, useCallback } from "react";
import api from "@/lib/api"; 
import { toast } from "react-toastify";
import { API_URL } from "@/lib/utils";

export const usePaymentDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [paymentDetails, setPaymentDetails] = useState<any>(null); 

  // Fetch Payment Details
  const getPaymentDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`${API_URL}/api/v1/payment-details`);
      console.log("Response:", response.data);
      setPaymentDetails(response.data.paymentMethods);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch payment details."); // ✅ Now valid
    } finally {
      setLoading(false);
    }
  }, []);

  // Save Payment Details
  const savePaymentDetails = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`${API_URL}/api/v1/payment-details`, data);
      setPaymentDetails(response.data);
      toast.success("Payment details saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save payment details."); // ✅ Now valid
      toast.error("Error saving payment details.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    paymentDetails,
    getPaymentDetails,
    savePaymentDetails,
  };
};
