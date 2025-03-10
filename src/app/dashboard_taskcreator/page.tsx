"use client"
import React, { useEffect } from 'react'
import Header from '../components/Task_Creator_Dashboard/Header'
import TopSection from '../components/Task_Creator_Dashboard/TopSection'
import UserInformation from '../components/Task_Creator_Dashboard/UserInformation'
import UserChart from '../components/Task_Creator_Dashboard/UserChart'
import FeaturedTask from '../components/Task_Creator_Dashboard/FeaturedTask'
import ViewProfile from '../components/Task_Creator_Dashboard/ViewProfile'
import TaskTotal from '../components/Task_Creator_Dashboard/TaskTotal'
import WithdrawNow from '../components/Task_Creator_Dashboard/WithdrawNow'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

export default function page() {
  const {isAuthenticated, user, profileAuth} = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    profileAuth()
    if(user?.isTaskEarner === "true"){
      router.push("/dashboard")
    }
  }, [])

  return (
    <>
        <Header />
        <div className='flex justify-between w-[85%] mx-auto mt-10 overflow-x-hidden'>
            <div className='w-[70%] flex flex-col gap-5'>
                <TopSection />
                <UserInformation />
                <UserChart />
                <FeaturedTask />
            </div>

            <div className='w-[28%] flex flex-col gap-5 justify-start'>
              <ViewProfile user={user} />
              <TaskTotal />
              <WithdrawNow />
            </div>

        </div>
    </>
  )
}
