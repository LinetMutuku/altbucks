import { useState, useEffect } from "react";
import { API_URL } from "@/lib/utils";

interface WalletBalance {
  balance: number;
}

interface WalletDetails {
  id: string;
  owner: string;
  totalMoneyReceived: number;
  totalMoneyWithdrawn: number;
}

const useWallet = () => {
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve token from localStorage, Redux, or context
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (!token) {
      setError("Authorization token is missing.");
      setLoading(false);
      return;
    }

    const fetchWalletData = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [balanceRes, detailsRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/wallet-balance`, { method: "GET", headers }),
          fetch(`${API_URL}/api/v1/wallet`, { method: "GET", headers }),
        ]);

        if (!balanceRes.ok || !detailsRes.ok) {
          throw new Error("Failed to fetch wallet data.");
        }

        const balanceData = await balanceRes.json() as WalletBalance;
        const detailsData = await detailsRes.json() as WalletDetails;

        setWalletBalance(balanceData);
        setWalletDetails(detailsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [token]); // Re-fetch if token changes

  return { walletBalance, walletDetails, loading, error };
};

export default useWallet;
