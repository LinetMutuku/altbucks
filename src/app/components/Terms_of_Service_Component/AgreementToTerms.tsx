import React from 'react'

export default function AgreementToTerms() {
  return (
    <div className='w-full h-fit bg-white py-16'>
        <div className='flex flex-col gap-3 w-[80%] mx-auto'>
            <h3 className='uppercase font-semibold text-2xl text-[#828282]'>Agreement to terms</h3>
            <p className='text-sm leading-8 tracking-wide text-[#525252]'>
                Welcome to <span className='text-[#F2994A] '>ALTBUCKS!</span> By accessing or using our platform, you agree to be bound by our Terms of Service, 
                which govern your use of the site and its features. These terms outline the conditions under which you may participate in tasks, 
                earn rewards, and receive payments. They also detail important guidelines around account usage, eligibility, payment processes, 
                and referral programs. We are committed to transparency, and it's important that you fully understand your rights and obligations 
                when using our platform. By agreeing to these terms, you confirm that you will use <span className='text-[#F2994A] '>ALTBUCKS</span> in compliance with all 
                applicable laws and our platform rules.
                Please take the time to read through our Terms of Service carefully to ensure that your experience with us remains smooth, 
                fair, and enjoyable. 
            </p>
            <h3 className='text-2xl text-[#828282] font-semibold uppercase mt-12'>User Representations</h3>
            <p className='text-sm tracking-wide text-[#828282]'>
                By using this site, you represent and warrant that:
            </p>
            <ul className='flex flex-col gap-3 list-decimal'>
                <li className='text-sm tracking-wide text-[#828282]'>All registration information you provide is accurate, current, and complete;</li>
                <li className='text-sm tracking-wide text-[#828282]'>You will maintain and promptly update such information as needed;</li>
                <li className='text-sm tracking-wide text-[#828282]'>You have legal capacity to agree to and comply with these Terms of Service;</li>
                <li className='text-sm tracking-wide text-[#828282]'>You are not a minor in the jurisdiction in which you reside;</li>
                <li className='text-sm tracking-wide text-[#828282]'>You will not access site through automated or non-human methods, such as bots, scripts, or other automated tools.</li>
            </ul>

            <p className='text-sm tracking-wide text-[#828282] mt-8'>If any of this informaton provided to be false , inaccurate, outdated, or incomplete, we reserve the right to 
                suspend or terminate your account and deny future access to the site(or any part of it).
            </p>

            <p className='text-sm tracking-wide text-[#828282] italic opacity-80'>
                For any questions or clarifications regarding the terms, feel free to contact our support team.
            </p>

            <div className='w-fit flex h-fit gap-8 mt-8'>
                <button className='border border-gray-400 h-fit w-fit px-4 py-3 rounded-lg text-sm text-gray-400 tracking-wide hover:bg-[#2877EA] transition-all duration-500 hover:text-white'>Decline</button>
                <button className='bg-[#2877EA] text-white text-sm tracking-wide h-fit w-fit px-4 py-3 rounded-lg hover:bg-blue-700 duration-500 transition-all'>I agree with terms</button>
            </div>
        </div>
    </div>
  )
}
