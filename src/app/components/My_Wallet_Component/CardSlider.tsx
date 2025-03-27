'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import PayPalLogo from '../../../../public/assets/paypal.png';
import StripeLogo from '../../../../public/assets/stripe.png';
import FlutterwaveLogo from '../../../../public/assets/flutterwave.png';
import Lines from '../../../../public/assets/my_wallet/Lines.png';
import PayPassIcon from '../../../../public/assets/my_wallet/PayPassIcon.png';

const cards = [
  {
    id: 1,
    name: 'PayPal',
    bg: 'bg-gradient-to-br from-[#003087] to-[#009CDE]',
    logo: PayPalLogo,
    requiredFields: ['paypalEmail'],
    displayField: 'paypalEmail@example.com',
  },
  {
    id: 2,
    name: 'Stripe',
    bg: 'bg-gradient-to-br from-[#6772E5] to-[#3A61C9]',
    logo: StripeLogo,
    requiredFields: ['accountNumber', 'routingNumber', 'accountHolderName'],
    displayField: 'John Doe - ****9012',
  },
  {
    id: 3,
    name: 'Flutterwave',
    bg: 'bg-gradient-to-br from-[#FFD700] to-[#6B4B00]',
    logo: FlutterwaveLogo,
    requiredFields: ['bankCode', 'accountNumber'],
    displayField: 'Bank: 044, ****1234',
  },
];

const CardSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const moveUp = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const moveDown = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  return (
    <div className="relative flex flex-col items-center w-full h-[400px]">
      <button onClick={moveUp} className="absolute -top-28 z-50 bg-white p-2 rounded-full shadow-lg">
        <ChevronUpIcon className="w-6 h-6 text-gray-700" />
      </button>

      <div className="relative flex flex-col items-center w-full h-full mt-11">
        {cards.map((card, index) => {
          const position = (index - activeIndex + cards.length) % cards.length;
          const isMiddle = position === 0;
          const isTop = position === cards.length - 1;
          const isBottom = position === 1;

          return (
            <div
              key={card.id}
              className={`absolute transition-all duration-500 w-[90%] h-[220px] ${card.bg} rounded-2xl shadow-lg p-6 
                ${isMiddle ? 'z-20 scale-110' : 'z-10 scale-90 opacity-50'} 
                ${isBottom ? 'translate-y-[50%]' : ''} 
                ${isTop ? '-translate-y-[50%]' : ''}`}
            >
              <div className="absolute inset-0 z-10 top-12 right-0">
                <Image src={Lines} alt="Lines" width={100} height={100} layout="responsive" objectFit="cover" />
              </div>
              
              <div className="absolute top-5 right-5">
                <Image src={PayPassIcon} alt="PayPassIcon" width={20} height={20} />
              </div>

              <div className="absolute bottom-4 right-3 flex items-center gap-3">
                <Image src={card.logo} alt={card.name} width={50} height={30} />
                <span className="text-white text-lg font-semibold">{card.name}</span>
              </div>

              <div className="z-20 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium tracking-widest">VIRTUAL CARD</h2>
                </div>
                <div className="text-xl tracking-[0.15em] font-semibold mt-1">{card.displayField}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={moveDown} className="absolute -bottom-5 z-50 bg-white p-2 rounded-full shadow-lg">
        <ChevronDownIcon className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default CardSlider;
