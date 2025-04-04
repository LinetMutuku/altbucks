import api from "@/lib/api";
import { API_URL } from "@/lib/utils";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

type PayoutMethod = "stripe-connect" | "stripe-bank";

interface StripePayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMethod: any; 
  mode: "add" | "edit";
}

interface FormData {
  gateway: PayoutMethod;
  stripeAccountId: string;
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
}

const StripePayoutModal: React.FC<StripePayoutModalProps> = ({ isOpen, onClose, selectedMethod, mode}) => {
  const [useStripeConnect, setUseStripeConnect] = useState(false);
  const [useStripeBank, setUseStripeBank] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    gateway: "stripe-connect",
    stripeAccountId: "",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
  });

  useEffect(() => {
    if (isOpen && selectedMethod) {
      // Pre-populate the form with selectedMethod details
      if (selectedMethod.gateway === "stripe-connect") {
        setUseStripeConnect(true);
        setFormData({
          gateway: "stripe-connect",
          stripeAccountId: selectedMethod.recipientDetails.stripeAccountId || "",
          accountNumber: "",
          routingNumber: "",
          accountHolderName: "",
        });
      } else if (selectedMethod.gateway === "stripe-bank") {
        setUseStripeBank(true);
        setFormData({
          gateway: "stripe-bank",
          stripeAccountId: "",
          accountNumber: selectedMethod.recipientDetails.accountNumber || "",
          routingNumber: selectedMethod.recipientDetails.routingNumber || "",
          accountHolderName: selectedMethod.recipientDetails.accountHolderName || "",
        });
      }
    }
  }, [isOpen, selectedMethod]); // Runs when modal opens or when selectedMethod changes

  const resetForm = () => {
    setUseStripeConnect(false);
    setUseStripeBank(false);
    setFormData({
      gateway: "stripe-connect",
      stripeAccountId: "",
      accountNumber: "",
      routingNumber: "",
      accountHolderName: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!useStripeConnect && !useStripeBank) {
      toast.error("Please select at least one payout method.");
      return false;
    }

    if (useStripeConnect && !formData.stripeAccountId.trim()) {
      toast.error("Stripe Account ID is required.");
      return false;
    }

    if (useStripeBank) {
      if (!formData.accountHolderName.trim()) {
        toast.error("Account holder name is required.");
        return false;
      }
      if (!formData.accountNumber.trim()) {
        toast.error("Account number is required.");
        return false;
      }
      if (!formData.routingNumber.trim()) {
        toast.error("Routing number is required.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    let payload: Record<string, any> = {
      currency: "NGN",
      country: "Nigeria",
    };

    if (useStripeConnect) {
      payload = {
        ...payload,
        gateway: "stripe-connect",
        recipientDetails: {
          stripeAccountId: formData.stripeAccountId,
        }
      };
    }

    if (useStripeBank) {
      payload = {
        ...payload,
        gateway: "stripe-bank",
        recipientDetails: {
          accountNumber: formData.accountNumber,
          routingNumber: formData.routingNumber,
          accountHolderName: formData.accountHolderName
        },
      };
    }

    try {
      const response = await api.post(`${API_URL}/api/v1/payment-details`, payload);
      if (response.data) {
        toast.success("Payment details saved successfully!");
        onClose();
      } else {
        toast.error("Failed to save payment details.");
      }
    } catch (error) {
      toast.error("Error submitting payment details.");
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


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Select Payout Method</h2>
        <p className="text-gray-600 mb-4">Choose how you want to receive your payments.</p>

        {/* Stripe Connect Option */}
        <div className="mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useStripeConnect}
              onChange={() => setUseStripeConnect(prev => !prev)}
              className="w-4 h-4"
            />
            <span>Use Stripe Connect</span>
          </label>
          {useStripeConnect && (
            <input
              type="text"
              name="stripeAccountId"
              value={formData.stripeAccountId}
              onChange={handleChange}
              placeholder="Stripe Account ID"
              className="w-full border p-2 mt-2 rounded"
              required
            />
          )}
        </div>

        {/* Stripe Bank Option */}
        <div className="mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useStripeBank}
              onChange={() => setUseStripeBank(prev => !prev)}
              className="w-4 h-4"
            />
            <span>Use Stripe Bank Transfer</span>
          </label>
          {useStripeBank && (
            <div className="mt-2 space-y-2">
              <label className="block text-sm font-medium">Account Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                placeholder="Enter Account Holder Name"
                className="w-full border p-2 rounded"
                required
              />
              
              <label className="block text-sm font-medium">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter Account Number"
                className="w-full border p-2 rounded"
                required
              />
              
              <label className="block text-sm font-medium">Routing Number</label>
              <input
                type="text"
                name="routingNumber"
                value={formData.routingNumber}
                onChange={handleChange}
                placeholder="Enter Routing Number"
                className="w-full border p-2 rounded"
                required
              />
            </div>
          )}
        </div>

          {mode === "add" ? (
            <div className="flex justify-between">
              <button 
                onClick={onClose} 
                className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Submit
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
      </div>
    </div>
  );
};

export default StripePayoutModal;