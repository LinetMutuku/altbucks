"use client"

import Header from '@/app/components/Task_Creator_Dashboard/Header'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import components that might use browser APIs
const AnalyticChart = dynamic(
    () => import('@/app/components/Task_Creator_Dashboard/AnalyticChart'),
    { ssr: false }
)

const TaskDuration = dynamic(
    () => import('@/app/components/Task_Creator_Dashboard/TaskDuractionChart'),
    { ssr: false }
)

const PopularTaskTable = dynamic(
    () => import('@/app/components/User-Dashboard/PopularTaskTable'),
    { ssr: false }
)

const TaskPerformanceTask = dynamic(
    () => import('@/app/components/User-Dashboard/TaskPerformanceTask'),
    { ssr: false }
)

const BarChart = dynamic(
    () => import('@/components/tables/earnerWalletTable'),
    { ssr: false }
)

export default function Page() {
  const tabs = ["Popular Task Analysis", "Worker Engagement", "Task Duration"];
  const [activeTab, setActiveTab] = useState('1 Year');
  const [isClient, setIsClient] = useState(false);
  const [selected, setSelected] = useState(0);

  // Initialize client state
  useEffect(() => {
    setIsClient(true);

    // Now it's safe to access localStorage
    try {
      const storedTab = localStorage.getItem("selectedTab");
      if (storedTab !== null) {
        setSelected(Number(storedTab));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Save selected tab to localStorage when it changes - only after client mount
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("selectedTab", String(selected));
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    }
  }, [selected, isClient]);

  const handleTabChange = (tab:string) => {
    setActiveTab(tab);
  };

  return (
      <>
        <Header />
        <div>
          <div className='p-4 flex flex-col gap-6'>
            <div className="px-10">
              <h1 className="text-3xl font-bold">Analytic Reports</h1>
              <p className="font-mulish font-normal text-[22px] text-[#585858] w-[517px]">Gain valuable insights into your task performance</p>
            </div>

            {isClient && (
                <>
                  <div className='px-10 flex flex-col gap-3'>
                    <p className='font-jakarta font-bold text-[26.77px] text-[#18181B]'>Task performance overview</p>
                    <TaskPerformanceTask />
                  </div>
                  <AnalyticChart />
                  <div>
                    <div className='px-5 py-5'>
                      <p className='font-jakarta font-bold text-[26.61px] text-[#18181B] pl-4'>Detailed Reports</p>
                      <div className='flex justify-between '>
                        <div className='flex items-center gap-5'>
                          {tabs.map((tab, index) => (
                              <span
                                  key={index}
                                  className={`font-Inter font-semibold text-[19.48px] px-4 py-2 rounded-md cursor-pointer transition-all duration-300 ${
                                      selected === index ? "bg-blue-600 text-white" : "text-[#333333]"
                                  }`}
                                  onClick={() => setSelected(index)}
                              >
                          {tab}
                        </span>
                          ))}
                        </div>
                        <button className='bg-[#2877EA] font-normal text-sm text-[#FFFFFF] rounded-[5px] w-[186px]'>Download report</button>
                      </div>
                    </div>

                    <div className='px-4'>
                      {/* Render based on selected tab */}
                      {selected === 0 && <PopularTaskTable />}
                      {selected === 1 && (
                          <div className='pl-5'>
                            <div className='flex justify-between'>
                              <div className='flex flex-col gap-2'>
                                <span className='font-medium text-base text-[#333333]'>Average worker per task</span>
                                <span className='font-medium text-3xl text-[#000000]'>100</span>
                                <span className='font-semibold text-base text-[#27AE60]'>+5%</span>
                              </div>
                              <div className='flex items-center gap-3 px-5'>
                                {["1 Year", "30 Days", "7 Days", "Today"].map((period) => (
                                    <button
                                        key={period}
                                        className={`p-3 text-[11px] rounded ${
                                            activeTab === period ? 'font-bold border text-[#18181B]' : 'border-none'
                                        }`}
                                        onClick={() => handleTabChange(period)}
                                    >
                                      {period}
                                    </button>
                                ))}
                              </div>
                            </div>
                            <BarChart />
                          </div>
                      )}
                      {selected === 2 && (
                          <div className='pl-5'>
                            <div className='flex justify-between'>
                              <div className='flex flex-col gap-2'>
                                <span className='font-medium text-base text-[#333333]'>Average completion time</span>
                                <span className='font-medium text-3xl text-[#000000]'>2d 13h 14m</span>
                                <span className='font-semibold text-base text-[#EB5757]'>-3%</span>
                              </div>
                              <div className='flex items-center gap-3 px-5'>
                                {["1 Year", "30 Days", "7 Days", "Today"].map((period) => (
                                    <button
                                        key={period}
                                        className={`p-3 text-[11px] rounded ${
                                            activeTab === period ? 'font-bold border text-[#18181B]' : 'border-none'
                                        }`}
                                        onClick={() => handleTabChange(period)}
                                    >
                                      {period}
                                    </button>
                                ))}
                              </div>
                            </div>
                            <TaskDuration />
                          </div>
                      )}
                    </div>
                  </div>
                </>
            )}
          </div>
        </div>
      </>
  )
}