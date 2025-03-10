"use client"

import { useMyContext } from '@/context';
import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const ManualInput: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
       const {setIsWithdrawalOpen, setIsManualInputOpen } = useMyContext()

    const handleButtonClick = (value: string | number) => {
        if (value === '<') {
            setInputValue((prev) => prev.slice(0, -1)); // Delete last character
        } else if (value === '>') {
            alert(`Submitted: ${inputValue}`); // Submit action
        } else {
            setInputValue((prev) => prev + value); // Append the new value
        }
    };

    const onClose = () => {
        setIsManualInputOpen(false)
        setIsWithdrawalOpen(true)
    };

    return (
        <div className="fixed inset-0 bg-[#00000098] flex items-center justify-center px-4 z-20">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-black text-right text-2xl outline-none"
                >
                    <IoMdCloseCircleOutline size={24} />
                </button>

                <div className="text-right text-2xl font-bold mb-4 bg-[#F0F0F0] rounded-xl py-6 px-4 mt-6">
                    {inputValue ? parseInt(inputValue).toLocaleString() : '0'}
                </div>
                <div className="grid grid-cols-3 place-items-center rounded-xl gap-4 py-4 bg-[#F0F0F0]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '<', 0, '>'].map((item, index) => (
                        <button
                            key={index}
                            className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl font-semibold transition-colors shadow-600 ${item === '<' || item === '>'
                                ? item === '<'
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-[#F0F0F0] hover:bg-gray-300'
                                }`}
                            onClick={() => handleButtonClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManualInput;