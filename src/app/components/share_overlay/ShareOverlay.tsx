"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Check, X } from "lucide-react";


interface ReferralInviteProps {
  referralLink: string;
  onClose: () => void;
}

const ReferralInvite: React.FC<ReferralInviteProps> = ({ referralLink, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-lg">
      {/* Left: Referral Link + QR Code */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold">Share your referral link</h3>
        <p className="text-gray-500">Share your link to get more rewards.</p>

        <div className="flex items-center bg-gray-100 p-2 rounded-md mt-3">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="bg-transparent flex-1 text-gray-700 px-2"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center"
          >
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
          <X size={24} onClick={onClose}/>
        </button>
        <h3 className="text-lg font-semibold">Invite people to your group</h3>
        <p className="text-gray-500">We’ll email them instructions and a link to create an account.</p>

        <div className="flex items-center mt-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email"
            className="border p-2 flex-1 rounded-md"
          />
          <button className="bg-blue-600 text-white px-3 py-2 rounded-md ml-2">Send invite</button>
        </div>

        {/* Invite List */}
        <div className="mt-4">
          {[
            { name: "Jenny Wilson", email: "w.lawson@example.com", status: "Invite sent" },
            { name: "Jane", email: "jane.d@example.com", status: "Invite sent" },
            { name: "Matt Yvonne", email: "unstoppable@example.com", status: "Invite accepted" },
          ].map((person, index) => (
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
          ))}
        </div>

        <p className="mt-4 text-gray-500 text-sm">
          <strong>6</strong> People invited today so far <br />
          Two invites have been accepted from your request
        </p>
      </div>
    </div>
  );
}

export default ReferralInvite;