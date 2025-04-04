import { useState, useRef, useEffect } from "react";
import BankDropdown from "@/components/bankDropDown/BankDropdown";
import { API_URL } from "@/lib/utils";
import api from "@/lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Bank {
  name: string;
  code: string;
  url: string;
}

interface BankPaymentMethodModalProps {
  onClose: () => void;
  gateway: string;
  selectedMethod: any; 
  mode: "add" | "edit";
}

const BankPaymentMethodModal: React.FC<BankPaymentMethodModalProps> = ({
  onClose,
  gateway,
  selectedMethod,
  mode,
}) => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    gateway: gateway,
    currency: "NGN",
    recipientDetails: {
      accountNumber: "",
      bankCode: "",
    },
    country: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedMethod) {
      setFormData((prev) => ({
        ...prev,
        gateway: selectedMethod.gateway,
        recipientDetails: {
          accountNumber: selectedMethod.recipientDetails.accountNumber || "",
          bankCode: selectedMethod.recipientDetails.bankCode || "",
        },
        country: selectedMethod.country || "",
      }));
      
      // Pre-select the bank based on the selectedMethod if bankCode exists
      const preSelectedBank = {
        name: selectedMethod.bankName,
        code: selectedMethod.recipientDetails.bankCode,
        url: selectedMethod.bankUrl,
      };
      setSelectedBank(preSelectedBank);
    }
  }, [selectedMethod]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.startsWith("recipientDetails.")) {
        return {
          ...prev,
          recipientDetails: {
            ...prev.recipientDetails,
            [name.split(".")[1]]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(`${API_URL}/api/v1/payment-details`, formData);

      const data = await response.data;

      if (!response) {
        throw new Error(data.message || "Failed to submit payment details");
      }

      toast.success("Payment details submitted successfully!");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error submitting payment details:", error);
      } else {
        toast.error("Something went wrong!");
        console.error("Unknown error:", error);
      }
    }
  };

  
  const handleUpdateAccount = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.put(`${API_URL}/api/v1/payment-details/${selectedMethod?._id}`);
      
      if (!response.data) {
        throw new Error('Failed to fetch payment details');
      }

      toast.success("Payment details updated successfully!");
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal positioned below parent */}
      <div
        ref={modalRef}
        className="p-10 relative bg-[#F9F9F9] rounded-lg shadow-xl w-[90%] max-w-2xl mt-2"
      >
        <div className="bg-[#FEFEFE] p-4 rounded-[5px]">
          {/* Header */}
          <div className="flex justify-between items-center px-4 mb-1">
            <h2 className="text-[18px] font-medium text-[#101828]">Add payment method</h2>
          </div>

          {/* Description */}
          <div className="px-4 mb-4">
            <p className="font-normal text-sm text-[#667085]">Update your payment details.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Account Number and Sort Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#344054] mb-1">Bank Name</label>
                <BankDropdown
                  selectedBank={selectedBank}
                  setSelectedBank={setSelectedBank}
                  setFormData={setFormData}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#344054] mb-1">Account Number</label>
                <input
                  type="text"
                  name="recipientDetails.accountNumber"
                  value={formData.recipientDetails.accountNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123456789"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#344054] mb-1">Bank Sort Code</label>
                <input
                  type="text"
                  name="recipientDetails.bankCode"
                  value={formData.recipientDetails.bankCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="01-23456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#344054] mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nigeria"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            {mode === "add" ? (
              <div className="flex justify-center space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-[317px] px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-[317px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                    Add Account
                  </button>
                </div>
              ) : (
                <button
                type="button"
                onClick={handleUpdateAccount}
                className="w-[317px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Account
              </button>
              )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BankPaymentMethodModal;
