import React from 'react'
import Header from '../components/Contact_Us_Components/Header'
import Banner from '../components/Contact_Us_Components/Banner'
import ContactUsMethods from '../components/Contact_Us_Components/ContactUsMethods'
import StillHaveQuestions from '../components/Contact_Us_Components/StillHaveQuestions'
import EarnRewards from '../components/Contact_Us_Components/EarnRewards'
import Footer from '../components/Contact_Us_Components/Footer'

export default function page() {
  return (
    <div className='w-full bg-white h-fit'>
        <Header />
        <Banner />
        <ContactUsMethods />
        <StillHaveQuestions />
        <EarnRewards />
        <Footer />
    </div>
  )
}
