'use client';

import Image from 'next/image';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal = ({ 
  isOpen, 
  title = "Hurray!", 
  message = "Your payment is on its way" 
}: SuccessModalProps) => {
  if (!isOpen) return null;


  const handleClose = () => {
    // onClose();  
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center relative">
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-4">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <Image 
                src="/assets/CheckCircle.png"
                alt="Success"
                width={64}
                height={64}
                className="h-16 w-16"
              />
              <span className="font-sans font-medium text-3xl text-[#424242]">{title}</span>
            </div>
            <p className="font-sans font-normal text-lg text-[#757575] whitespace-nowrap">
              {message}
            </p>
          </div>

          {/* Right Section (Image) */}
          <div className="flex-1">
            <Image
              src="/assets/hurray.png"
              alt="Celebration"
              width={200}
              height={180}
              className="w-[200px] h-[180px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
