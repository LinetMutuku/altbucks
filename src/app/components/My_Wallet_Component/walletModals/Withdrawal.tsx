"use client";
import React, { useState } from "react";
import currentBalIcon from "../../../../../public/assets/my_wallet/currentBal.svg"
import totalBalIcon from "../../../../../public/assets/my_wallet/totalBal.svg"
import Image from "next/image";
import { useMyContext } from "@/context";

const Withdrawal: React.FC = () => {
    const {setIsWithdrawalOpen, setIsManualInputOpen, setIsOtpConfirmation } = useMyContext()
    const [amount, setAmount] = useState(10000);
    const min = 0;
    const max = 123456; // Set to current wallet balance
    const percentage = ((amount - min) / (max - min)) * 100;

    const handleClose = () => {
      setIsWithdrawalOpen(false)
    };

    const handleManualInput = () => {
        setIsManualInputOpen(true)
        setIsWithdrawalOpen(false)
    };
    const handleTopUp = () => {
        setIsOtpConfirmation(true)
        setIsWithdrawalOpen(false)
    };

    return (
        <div className="fixed inset-0 bg-[#00000098] flex items-center justify-center px-4 z-20">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 pb-11 relative">
                <div className="flex justify-end">
                    <button onClick={handleClose} aria-label="Close">
                        <svg
                            className="w-6 h-6 text-gray-500 hover:text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Withdrawal Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Withdrawal</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-[#2877EA] px-6 py-8 rounded-lg text-white">
                        <div className="flex items-center space-x-2">
                            <Image src={currentBalIcon} alt="icon" width={20} height={20} />
                            <span className="font-medium text-sm">Current Wallet Balance</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">£123,456.00</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#E9E9E9] to-[#fff] px-6 py-8 rounded-lg shadow-500">
                        <div className="flex items-center space-x-2">
                            <Image src={totalBalIcon} alt="icon" width={20} height={20} />
                            <span className="text-[#898989] font-medium text-sm">Total Spent on Tasks</span>
                        </div>
                        <p className="text-2xl font-bold text-black mt-2">£1,234,567.00</p>
                    </div>
                </div>

                {/* Transaction Message */}
                <p className="text-[#667085] text-xs font-[Inter] mt-12">
                    Withdraw directly into the selected account. <br /> Transaction might take some minutes to propagate. Please relax ;)
                </p>

                <div className="mt-1">
                    <div className="flex justify-between text-gray-400 text-sm mb-1">
                        <span>{min}</span>
                        <span>{max.toLocaleString()}</span>
                    </div>
                    <div className="relative w-full h-4">
                        <div className="absolute top-1/2 w-full h-4 bg-[#C3DAF5] rounded-full transform -translate-y-1/2" />
                        <div
                            className="absolute top-1/2 h-4 bg-blue-500 rounded-full transform -translate-y-1/2"
                            style={{ width: `${percentage}%` }}
                        />
                        <div
                            className="absolute top-1/2 flex items-center justify-center w-14 h-14
                         bg-blue-500 text-white text-sm font-bold rounded-full
                         transform -translate-y-[60%] -translate-x-1/2 pointer-events-none border-[5px] border-white shadow-200"
                            style={{ left: `${percentage}%` }}
                        >
                            £{amount.toLocaleString()}
                        </div>
                        <input
                            id="slider"
                            type="range"
                            min={min}
                            max={max}
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                            className="absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={handleManualInput}
                        className="w-full border border-black text-black px-4 py-2 rounded-md"
                    >
                        Manually Input Amount
                    </button>
                    <button 
                    onClick={handleTopUp}
                    className="w-full  bg-[#2877EA] hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        Top Up My Wallet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Withdrawal;
