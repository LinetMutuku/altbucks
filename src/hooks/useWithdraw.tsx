'use client';

import api from '@/lib/api';
import { API_URL } from '@/lib/utils';
import { useState } from 'react';

const useWithdraw = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const withdraw = async (formData: Record<string, any>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post(`${API_URL}/api/v1/withdraw`, formData);

      if (response.status !== 200) {
        throw new Error(response.data?.message || 'Withdrawal failed. Please try again.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return { withdraw, loading, error, success };
};

export default useWithdraw;
