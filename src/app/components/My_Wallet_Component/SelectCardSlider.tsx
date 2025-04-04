'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import PayPalLogo from '../../../../public/assets/paypal.png';
import StripeLogo from '../../../../public/assets/stripe.png';
import FlutterwaveLogo from '../../../../public/assets/flutterwave.png';
import Lines from '../../../../public/assets/my_wallet/Lines.png';
import PayPassIcon from '../../../../public/assets/my_wallet/PayPassIcon.png';

type SelectCardSliderProps = {
    paymentMethod: string;
    onClose: () => void;
    onSelect: (account: any) => void;
  };

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

const SelectCardSlider: React.FC<SelectCardSliderProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const moveLeft = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const moveRight = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handleCardClick = (index: number) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center justify-center w-full h-[300px]">
        <button 
          onClick={moveLeft} 
          className="absolute left-0 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>

        <div className="relative flex items-center w-full h-full px-12 overflow-x-hidden">
          {cards.map((card, index) => {
            const position = (index - activeIndex + cards.length) % cards.length;
            const isCenter = position === 0;
            const isLeft = position === cards.length - 1;
            const isRight = position === 1;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`absolute transition-all duration-500 w-[300px] h-[220px] ${card.bg} rounded-2xl shadow-lg p-6 cursor-pointer
                  ${isCenter ? 'z-20 scale-110' : 'z-10 scale-90 opacity-50'} 
                  ${isLeft ? '-translate-x-[80%]' : ''} 
                  ${isRight ? 'translate-x-[80%]' : ''}
                  ${selectedCard === index ? 'ring-4 ring-blue-400' : ''}`}
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

        <button 
          onClick={moveRight} 
          className="absolute right-0 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button 
          className={`px-6 py-3 rounded-lg font-medium transition
            ${selectedCard !== null ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          disabled={selectedCard === null}
        >
          Select Account
        </button>
        <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
          Add New Account
        </button>
      </div>
    </div>
  );
};

export default SelectCardSlider;