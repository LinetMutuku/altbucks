"use client";

import { useEffect, useState } from "react";

// Dynamically import the components with SSR disabled
const CardSlider = dynamic(() => import('../../components/My_Wallet_Component/CardSlider'), { ssr: false });
const BarChart = dynamic(() => import('../../../components/tables/earnerWalletTable'), { ssr: false });

import { useMyContext } from "@/context";
import Header from '../../components/My_Wallet_Component/Header';
import bg from "../../../../public/assets/my_wallet/cardContainer.png"
import Icon from "../../../../public/assets/Icon.png";
import Image from "next/image";
import dynamic from "next/dynamic";

const Wallet: React.FC = () => {
  // const { isFundingOptionOpen, isPayoutAccountOpen, isWithdrawalOpen, isManualInputOpen, isAddAccountOpen, isOtpConfirmation, isHurrayOpen } = useMyContext()

  const EarningsOverview = [
    {
      title: "Money Available",
      amount: "$123, 456.00",
    },
    {
      title: "Total Money Received",
      amount: "$123, 456.00",
    },
    {
      title: "Total Money Withdrawn",
      amount: "$123, 456.00",
    },
  ];

  const [activeTab, setActiveTab] = useState("Today");
  const tableData = {
    "1 Year": [{ name: "John Doe", amount: "$5000", date: "2024-03-01" }],
    "30 Days": [{ name: "Alice Brown", amount: "$1200", date: "2024-02-29" }],
    "7 Days": [{ name: "Charlie Smith", amount: "$400", date: "2024-03-04" }],
    Today: [{ name: "David Wilson", amount: "$50", date: "2024-03-05" }],
  } as const;

  // Client-side only code
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Only run localStorage code in the browser
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem("activeTab");
      if (savedTab && Object.keys(tableData).includes(savedTab)) {
        setActiveTab(savedTab as keyof typeof tableData);
      }
    }
  }, []);

  // Save tab selection to localStorage - only in browser
  const handleTabClick = (label: keyof typeof tableData) => {
    setActiveTab(label);
    if (typeof window !== 'undefined') {
      localStorage.setItem("activeTab", label);
    }
  };


  return (
      <>
        <Header />
        <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-2 px-10">
              <h1 className="text-3xl font-bold">Hello Smith,</h1>
              <p className="font-mulish font-normal text-[22px] text-[#585858] w-[714px]">Your wallet is ready--secure, fast, and always within reach. Manage your funds easily and unlock new possibilities with every transactions.</p>
            </div>

            {/* Earnings Overview */}
            <section className="">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
                <div className="mt-7 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {EarningsOverview.map((item, index) => (
                      <div
                          key={index}
                          className={`w-[295px] h-[183px] 
                      border border-[#C6C6C6] shadow-lg rounded-lg p-6
                      flex flex-col justify-center items-start gap-6 space-x-10
                      ${index === 0 ? "bg-blue-600 text-white" : "bg-gradient-to-b from-white to-gray-300"}
                    `}
                      >
                        <h3
                            className={`font-jakarta font-medium text-sm px-10 
                        ${index === 0 ? "text-white" : "text-[#898989]"}
                      `}
                        >
                          {item.title}
                        </h3>
                        <p
                            className={`mt-2 font-jakarta font-bold text-2xl 
                        ${index === 0 ? "text-white" : "text-[#000000]"}
                      `}
                        >
                          {item.amount}
                        </p>
                        <div className="flex gap-2">
                          <button
                              className={`w-10 h-5 
                          [box-shadow:0px_0px_4px_0px_#00000026] 
                          font-jakarta font-medium text-[8px] rounded-[4px]
                          ${index === 0 ? "bg-[#2058ab] text-[#FDFDFE] border border-[#FDFDFE]" : "bg-[#FFFFFF] text-[#A0A0A0]"}
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
              </div>
            </section>

            <div className="h-[455px] flex flex-col px-9 py-5 mt-4 border border-gray-400 rounded-[10px]">
              <div className="flex justify-between items-center ">
                <span className="font-jakarta font-semibold text-base text-[#18181B] pb-4">Task Earning Report</span>
                <div>
                  {/* Tabs */}
                  <div className="flex justify-center items-center gap-10 mb-5">
                    {Object.keys(tableData).map((label) => (
                        <button
                            key={label}
                            onClick={() => handleTabClick(label as keyof typeof tableData)}
                            className={`font-jakarta font-semibold text-[11px] ${
                                activeTab === label
                                    ? "text-black font-bold border p-4 py-3 border-[#A1A1AA] rounded-[5px] flex justify-center items-center"
                                    : "text-[#71717A] p-4"
                            }`}
                        >
                          {label}
                        </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center items-center mb-4 gap-2 border border-gray-400 px-4 py-2 rounded-[5px]">
                  <Image
                      src={Icon}
                      alt=""
                      height={16.43}
                      width={11.11}
                  />
                  <span>Export PDF</span>
                </div>
              </div>
              <div>
                <BarChart />
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="space-y-6">
            {/* My Accounts */}
            <div className="relative bg-[#F8F9FC] lg:bg-transparent shadow lg:shadow-none px-4 py-6 pb-9 rounded-lg text-center space-y-4">
              {/* bg lines */}
              <Image
                  src={bg}
                  alt="lines"
                  fill
                  objectFit="cover"
                  className="absolute hidden lg:flex w-[389px] h-[650px] rounded-[10px] top-0 right-0"
              />
              <h3 className="font-bold text-2xl pb-28">My Cards</h3>
              <CardSlider />
            </div>

            {/* Card Buttons */}
            <div className="flex gap-2 w-f">
              <button className="border w-[50%] text-[14px] py-[12px] rounded-md">
                Add New Card
              </button>
              <button className="border w-[50%] text-[14px] py-[12px] rounded-md">
                Edit Card
              </button>
            </div>
            <button className="w-[389px] xl:w-[486px] h-[98px] flex gap-4 items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-12 py-2 rounded-lg text-xl shadow-lg">
              <div className="border border-white px-1 rounded-sm">
                {isClient && <img src="/assets/withdraw-icon.png" alt="" className='w-8 h-8'/>}
              </div>
              Withdraw
            </button>
          </div>
        </div>
      </>
  );
};

export default Wallet;