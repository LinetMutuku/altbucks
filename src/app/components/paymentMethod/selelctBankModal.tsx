'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PayPalLogo from '../../../../public/assets/paypal.png';
import StripeLogo from '../../../../public/assets/stripe.png';
import FlutterwaveLogo from '../../../../public/assets/flutterwave.png';
import Lines from '../../../../public/assets/my_wallet/Lines.png';
import PayPassIcon from '../../../../public/assets/my_wallet/PayPassIcon.png';
import BankPaymentMethodModal from './BankPaymentMethodModal';
import PayoutModal from './PayoutModal';
import PaymentModal from '../Dashboard_Components/PaymentModal';
import { usePaymentDetails } from '@/hooks/usePaymentsDetails';
import StripePayoutModal from './StripePayoutModal';


interface SelectBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedBank: any) => void;
  mode: "add" | "edit";
}

const SelectBankModal: React.FC<SelectBankModalProps> = ({ isOpen, onClose, onSelect, mode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [openPayout, setOpenPayout] = useState(false);
  const [stripeModal, setStripeModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { paymentDetails, getPaymentDetails } = usePaymentDetails();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const [AccountDetailToPay, setAccountDetailToPay] = useState<any>(null);

  const handleEdit = () => {
    const selectedMethod = paymentDetails[activeIndex]; 
    setSelectedPaymentMethod(selectedMethod);  
  
    if (selectedMethod.gateway === "stripe-bank" || selectedMethod.gateway === "stripe-connect") {
      setStripeModal(true);
    } else if (selectedMethod.gateway === "flutterwave") {
      setShowBankModal(true);
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, [getPaymentDetails]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!paymentDetails || paymentDetails.length === 0) {
    return <p className="text-gray-500 text-center mt-20">No payment details available</p>;
  }

  const moveLeft = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + paymentDetails.length) % paymentDetails.length);
  };

  const moveRight = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % paymentDetails.length);
  };

  const handleSelect = () => {
    const selectedMethod = paymentDetails[activeIndex];
    setAccountDetailToPay(selectedMethod) 
    setOpenPayout(true);
  };

  if (!isOpen || !isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-gradient-to-br from-[#000849] to-[#0012AF] rounded-lg shadow-xl p-6 w-[90%] h-[362px] max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h3 className="text-base font-medium text-[#FFFFFF] text-center mb-6">{mode === "add" ? "Select Payment Method" : "Select Detail To Edit"}</h3>

        <div className="relative flex items-center justify-center w-full h-[200px]">
          {/* Left Navigation */}
          <button 
            onClick={moveLeft} 
            className="absolute left-0 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 -translate-x-4"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center w-full h-full" >
            {paymentDetails.map((card: any, index: number) => {
              const position = (index - activeIndex + paymentDetails.length) % paymentDetails.length;
              const isActive = position === 0;
              const isLeft = position === paymentDetails.length - 1;
              const isRight = position === 1;
              
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
              key={card.id ?? `card-${index}`} 
                className={`absolute transition-all duration-300 w-60 h-40 ${bgColor} rounded-2xl shadow-lg p-4
                ${isActive ? 'z-20 scale-100 opacity-100' : 'z-10 scale-90 opacity-70'}
                ${isLeft ? '-translate-x-[60%]' : ''}
                ${isRight ? 'translate-x-[60%]' : ''}
                flex flex-col justify-between`}
              >
                <div className="absolute inset-0 z-10 top-12 right-0">
                  <Image src={Lines} alt="Lines" width={100} height={100} layout="responsive" objectFit="cover" />
                </div>
            
                <div className="absolute top-5 right-5">
                  <Image src={PayPassIcon} alt="PayPassIcon" width={20} height={20} />
                </div>
            
                <div className="absolute bottom-4 right-3 flex items-center gap-3">
                  <Image src={logo} alt={card.gateway} width={50} height={30} />
                  <span className="text-white text-sm font-semibold">{card.gateway}</span>
                </div>
            
                <div className="z-20 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xs font-medium tracking-widest">VIRTUAL CARD</h2>
                  </div>
                  <div className="text-sm tracking-[0.15em] font-semibold mt-1">{displayField}</div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Right Navigation */}
          <button 
            onClick={moveRight} 
            className="absolute right-0 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 translate-x-4"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {mode === "add" ? (
            <>
                <button
                  onClick={handleSelect}
                  className="px-6 py-2 bg-[#2877EA] text-[#FFFFFF] rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                  Select Bank
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 bg-[#15151540] text-[#FFFFFF] rounded-md focus:outline-none"
                  >
                  Add New Account
                </button>
              </>
          ) : (
            <button onClick={handleEdit} className="px-6 py-2 bg-[#2877EA] text-[#FFFFFF] rounded-md hover:bg-blue-700 focus:outline-none">Edit</button>
          )}
        </div>



        {openPayout && (
            <PayoutModal onClose={() => setOpenPayout(false)} detailToPay={AccountDetailToPay} />
        )}
        {stripeModal && (
          <StripePayoutModal 
            isOpen={stripeModal} 
            onClose={() => setStripeModal(false)} 
            selectedMethod={selectedPaymentMethod}
            mode={mode}
          />
        )}
        {showBankModal && (
            <div className="fixed flex items-center justify-center z-50">
                <BankPaymentMethodModal onClose={() => setShowBankModal(false)} gateway='flutterwave' selectedMethod={selectedPaymentMethod} mode={mode}/>
            </div>
        )}
      </div>
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </div>
  );
};

export default SelectBankModal;