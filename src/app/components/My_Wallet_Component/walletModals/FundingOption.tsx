"use client"

import Image from "next/image";
import { useState } from "react";
import flutterWave from "../../../../../public/assets/my_wallet/fundingOption/flutterWave.png";
import paypal from "../../../../../public/assets/my_wallet/fundingOption/paypal.png";
import stripe from "../../../../../public/assets/my_wallet/fundingOption/stripe.png";
import wise from "../../../../../public/assets/my_wallet/fundingOption/wise.png";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import PayoutAccount from "./PayoutAccount";
import { useMyContext } from "@/context";



const FundingOption: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { setIsFundingOptionOpen, setIsPayoutAccountOpen } = useMyContext()

  const paymentOptions = [
    { img: flutterWave, alt: "Flutterwave" },
    { img: wise, alt: "Wise" },
    { img: stripe, alt: "Stripe" },
    { img: paypal, alt: "PayPal" },
  ];

  const onClose = () => {
    setIsFundingOptionOpen(false)
  }
  const handleShow = () => {
    setIsPayoutAccountOpen(true)
    setIsFundingOptionOpen(false)
  }

  return (
    <>
      <div className="fixed p-4 w-screen h-screen inset-0 bg-[#00000098] left-0 top-0 z-20 flex items-center justify-center px-2">
        <div className="relative w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 text-2xl hover:text-red-500"
          >
            <AiOutlineClose size={20} />
          </button>
          <h2 className="text-lg font-bold mb-4 text-gray-900">
            Choose Payment Method
          </h2>
          <div className="space-y-4">
            {paymentOptions.map((option, index) => (
              <div
                key={index}
                onMouseEnter={() => setHovered(option.alt)}
                onMouseLeave={() => setHovered(null)}
                onClick={handleShow}
                className="relative flex items-center h-20 justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition"
              >
                <Image src={option.img} alt={option.alt} objectFit="contain" width={120} height={40} />
                {hovered === option.alt ? (
                  <div className="absolute right-0 top-0 h-full w-52 font-bold text-xl flex items-center justify-center bg-gradient-to-r from-[#092C4C] to-[#5264FF] text-white px-4 rounded-xl rounded-l-full">
                    Click to Fund <br /> Your Wallet
                  </div>
                ) : (
                  <IoIosArrowForward className="text-gray-400" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FundingOption;
