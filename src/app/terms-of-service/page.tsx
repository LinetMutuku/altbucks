import React from 'react'
import Banner from '../components/Terms_of_Service_Component/Banner'
import Header from '../components/Terms_of_Service_Component/Header'
import AgreementToTerms from '../components/Terms_of_Service_Component/AgreementToTerms'
import EarnRewards from '../components/Terms_of_Service_Component/EarnRewards'
import Footer from '../components/Terms_of_Service_Component/Footer'

export default function page() {
  return (
    <div className='w-screen h-fit bg-white'>
        <Header />
        <Banner />
        <AgreementToTerms />
        <EarnRewards />
        <Footer />
    </div>
  )
}
