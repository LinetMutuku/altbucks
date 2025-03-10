"use client";

import React, { useState, useContext, createContext } from "react";

// Define the type for the context value
interface MyContextType {
    isFundingOptionOpen: boolean;
    setIsFundingOptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isPayoutAccountOpen: boolean;
    setIsPayoutAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isWithdrawalOpen: boolean;
    setIsWithdrawalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isManualInputOpen: boolean;
    setIsManualInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAddAccountOpen: boolean;
    setIsAddAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOtpConfirmation: boolean;
    setIsOtpConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
    isHurrayOpen: boolean;
    setIsHurrayOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value of `null`
const MyContext = createContext<MyContextType | null>(null);

// Context Provider Component
export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [isFundingOptionOpen, setIsFundingOptionOpen] = useState<boolean>(false);
    const [isPayoutAccountOpen, setIsPayoutAccountOpen] = useState<boolean>(false);
    const [isWithdrawalOpen, setIsWithdrawalOpen] = useState<boolean>(false);
    const [isManualInputOpen, setIsManualInputOpen] = useState<boolean>(false);
    const [isAddAccountOpen, setIsAddAccountOpen] = useState<boolean>(false);
    const [isOtpConfirmation, setIsOtpConfirmation] = useState<boolean>(false);
    const [isHurrayOpen, setIsHurrayOpen] = useState<boolean>(false);



    return (
        <MyContext.Provider
            value={{
                isFundingOptionOpen,
                setIsFundingOptionOpen,
                isPayoutAccountOpen,
                setIsPayoutAccountOpen,
                isWithdrawalOpen,
                setIsWithdrawalOpen,
                isManualInputOpen,
                setIsManualInputOpen,
                isAddAccountOpen,
                setIsAddAccountOpen,
                isOtpConfirmation,
                setIsOtpConfirmation,
                isHurrayOpen,
                setIsHurrayOpen,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

// Custom hook for consuming the context
export function useMyContext(): MyContextType {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a Context provider");
    }
    return context;
}