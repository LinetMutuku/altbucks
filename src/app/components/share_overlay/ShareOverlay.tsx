"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Check, X } from "lucide-react";
import { API_URL } from "@/lib/utils";

interface ReferralInviteProps {
  referralLink: string;
  isOpen: boolean;
  onClose: () => void;
}

interface InvitedUser {
  name: string;
  email: string;
  status: string;
}

const ReferralInvite: React.FC<ReferralInviteProps> = ({ referralLink, isOpen, onClose}) => {
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

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
      const response = await fetch(`${API_URL}/api/v1/referrals/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch invited users.");
      }

      const data = await response.json();
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

  console.log(invitedUsers)

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
      const response = await fetch(`${API_URL}/api/v1/referrals/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: inviteEmail }),
      });

      const result = await response.json();

      if (response.ok) {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);


  return (
    <div className="font-inter fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div ref={modalRef} className="grid font-jakarta grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-white rounded-xl h-[90%]  max-w-[80%] relative overflow-y-auto">
      {/* Left: Referral Link + QR Code */}
      <div className="border border-gray-300 rounded-l-3xl p-6">
        <h3 className="text-lg font-semibold text-black">Share your referral link</h3>
        <p className="text-gray-500 mt-1">Share your link to get more rewards.</p>
        
        <div className="mt-6">
        <label className="text-gray-900">Referral Link</label>
        <div className="flex items-center rounded-md mt-1">

          <input
            type="text"
            value={referralLink}
            readOnly
            className="border p-2 flex-1 focus:outline-none rounded-l-full bg-white text-gray-900"
          />

          <button
            onClick={handleCopy}
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-2 rounded-r-full border border-blue-600"
          >
            Copy
          </button>
        </div>
        </div>

        <div className="mt-4 text-center">
          <div className="flex justify-center items-center gap-2">
          <div className="border-b border-gray-400 w-28"></div>
          <p className="text-gray-800">Scan link to join</p>
          <div className="border-b border-gray-400 w-28"></div>
          </div>
          <div className="relative flex items-center justify-center p-4">
      
          <div className="absolute inset-0 border-[4px] w-40 h-40 mx-auto mt-2 border-transparent">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500 rounded-tl-2xl ml-auto"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-500 rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500 rounded-br-2xl"></div>
          </div>
          <QRCodeCanvas value={referralLink} size={130} className="mx-auto mt-2 border border-gray-400 rounded-lg p-1" />
          </div>
          <p className="text-gray-500 text-sm mt-2 w-56 mx-auto">
            Scan this code with your phone to open your dashboard in the app.
          </p>
        </div>
      </div>

      {/* Right: Invite People */}
      <div className="border border-gray-300 rounded-r-3xl p-6">
        <h3 className="text-lg font-semibold text-black">Invite people to your group</h3>
        <p className="text-gray-500 mt-1">We’ll email them instructions and a link to create an account.</p>

        {/* Invite by Email */}
        <div className="mt-6">
        <label className="text-gray-900">Invite email</label>
        <div className="flex items-center mt-1">
          
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email"
            className="border  p-2 flex-1 focus:outline-none placeholder-black placeholder-opacity-50 rounded-l-full bg-white text-gray-900"
          />

          <button
            onClick={sendInvite}
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-2 rounded-r-full border border-blue-600"
          >
            {loading ? "Sending..." : "Send invite"}
          </button>
        </div>
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
    </div>
  );
};

export default ReferralInvite;
