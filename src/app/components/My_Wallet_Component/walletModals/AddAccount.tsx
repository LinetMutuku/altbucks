import React, { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { IoMdCalendar, IoMdCloseCircleOutline } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { useMyContext } from "@/context";

const AddAccount: React.FC = () => {
    const { setIsPayoutAccountOpen, setIsAddAccountOpen } = useMyContext()

    const [formData, setFormData] = useState({
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic here
        console.log("Form Data:", formData);
    };
    const onClose = () => {
        setIsPayoutAccountOpen(true)
        setIsAddAccountOpen(false)
    }


    return (
        <div className="fixed inset-0 bg-[#00000098] flex items-center justify-center px-4 z-20">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-black hover:text-red-700 text-2xl outline-none"
                >
                    <IoMdCloseCircleOutline size={20} />
                </button>
                <div className="flex items-center gap-2 my-4 ">
                    <FaRegCreditCard size={24} className="text-blue-500" />
                    <h2 className="text-lg font-semibold">Update payment method</h2>
                </div>
                <p className="text-gray-500 mb-4">Update your card details.</p>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600">Name on card</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Olivia Rhye"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-blue-500"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm text-gray-600">Card number</label>
                            <div className="flex items-center border rounded-lg p-2">
                                <BsFillCreditCard2BackFill className="text-red-500 mr-2" />
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="1234 1234 1234 1234"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    className="w-full focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-sm text-gray-600">Expiry</label>
                                <div className="flex items-center border rounded-lg p-2">
                                    <IoMdCalendar className="text-gray-500 mr-2" />
                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="06 / 2024"
                                        value={formData.expiry}
                                        onChange={handleChange}
                                        className="w-full focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm text-gray-600">CVV</label>
                                <div className="flex items-center border rounded-lg p-2">
                                    <RiLockPasswordFill className="text-gray-500 mr-2" />
                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="•••"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        className="w-full focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAccount;