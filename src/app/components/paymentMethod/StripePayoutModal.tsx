"use client";

import { useState, useEffect } from "react";

// Define the payout method types
type PayoutMethod = "stripe-connect" | "stripe-bank";

type PayoutOptions = {
  [key in PayoutMethod]: {
    requiredFields: string[];
    title: string;
  };
};

const payoutOptions: PayoutOptions = {
  "stripe-connect": {
    requiredFields: ["stripeAccountId"],
    title: "Stripe Connect Payout",
  },
  "stripe-bank": {
    requiredFields: ["accountNumber", "routingNumber", "accountHolderName"],
    title: "Direct U.S. Bank Payout",
  },
};

// Define modal prop types
interface StripePayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<PayoutMethod, any>) => void;
}

const StripePayoutModal: React.FC<StripePayoutModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [useStripeConnect, setUseStripeConnect] = useState(false);
  const [useStripeBank, setUseStripeBank] = useState(false);
  const [formData, setFormData] = useState({
    stripeAccountId: "",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
  });

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setUseStripeConnect(false);
      setUseStripeBank(false);
      setFormData({
        stripeAccountId: "",
        accountNumber: "",
        routingNumber: "",
        accountHolderName: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!useStripeConnect && !useStripeBank) {
      alert("Please select at least one payout method.");
      return;
    }

    const selectedMethods: Record<PayoutMethod, any> = {} as Record<PayoutMethod, any>;

    if (useStripeConnect) {
      selectedMethods["stripe-connect"] = {
        stripeAccountId: formData.stripeAccountId,
      };
    }
    if (useStripeBank) {
      selectedMethods["stripe-bank"] = {
        accountNumber: formData.accountNumber,
        routingNumber: formData.routingNumber,
        accountHolderName: formData.accountHolderName,
      };
    }

    onSubmit(selectedMethods);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Select Payout Method</h2>
        <p className="text-gray-600 mb-4">Choose how you want to receive your payments.</p>

        {/* Stripe Connect Option */}
        <div className="mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useStripeConnect}
              onChange={() => setUseStripeConnect((prev) => !prev)}
              className="w-4 h-4"
            />
            <span>Use Stripe Connect</span>
          </label>
          {useStripeConnect && (
            <input
              type="text"
              name="stripeAccountId"
              value={formData.stripeAccountId}
              onChange={handleChange}
              placeholder="Stripe Account ID"
              className="w-full border p-2 mt-2 rounded"
            />
          )}
        </div>

        {/* Stripe Bank Option */}
        <div className="mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useStripeBank}
              onChange={() => setUseStripeBank((prev) => !prev)}
              className="w-4 h-4"
            />
            <span>Use Stripe Bank Transfer</span>
          </label>
          {useStripeBank && (
            <div className="mt-2 space-y-2">
              <label className="block text-sm font-medium">Account Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                placeholder="Enter Account Holder Name"
                className="w-full border p-2 rounded"
              />
              
              <label className="block text-sm font-medium">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter Account Number"
                className="w-full border p-2 rounded"
              />
              
              <label className="block text-sm font-medium">Routing Number</label>
              <input
                type="text"
                name="routingNumber"
                value={formData.routingNumber}
                onChange={handleChange}
                placeholder="Enter Routing Number"
                className="w-full border p-2 rounded"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StripePayoutModal;
