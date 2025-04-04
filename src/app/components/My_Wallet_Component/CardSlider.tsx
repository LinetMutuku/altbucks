'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import PayPalLogo from '../../../../public/assets/paypal.png';
import StripeLogo from '../../../../public/assets/stripe.png';
import FlutterwaveLogo from '../../../../public/assets/flutterwave.png';
import Lines from '../../../../public/assets/my_wallet/Lines.png';
import PayPassIcon from '../../../../public/assets/my_wallet/PayPassIcon.png';
import { usePaymentDetails } from '@/hooks/usePaymentsDetails';

const CardSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { paymentDetails, getPaymentDetails } = usePaymentDetails();

  useEffect(() => {
    getPaymentDetails();
  }, [getPaymentDetails]);

  if (!paymentDetails || paymentDetails.length === 0) {
    return <p className="text-gray-500 text-center mt-20">No payment details available</p>;
  }

  const moveUp = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + paymentDetails.length) % paymentDetails.length);
  };

  const moveDown = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % paymentDetails.length);
  };

  return (
    <div className="relative flex flex-col items-center w-full h-[400px]">
      <button onClick={moveUp} className="absolute -top-28 z-50 bg-white p-2 rounded-full shadow-lg">
        <ChevronUpIcon className="w-6 h-6 text-gray-700" />
      </button>

      <div className="relative flex flex-col items-center w-full h-full mt-11">
        {paymentDetails.map((card: any, index: number) => {
          const position = (index - activeIndex + paymentDetails.length) % paymentDetails.length;
          const isMiddle = position === 0;
          const isTop = position === paymentDetails.length - 1;
          const isBottom = position === 1;

          let bgColor = 'bg-gray-500'; 
          if (card.gateway === 'stripe-bank') {
            bgColor = 'bg-gradient-to-br from-[#6772E5] to-[#3A61C9]';
          } else if (card.gateway === 'stripe-connect') {
            bgColor = 'bg-gradient-to-br from-[#003087] to-[#009CDE]';
          } else if (card.gateway === 'flutterwave') {
            bgColor = 'bg-gradient-to-br from-[#FFD700] to-[#6B4B00]';
          }

          const gatewayLogos: Record<string, any> = {
            'stripe-bank': StripeLogo,
            'stripe-connect': StripeLogo,
            'flutterwave': FlutterwaveLogo,
          };

          const logo = gatewayLogos[card.gateway] || PayPalLogo;

          let displayField = 'No details available';
          if (card.gateway === 'stripe-bank') {
            displayField = `${card.recipientDetails.accountHolderName} - ****${card.recipientDetails.accountNumber.slice(-4)}`;
          } else if (card.gateway === 'stripe-connect') {
            displayField = `Stripe Account: ${card.recipientDetails.stripeAccountId}`;
          } else if (card.gateway === 'flutterwave') {
            displayField = `Bank: ${card.recipientDetails.bankCode}, ****${card.recipientDetails.accountNumber.slice(-4)}`;
          }

          return (
            <div
              key={card._id}
              className={`absolute transition-all duration-500 w-[90%] h-[220px] ${bgColor} rounded-2xl shadow-lg p-6 
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
                <Image src={logo} alt={card.gateway} width={50} height={30} />
                <span className="text-white text-lg font-semibold">{card.gateway}</span>
              </div>

              <div className="z-20 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium tracking-widest">VIRTUAL CARD</h2>
                </div>
                <div className="text-xl tracking-[0.15em] font-semibold mt-1">{displayField}</div>
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
