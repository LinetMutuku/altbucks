'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import PaymentMethodIcon from '../../../../public/assets/my_wallet/PaymentMethodIcon.png';
import Lines from '../../../../public/assets/my_wallet/Lines.png';
import PayPassIcon from '../../../../public/assets/my_wallet/PayPassIcon.png';

const cards = [
  {
    id: 1,
    bg: 'bg-gradient-to-br from-[#F8F7F9] via-[#F8F7F9] to-[#B8B8B8]',
  },
  {
    id: 2,
    bg: 'bg-gradient-to-br from-[#FFD164] to-[#6B4B00]',
  },
  {
    id: 3,
    bg: 'bg-gradient-to-br from-[#42307D] to-[#7F56D9]',
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
      {/* Up Arrow */}
      <button onClick={moveUp} className="absolute -top-28 z-50 bg-white p-2 rounded-full shadow-lg">
        <ChevronUpIcon className="w-6 h-6 text-gray-700" />
      </button>

      <div className="relative flex flex-col items-center w-full h-full mt-11">
        {cards.map((card, index) => {
          const position = (index - activeIndex + cards.length) % cards.length; // Ensure circular index
          const isMiddle = position === 0;
          const isTop = position === cards.length - 1;
          const isBottom = position === 1;

          return (
            <div
              key={card.id}
              className={`absolute transition-all duration-500 w-[90%] h-[220px] ${card.bg} rounded-2xl shadow-lg p-6 
                ${isMiddle ? 'z-20 scale-110' : 'z-10 scale-90 opacity-50'} 
                ${isBottom ? 'translate-y-[50%]' : ''} 
                ${isTop ? '-translate-y-[50%]' : ''}
              `}
            >
              <div className="absolute inset-0 z-10 top-12 right-0">
                <Image src={Lines} alt="Lines" width={100} height={100} layout="responsive" objectFit="cover" />
              </div>
              <div className="flex justify-between gap-5 items-center absolute bottom-4 right-3">
                <div className="z-20 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-medium tracking-widest">ADAM SMITH</h2>
                    <span className="text-sm tracking-wider">06/24</span>
                  </div>
                  <div className="text-xl tracking-[0.15em] font-semibold mt-1">1234 1234 1234 1234</div>
                </div>
                <Image src={PaymentMethodIcon} alt="Mastercard" width={50} height={30} />
              </div>
              <div className="absolute top-5 right-5">
                <Image src={PayPassIcon} alt="PayPassIcon" width={20} height={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Down Arrow */}
      <button onClick={moveDown} className="absolute -bottom-5 z-50 bg-white p-2 rounded-full shadow-lg">
        <ChevronDownIcon className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default CardSlider;












// "use client";

// import Image from "next/image";
// import PaymentMethodIcon from "../../../../public/assets/my_wallet/PaymentMethodIcon.png";
// import Lines from "../../../../public/assets/my_wallet/Lines.png";
// import PayPassIcon from "../../../../public/assets/my_wallet/PayPassIcon.png";

// const CardSlider: React.FC = () => {
//   return (
//     <div className="relative w-full h-[220px] bg-gradient-to-br from-[#42307D] to-[#7F56D9] rounded-2xl shadow-lg p-6 overflow-hidden">
//       {/* Background Lines */}
//       <div className="absolute inset-0 z-40 top-12 right-0">
//         <Image src={Lines} alt="Lines" width={100} height={100} layout="responsive" objectFit="cover" className="z-50" />
//       </div>

// {/* Card Details */}
// <div className="relative z-10 text-white">
//   {/* Name and Expiry Date */}
//   <div className="flex justify-between items-center mt-16">
//     <h2 className="text-lg font-medium tracking-widest">ADAM SMITH</h2>
//     <span className="text-md tracking-wider">06/24</span>
//   </div>

//   {/* Card Number */}
//   <div className="mt-4 text-2xl tracking-widest font-semibold">
//     1234 1234 1234 1234
//   </div>
// </div>

//       {/* Contactless Icon */}
//       <div className="absolute top-5 right-5">
//         <Image src={PayPassIcon} alt="PayPassIcon" width={20} height={20} />
//       </div>

//       {/* Mastercard Logo */}
//       <div className="absolute bottom-4 right-5">
//         <Image
//           src={PaymentMethodIcon}
//           alt="Mastercard"
//           width={50}
//           height={30}
//         />
//       </div>
//     </div>
//   );
// };

// export default CardSlider;
