'use client';

import Image from 'next/image';
import PayPalLogo from '../../../../public/assets/paypal.png';
import StripeLogo from '../../../../public/assets/stripe.png';
import FlutterwaveLogo from '../../../../public/assets/bigFlutterlogo.png';
import WiseLogo from '../../../../public/assets/WiseLogo.png';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
// import SelectCardSlider from '../My_Wallet_Component/SelectCardSlider';
import BankPaymentMethodModal from '../paymentMethod/BankPaymentMethodModal';
import StripePayoutModal from '../paymentMethod/StripePayoutModal';
import PayPalPayoutModal from '../paymentMethod/Paypal';

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBankAccountSelect?: (account: any) => void; 
};

const paymentMethods = [
  { id: 'flutterwave', name: 'Flutterwave', logo: FlutterwaveLogo },
  { id: 'wise', name: 'Wise', logo: WiseLogo },
  { id: 'stripe', name: 'Stripe', logo: StripeLogo },
  { id: 'paypal', name: 'PayPal', logo: PayPalLogo },
];

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onBankAccountSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showBankModal, setShowBankModal] = useState(false);

  console.log("selectedMethod", selectedMethod)

  console.log("showBankModal", showBankModal)

  // Reset selection when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedMethod(null);
      setShowBankModal(false);
    }
  }, [isOpen]);

  const handleBankAccountSelect = (account: any) => {
    if (onBankAccountSelect) {
      onBankAccountSelect(account);
    }
    setShowBankModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] relative overflow-hidden">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-lg font-semibold">Choose Withdrawal Method</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✖
            </button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                    setSelectedMethod((prev) => {
                      const newMethod = prev === method.id ? null : method.id;
                      if (newMethod) {
                        setShowBankModal(true);
                      }
                      return newMethod;
                    });
                  }}
                                  className={clsx(
                  "flex h-[75px] items-center w-full border rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 relative overflow-hidden",
                  {
                    '': selectedMethod === method.id,
                    'border-gray-200': selectedMethod !== method.id
                  }
                )}
              >
                <div className={clsx(
                  "w-full h-full flex items-center transition-all duration-300",
                  {
                    'w-1/2 justify-start': selectedMethod === method.id,
                    'justify-center': selectedMethod !== method.id
                  }
                )}>
                  <Image 
                    src={method.logo} 
                    alt={method.name} 
                    width={120} 
                    height={40}
                    className={clsx(
                      "object-contain transition-all duration-300",
                      {
                        'scale-75 -translate-x-3': selectedMethod === method.id,
                        'scale-100': selectedMethod !== method.id
                      }
                    )}
                  />
                </div>
                 {/* Selection panel */}
              <div 
                 onClick={(e) => {
                    e.stopPropagation();
                    if (selectedMethod === method.id) {
                      setShowBankModal(true);
                    }
                  }}
                className={clsx(
                "absolute right-0 top-0 h-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white flex items-center justify-center text-sm px-4 transition-all duration-600",
                "rounded-l-[30px]",
                {
                  'w-1/2': selectedMethod === method.id,
                  'w-0': selectedMethod !== method.id,
                  'opacity-100': selectedMethod === method.id,
                  'opacity-0': selectedMethod !== method.id
                }
              )}
              style={{ boxShadow: '23px 0px 18.2px 0px #00000040 inset' }}>
                Click to Select Payout Bank Account
              </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showBankModal && selectedMethod === "flutterwave" && (
          <BankPaymentMethodModal onClose={() => setShowBankModal(false)}/>
      )}

      {showBankModal && selectedMethod === "wise" && (
        <BankPaymentMethodModal onClose={() => setShowBankModal(false)}/>
      )}

      {showBankModal && selectedMethod === "stripe" && (
         <StripePayoutModal 
         isOpen={showBankModal} 
         onClose={() => setShowBankModal(false)} 
         onSubmit={(data) => console.log("Payout Data:", data)} 
       />
      )}

    {showBankModal && selectedMethod === "paypal" && (
      <PayPalPayoutModal
        isOpen={showBankModal} 
        onClose={() => setShowBankModal(false)} 
        onSubmit={(data) => console.log("PayPal Payout Data:", data)} 
      />
    )}

    </>
  );
};

export default PaymentModal;