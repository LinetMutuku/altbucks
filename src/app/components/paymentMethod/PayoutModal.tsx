'use client';

import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ManuallyInputFigure from './ManuallyInputFigue';
import SuccessModal from './SuccessPayoutModal';
import useWallet from '@/hooks/useWallet';
import useWithdraw from '@/hooks/useWithdraw';

interface PayoutModalProps {
  onClose: () => void;
  detailToPay: any; 
}

const PayoutModal: React.FC<PayoutModalProps> = ({ onClose, detailToPay }) => {
  const [openManualInput, setOpenManualInput] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { walletBalance, walletDetails } = useWallet();
  const { withdraw, success } = useWithdraw();
  
  const moneyAvailable = walletBalance?.balance ?? 0;
  const totalMoneyReceived = walletDetails?.totalMoneyReceived ?? 0;
  const totalMoneyWithdrawn = walletDetails?.totalMoneyWithdrawn ?? 0;
  
  const [amount, setAmount] = useState(moneyAvailable);

  const EarningsOverview = [
    { title: "Money Available", amount: `$ ${moneyAvailable}` },
    { title: "Total Money Received", amount: `$ ${totalMoneyReceived}` },
    { title: "Total Money Withdrawn", amount: `$ ${totalMoneyWithdrawn}` },
  ];

  const sliderWidth = moneyAvailable > 0 ? (amount / moneyAvailable) * 100 : 0;
  const tooltipPosition = moneyAvailable > 0 ? (amount / moneyAvailable) * 100 : 0;
  const safeTooltipPosition = Math.min(tooltipPosition, 97);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
    }
  }, [success]);

  const handleSubmit = async() => {
    if (!amount) return;
  
    const { gateway, recipientDetails } = detailToPay;
  
    let formData: any = {
      gateway,
      amount,
      currency: gateway === "flutterwave" ? "NGN" : "USD", 
      recipientDetails: {},
    };
  
    if (gateway === "flutterwave") {
      formData.recipientDetails = {
        // bankCode: recipientDetails.bankCode ? Number(recipientDetails.bankCode) : null, 
        // accountNumber: recipientDetails.accountNumber  ? Number(recipientDetails.accountNumber) : null,
        bankCode: "044",
        accountNumber: "0690000031"
      };
    } else if (gateway === "stripe-connect") {
      formData.recipientDetails = {
        // stripeAccountId: recipientDetails.stripeAccountId || "",
        stripeAccountId: "acct_1R6nkk4IW7EtJUuM"
      };
    } else if (gateway === "stripe-bank") {
      formData.recipientDetails = {
        accountNumber: recipientDetails.accountNumber || "",
        routingNumber: recipientDetails.routingNumber || "",
        accountHolderName: recipientDetails.accountHolderName || "",
      };
    } else {
      console.error("Unsupported gateway");
      return;
    }
    
    try {
      await withdraw(formData);
    } catch (error) {
      console.error("Withdrawal error:", error);
    }
  };
  

  const closeModal = () => {
    setShowSuccess(false);
    // setAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Withdrawal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {EarningsOverview.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg border border-gray-300 flex flex-col items-start gap-2 ${index === 0 ? "bg-gradient-to-b from-[#092C4C] to-[#092C4C] text-white" : "bg-gray-100"}`}
            >
              <h3 className={`text-[10px] font-medium ${index === 0 ? "text-[#FDFDFE]" : "text-gray-600"}`}>{item.title}</h3>
              <p className={`text-xl font-bold ${index === 0 ? "text-[#FFFFFF]" : "text-black"}`}>{item.amount}</p>

              <div className="flex gap-2">
                <button
                className={`w-10 h-5 
                    [box-shadow:0px_0px_4px_0px_#00000026] 
                    font-jakarta font-medium text-[8px] rounded-[4px]
                    ${index === 0 ? "bg-[#00000024] text-[#FDFDFE] border border-[#FDFDFE]" : "bg-[#FFFFFF] text-[#A0A0A0]"}
                `}
                >
                Today
                </button>
                <button
                className={`w-10 h-5 font-jakarta font-medium text-[8px]
                    ${index === 0 ? "text-white" : "text-[#A5A5A5]"}
                `}
                >
                All Time
                </button>
            </div>
            </div>
          ))}
        </div>

        {/* Info Text */}
        <p className="text-xm text-[#667085] mb-4 font-normal ">
          Withdraw directly into the selected account. Transaction might take some minutes to propagate. Please relax :
        </p>

        <div className="mb-6 relative pt-8">
            {/* Custom track container */}
            <div className="relative h-4 w-full">
                {/* Background track (full width) */}
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                
                {/* Filled track (blue portion) */}
                <div 
                    className="absolute inset-y-0 left-0 bg-blue-600 rounded-full"
                    style={{ width: `${sliderWidth}%` }}
                ></div>
                
                {/* Actual input slider */}
                <input
                    type="range"
                    min="0"
                    max={moneyAvailable}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {/* Custom thumb that moves with input */}
                <div 
                className="absolute top-1/2 h-6 w-6 bg-blue-600 rounded-full transform -translate-y-1/2 shadow-md z-20 pointer-events-none"
                style={{ 
                    left: `calc(${safeTooltipPosition}%)` ,
                    transition: 'left 0.1s ease-out'
                }}
                ></div>
            </div>

            {/* Tooltip */}
            <div
                className="absolute top-0 transform -translate-x-1/2 -translate-y-full bg-white text-[#2877EA] text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap font-medium pointer-events-none"
                style={{
                left: `calc(${(amount / moneyAvailable) * 100}%)`,
                transition: 'left 0.1s ease-out'
                }}
            >
                ${amount.toLocaleString()}
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                    border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white">
                </div>
            </div>
            </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button onClick={() => setOpenManualInput(true)} className="w-full px-4 py-2 border border-[#000000] rounded-md">Manually Input Amount</button>
          <button onClick={handleSubmit} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Payout Now</button>
        </div>

        {openManualInput && (
          <ManuallyInputFigure 
            moneyAvailable={moneyAvailable} 
            onClose={() => setOpenManualInput(false)}
            onAmountChange={(value) => setAmount(value)}
            onSubmit={handleSubmit} 
          />
        )}

      </div>
        {/* Success Modal */}
        <SuccessModal 
            isOpen={showSuccess}
            onClose={closeModal}
        />
    </div>
  );
};

export default PayoutModal;