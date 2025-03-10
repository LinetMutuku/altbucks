"use client"
import React from 'react'
import Header from '@/app/components/Referral_Components/Header'
import ReferAndEarn, { RecentTasks } from "@/app/components/Referral_Components/ReferAndEarn";
import SearchByDate from '@/app/components/Referral_Components/SearchByDate';
import ReferralCards, { CardSection } from '@/app/components/Referral_Components/ReferralCards';

const Task: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex gap-2">
        <div className='w-[90%]'>
          <ReferAndEarn />
          <RecentTasks />
        </div>
        <div className="w-[40%] min-h-screen bg-gray-50 p-6 space-y-6">
          <CardSection />
          <SearchByDate />
          <ReferralCards />
        </div>
      </div>
    </>
  )
}
export default Task;