import React, { useEffect, useState } from 'react';
import { CiBookmark } from "react-icons/ci";
import { PiWalletDuotone } from "react-icons/pi";
// import { MdKeyboardArrowRight } from "react-icons/md";
import { useAuthStore } from '@/store/authStore';
import ReferralInvite from '../share_overlay/ShareOverlay';
import { API_URL } from '@/lib/utils';
import api from '@/lib/api';
import useWallet from '@/hooks/useWallet';
import SelectBankModal from '../paymentMethod/selelctBankModal';

const ReferAndEarn: React.FC = () => {
  const { user} = useAuthStore();
  const [token, setToken] = useState<string | null>(null);


  //Referral Link Generation
  const signUpUrl = "https://alt-bucks.vercel.app/sign-up/"; 
  const referralCode = user?.referralCode || "DEFAULT_CODE";
  const referralLink = `${signUpUrl}?referralCode=${referralCode}`;
  
  const [isCopied, setIsCopied] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const { walletBalance, loading, error  } = useWallet();
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [pendingRewards, setPendingRewards] = useState(0);
  const [earnedRewards, setEarnedRewards] = useState(0);
  const moneyAvailable = walletBalance?.balance ?? 0;


  useEffect(() => {
    setToken(localStorage.getItem("authToken")); 
  }, []);

  //Hanlde copy
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchReferralStats = async () => {
      try {
        const response = await api.get(`${API_URL}/api/v1/referrals/stats`);
  
        if (!response) {
          throw new Error("Failed to fetch referral stats.");
        }
  
        const data = await response.data;
  
        setTotalReferrals(data?.data?.totalReferrals || 0);
        setPendingRewards(data?.data?.pendingRewards || 0);
        setEarnedRewards(data?.data?.earnedRewards || 0);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Failed to fetch refferals stats";
        toast.error(message);      }
    };
  
    if (token) {
      fetchReferralStats();
    }
  }, [token]);

  const formattedFirstName = user?.firstName
  ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
  : "";

  const handleOpenModal = (mode: 'add' | 'edit') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSelectBank = () => {
    console.log("bank selected")
  }
  
  return (
    <>
    <div className="text-white py-6 px-6 flex flex-col space-y-10">
      {/* Header Section */}
      <div className="bg-[#2877EA] flex rounded-lg px-12 py-4 flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="md:w-2/3">
          <h1 className="text-xl mb-2">Hi {formattedFirstName},</h1>
          <h2 className="text-4xl font-semibold mb-3">Refer & Earn Rewards</h2>
          <p className="text-lg mb-5">Invite your friends and earn cash or credits</p>
          <div className="flex items-center space-x-4">
            <div className="flex gap-6 bg-white rounded-l-full p-1">
            <input
              type="text"
              readOnly
              placeholder={referralLink}
              className="bg-white text-gray-800 px-4 py-2 rounded-l-full w-full md:w-auto placeholder:text-gray-500 text-sm"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm"
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
            </div>
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="bg-gray-800 hover:bg-opacity-80 text-sm bg-opacity-70 text-white px-4 py-3 rounded-r-full"
            >
              Share
            </button>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-start items-center py-4">
          <img
            src="/assets/referral-image/image.png"
            alt="Wallet Illustration"
            className="w-60 h-44"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col gap-3 md:flex-row justify-around items-center space-y-6 md:space-y-0">
        <div className="bg-white flex gap-2 items-center text-gray-800 rounded-lg px-6 py-4 shadow-md text-center w-64">
        <div className="p-1 bg-[#D4FEE5]">
        <CiBookmark className='text-[#0F8152]'/>
        </div> 
        <p className="text-4xl font-bold text-gray-500">{totalReferrals}</p>
          <p className="text-sm text-gray-600">Total Referrals</p>
        </div>
        <div className="bg-white flex gap-2 items-center text-gray-800 rounded-lg px-6 py-4 shadow-md text-center w-64">
        <div className="p-1 bg-[#D2E1FE]">
        <PiWalletDuotone className='text-[#2877EA]'/>
        </div> 
        <p className="flex gap-1 items-end text-4xl font-bold text-gray-500"><span className='text-2xl text-gray-500'> $ </span>{pendingRewards}</p>
          <p className="text-sm text-gray-600">Pending Rewards</p>
        </div>
        <div className="bg-white flex gap-2 items-center text-gray-800 rounded-lg px-6 py-4 shadow-md text-center w-64">
        <div className="p-1 bg-[#D2E1FE]">
        <PiWalletDuotone className='text-[#2877EA]'/>
        </div> 
        <p className="flex gap-1 items-end text-4xl font-bold text-gray-500"><span className='text-2xl text-gray-500'> $ </span>{earnedRewards}</p>
          <p className="text-sm text-gray-600">Earned Rewards</p>
        </div>
      </div>

      {/* Withdraw Button */}
      <div className="flex justify-center">
      <div className="flex justify-between w-2/3 mt-6 gap-8">
        <div className="flex flex-col gap-2">
            <div className='text-black flex gap-1 items-center'>
                <div className="p-1 bg-[#D2E1FE]">
                    <PiWalletDuotone className='text-[#2877EA]'/>
                    </div> 
                    Money Available</div>
        <div className="text-4xl font-bold text-black">${moneyAvailable}</div>
        </div>
        <button onClick={() => handleOpenModal('add')}  className="flex gap-4 items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-12 py-2 rounded-lg text-xl shadow-lg">
            <div className="border border-white px-1 rounded-sm"><img src="/assets/withdraw-icon.png" alt="" className='w-6 h-6'/></div>
          Withdraw
        </button>
      </div>
      </div>

         <SelectBankModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelect={handleSelectBank}
            mode={modalMode}
          />
    </div>
    {/* Overlay Modal (ReferralInvite) */}
    {showOverlay && (
        <ReferralInvite referralLink={referralLink} isOpen={showOverlay} onClose={() => setShowOverlay(false)} />
      )}

</>
  );
};

export default ReferAndEarn;

import FeaturedTask from "../../components/task/FeaturedTask";
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';


export const RecentTasks: React.FC = () => {
   
    return (
      <div className="max-w-4xl bg-white p-16">
        <div className="bg-white rounded-xl shadow-sm">
          <FeaturedTask />
        </div>
      </div>
    );
  };
  