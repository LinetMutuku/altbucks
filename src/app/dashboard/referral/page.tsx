"use client"
import React, { useState } from 'react'
import Header from '../../components/Dashboard_Components/Header'
import ReferAndEarn, { RecentTasks } from "@/app/components/Referral_Components/ReferAndEarn";
import SearchByDate from '@/app/components/Referral_Components/SearchByDate';
import ReferralCards, { CardSection } from '@/app/components/Referral_Components/ReferralCards';
import { useRouter } from 'next/navigation';

const Task: React.FC = () => {
  const router = useRouter();

  const [defaultDates] = useState({
    fromDate: new Date(new Date().setDate(1)), 
    toDate: new Date(), 
  });

  const handleDateApply = (dates: { fromDate: string; toDate: string }) => {
    router.push(`/dashboard/referralResult?fromDate=${dates.fromDate}&toDate=${dates.toDate}`);
  };

  return (
    <>
      <Header />
      <div className="flex gap-2">
      <div className='w-[70%]'>
          <ReferAndEarn />
          <RecentTasks />
        </div>
        <div className="w-[30%] min-h-screen bg-gray-50 p-6 space-y-6">
          <CardSection />
          <SearchByDate 
            onApply={handleDateApply}
            initialFrom={defaultDates.fromDate}
            initialTo={defaultDates.toDate}
          />
          <ReferralCards />
        </div>
      </div>
    </>
  );
};

export default Task;