"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Check, X } from "lucide-react";
import { API_URL } from "@/lib/utils";
import api from "@/lib/api";

interface ReferralInviteProps {
  referralLink: string;
  onClose: () => void;
}

interface InvitedUser {
  name: string;
  email: string;
  status: string;
}

const ReferralInvite: React.FC<ReferralInviteProps> = ({ referralLink, onClose }) => {
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem("authToken")); 
  }, []);

  useEffect(() => {
    if (token) fetchInvitedUsers();
  }, [token]);

  const fetchInvitedUsers = async () => {
    if (!token) return;

    
    setIsFetchingUsers(true);
    try {
      const response = await api.get(`${API_URL}/api/v1/referrals/`);

      if (!response) {
        throw new Error("Failed to fetch invited users.");
      }

      const data = response.data;
      if (Array.isArray(data?.data)) {
        setInvitedUsers(data.data);
      }else {
        setInvitedUsers([]);
      }
    } catch (error: any) {
      setMessage(error.message || "An error occurred.");
      setInvitedUsers([]);
    }
    setIsFetchingUsers(false);
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendInvite = async () => {
    if (!validateEmail(inviteEmail)) {
      setMessage("Please enter a valid email.");
      return;
    }

    if (!token) {
      setMessage("User not authenticated.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post(`${API_URL}/api/v1/referrals/invite`, {body: JSON.stringify({ email: inviteEmail }),
      });

      const result = await response.data;

      if (response) {
        setMessage("Invite sent successfully!");
        setInvitedUsers([...invitedUsers, { name: inviteEmail.split("@")[0], email: inviteEmail, status: "Invite sent" }]);
        setInviteEmail("");
      } else {
        setMessage(result.message || "Failed to send invite.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold">Share your referral link</h3>
        <p className="text-gray-500">Share your link to get more rewards.</p>

        <div className="flex items-center bg-gray-100 p-2 rounded-md mt-3">
          <input type="text" value={referralLink} readOnly className="bg-transparent flex-1 text-gray-700 px-2" />
          <button onClick={handleCopy} className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center">
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-500">Scan link to join</p>
          <QRCodeCanvas value={referralLink} size={120} className="mx-auto mt-2" />
          <p className="text-gray-500 text-sm mt-2">
            Scan this code with your phone to open your dashboard in the app.
          </p>
        </div>
      </div>

      {/* Right: Invite People */}
      <div className="border rounded-lg p-6">
        <button className="w-full flex justify-end text-red-600 hover:text-gray-800">
          <X size={24} onClick={onClose} />
        </button>
        <h3 className="text-lg font-semibold">Invite people to your group</h3>
        <p className="text-gray-500">We’ll email them instructions and a link to create an account.</p>

        {/* Invite by Email */}
        <div className="flex items-center mt-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email"
            className="border p-2 flex-1 rounded-md bg-white text-gray-900"
          />

          <button
            onClick={sendInvite}
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-2 rounded-md ml-2"
          >
            {loading ? "Sending..." : "Send invite"}
          </button>
        </div>

        {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}

        {/* Invited Users List */}
        <div className="mt-4">
          {isFetchingUsers ? (
            <p className="text-gray-500">Loading invited users...</p>
          ) : invitedUsers.length > 0 ? (
            invitedUsers.map((person, index) => (
              <div key={index} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.email}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-md text-xs ${
                    person.status === "Invite accepted"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {person.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No invitations sent yet.</p>
          )}
        </div>

        <p className="mt-4 text-gray-500 text-sm">
          <strong>{invitedUsers?.length || 0}</strong> People invited today so far <br />
          {(invitedUsers || []).filter((u) => u.status === "Invite accepted").length} invites have been accepted from your request
        </p>
      </div>
    </div>
  );
};

export default ReferralInvite;
