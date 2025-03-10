"use client"


import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CardSlider from "../CardSlider";
import { useMyContext } from "@/context";


const PayoutAccount: React.FC = () => {
    const { setIsFundingOptionOpen, setIsPayoutAccountOpen,  setIsWithdrawalOpen, setIsAddAccountOpen } = useMyContext()
    
    const onClose = () => {
      setIsPayoutAccountOpen(false)
      setIsFundingOptionOpen(true)
    }
    const handleModal = () => {
      setIsWithdrawalOpen(true)
      setIsPayoutAccountOpen(false)
      setIsFundingOptionOpen(false)
    }
    const handleModal2 = () => {
      setIsAddAccountOpen(true)
      setIsWithdrawalOpen(false)
      setIsPayoutAccountOpen(false)
      setIsFundingOptionOpen(false)
    }

  return (
    <div className="fixed inset-0 bg-[#00000098] flex items-center justify-center px-4 z-20">
      <div className="relative w-full max-w-2xl mx-auto bg-gradient-to-r from-[#010E39] to-[#012677] p-6 rounded-2xl shadow-lg text-white">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-2xl outline-none"
        >
          <IoMdCloseCircleOutline size={20} />
        </button>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-center mb-4">
            Select Funding Account
          </h2>
          <CardSlider />
          <div className="flex items-center gap-4 mt-6">
            <button
            onClick={handleModal}
             className="flex-1 bg-[#4A6EF6] py-2 rounded-xl text-white font-medium">
              Select Account
            </button>
            <button 
            onClick={handleModal2}
            className="flex-1 border border-white py-2 rounded-xl text-white font-medium">
              Add New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutAccount;

