import React from 'react'
import iconImg from "../../../../public/assets/Frame 35.png";
import Image from 'next/image';

export default function QuestionsAndAnswers() {
  return (
    <div className='bg-white h-fit flex items-center justify-center py-12'>
        <div className='flex w-[80%] mx-auto justify-between'>
            <div className='flex flex-col gap-5 w-[45%]'>
                {/* First Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>What is Alt Bucks?</h3>
                        <p className='text-xs  text-black'>Alt Bucks is a platform where users can earn rewards by completing various tasks, 
                            such as taking surveys, watching videos, and engaging with content.</p>
                    </div>                  
                </div>
                {/* Second Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>How do I track my earnings?</h3>
                        <p className='text-xs  text-black'>You can track your earnings by logging into your account and viewing 
                        your "Earnings Dashboard," which shows completed tasks and accumulated rewards.</p>
                    </div>                  
                </div>

                {/* Third Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>Can I use Alt Bucks on mobile?</h3>
                        <p className='text-xs  text-black'>Yes, Alt Bucks is fully accessible through mobile browsers, and 
                        we also offer a dedicated mobile app for an even smoother experience.</p>
                    </div>                  
                </div>
                {/* Fourth Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>Is there a referral program?</h3>
                        <p className='text-xs  text-black'>Yes, you can earn extra rewards by referring friends to Alt Bucks. 
                        For each referral that signs up and completes tasks, you'll earn bonus points.</p>
                    </div>                  
                </div>

                {/* Fifth Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>Is my info safe?</h3>
                        <p className='text-xs  text-black'>Yes, we take data privacy seriously. Your information is stored securely, 
                        and we never share personal details with third parties without your consent.</p>
                    </div>                  
                </div>
                
            </div>
            
            <div className='flex flex-col gap-5 w-[45%]'>
                {/* First Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>How do I earn with AltBucks?</h3>
                        <p className='text-xs  text-black'>You can earn by completing tasks such as filling out surveys, watching videos, 
                        trying out apps, or participating in offers. Each task has a specific reward.</p>
                    </div>                  
                </div>
                {/* Second Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>How are my earnings paid out?</h3>
                        <p className='text-xs  text-black'>You can redeem your earnings through options like PayPal, 
                        gift cards, or direct bank transfers. The available payment methods may vary depending on your location.</p>
                    </div>                  
                </div>

                {/* Third Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>Is Alt Bucks available worldwide?</h3>
                        <p className='text-xs  text-black'>Yes, Alt Bucks is available in most countries, though some tasks or offers may be region-specific.</p>
                    </div>                  
                </div>
                {/* Fourth Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>Can I have multiple accounts?</h3>
                        <p className='text-xs  text-black'>No, users are only allowed to have one Alt Bucks account. 
                        Creating multiple accounts may result in suspension or banning from the platform.</p>
                    </div>                  
                </div>

                {/* Fifth Question */}
                <div className='bg-white flex shadow-lg gap-6 p-5 rounded-lg'>
                    <Image src={iconImg} alt='' className='w-[40px] h-[40px] object-cover'/>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-[#2877EA]  tracking-wide '>Is there an age limit?</h3>
                        <p className='text-xs  text-black'>You must be 18+ to join. Under 18 may need parental consent, depending on local laws.</p>
                    </div>                  
                </div>
                
                

                

            </div>

        </div>


    </div>
  )
}
