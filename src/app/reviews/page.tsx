import React from 'react'
import Header from '../components/Reviews_Component/Header'
import EarnRewards from '../components/Reviews_Component/EarnRewards'
import Footer from '../components/Reviews_Component/Footer'
import Banner from '../components/Reviews_Component/Banner'
import Testimonial from '../components/Reviews_Component/Testimonial'

export default function page() {
  return (
    <div className='w-full bg-white h-fit'>
        <Header/>
        <Banner />
        <Testimonial />
        <EarnRewards />
        <Footer />

    </div>
  )
}
