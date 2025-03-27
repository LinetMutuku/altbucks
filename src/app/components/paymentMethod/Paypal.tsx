'use client';

import { useState } from 'react';

type PayPalPayoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { paypalEmail: string }) => void;
};

const PayPalPayoutModal: React.FC<PayPalPayoutModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [paypalEmail, setPaypalEmail] = useState('');

  const handleSubmit = () => {
    if (!paypalEmail) {
      alert('Please enter a valid PayPal email.');
      return;
    }
    onSubmit({ paypalEmail });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">PayPal Payout</h2>
        <p className="text-gray-600 mb-4">Enter your PayPal email to receive payouts.</p>

        <input
          type="email"
          name="paypalEmail"
          value={paypalEmail}
          onChange={(e) => setPaypalEmail(e.target.value)}
          placeholder="Enter PayPal Email"
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayoutModal;
