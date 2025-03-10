import React from 'react'
import Header from '../components/FrequentlyAskedQuestionsComponents/Header'
import Banner from '../components/FrequentlyAskedQuestionsComponents/Banner'
import EarnRewards from '../components/FrequentlyAskedQuestionsComponents/EarnRewards'
import Footer from '../components/FrequentlyAskedQuestionsComponents/Footer'
import QuestionsAndAnswers from '../components/FrequentlyAskedQuestionsComponents/QuestionsAndAnswers'

export default function page() {
  return (
    <div className='bg-white w-full h-fit'>
        <Header />
        <Banner />
        <QuestionsAndAnswers />
        <EarnRewards />
        <Footer />

    </div>
  )
}
