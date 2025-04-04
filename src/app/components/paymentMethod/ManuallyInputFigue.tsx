import { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import SuccessModal from './SuccessPayoutModal';

interface ManuallyInputFigureProps {
  moneyAvailable: number;
  onClose: () => void;
  onAmountChange: (amount: number) => void; // Pass amount back to parent
  onSubmit: () => void; // Trigger withdrawal process
}

const ManuallyInputFigure: React.FC<ManuallyInputFigureProps> = ({ moneyAvailable, onClose, onAmountChange, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleNumberClick = (num: string) => {
    const newAmount = parseFloat((amount === '0' ? num : amount + num));

    if (newAmount > moneyAvailable) {
      alert("You can't enter a value more than your available balance!!!");
      return;
    }

    setAmount(newAmount.toString());
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1) || '0');
  };

  const handleConfirm = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= moneyAvailable) {
      onAmountChange(parsedAmount); // Update amount in parent component
      onClose(); // Close modal
      onSubmit(); // Trigger withdrawal in PayoutModal
    } else {
      alert("Please enter a valid amount within your balance.");
    }
  };

  const closeModal = () => {
    setShowSuccess(false);
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-64 p-4">
        {/* Display */}
        <div className="text-right text-lg font-semibold bg-gray-100 p-2 rounded-md mb-2">
          {parseFloat(amount || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 bg-[#F0F0F0] p-4">
          {[...'123456789'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="w-14 h-14 rounded-full shadow flex items-center justify-center text-lg font-semibold"
              style={{ boxShadow: '2.86px 2.86px 4.28px 2.14px #00000040, -2.86px -2.86px 4.28px 2.14px #FFFFFFB2' }}
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleBackspace}
            className="w-14 h-14 bg-black text-white rounded-full shadow flex items-center justify-center"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={() => handleNumberClick('0')}
            className="w-14 h-14 bg-white rounded-full shadow flex items-center justify-center text-lg font-semibold"
          >
            0
          </button>

          <button
            onClick={handleConfirm}
            className="w-14 h-14 bg-blue-600 text-white rounded-full shadow flex items-center justify-center"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Success Modal */}
        <SuccessModal isOpen={showSuccess} onClose={closeModal} />
      </div>
    </div>
  );
};

export default ManuallyInputFigure;
