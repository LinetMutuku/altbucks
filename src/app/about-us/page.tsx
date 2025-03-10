import React from 'react'
import Header from '../components/About_Components/Header'
import Banner from '../components/About_Components/Banner'
import Footer from '../components/About_Components/Footer'
import OurGoal from '../components/About_Components/OurGoal'
import ViewReviews from '../components/About_Components/ViewReviews'
import EarnRewards from '../components/About_Components/EarnRewards'

export default function page() {
  return (
    <div className='w-screen h-fit bg-white'>
        <Header />
        <Banner />
        <OurGoal />
        <ViewReviews />
        <EarnRewards />
        <Footer/>
    </div>
  )
}
