import React, { useState } from 'react';
import { RiFileDownloadFill } from 'react-icons/ri';
import YearChart from './charts/YearChart';
import MonthlyChart from './charts/MonthlyChart';
import DailyChart from './charts/DailyChart';
import HourlyChart from './charts/HourlyChart';

const Chart = () => {
  const [activeTab, setActiveTab] = useState('1 Year');

  const handleTabChange = (tab:string) => {
    setActiveTab(tab);
  };

  return (
    <main className='border rounded-md flex flex-col gap-2 text-black p-3'>
      <div className='flex items-center justify-between'>
        <p className='text-[16px] font-bold'>Task Earning Report</p>
        <div className='flex items-center gap-3'>
          <button
            className={`p-3 text-[11px] rounded ${
              activeTab === '1 Year' ? 'border text-[#18181B]' : 'border-none'
            }`}
            onClick={() => handleTabChange('1 Year')}
          >
            1 Year
          </button>
          <button
            className={`p-3 text-[11px] rounded ${
              activeTab === '30 Days' ? 'border text-[#18181B]' : 'border-none'
            }`}
            onClick={() => handleTabChange('30 Days')}
          >
            30 Days
          </button>
          <button
            className={`p-3 text-[11px] rounded ${
              activeTab === '7 Days' ? 'border text-[#18181B]' : 'border-none'
            }`}
            onClick={() => handleTabChange('7 Days')}
          >
            7 Days
          </button>
          <button
            className={`p-3 text-[11px] rounded ${
              activeTab === 'Today' ? 'border text-[#18181B]' : 'border-none'
            }`}
            onClick={() => handleTabChange('Today')}
          >
            Today
          </button>
        </div>
        <button className='flex items-center gap-2 border p-3 rounded'>
          <span>
            <RiFileDownloadFill />
          </span>
          <span>Export PDF</span>
        </button>
      </div>
      <div className='px-8 py-6'>
        {activeTab === '1 Year' && <YearChart />}
        {activeTab === '30 Days' && <MonthlyChart />}
        {activeTab === '7 Days' && <DailyChart />}
        {activeTab === 'Today' && <HourlyChart />}
      </div>
    </main>
  );
};

export default Chart;
