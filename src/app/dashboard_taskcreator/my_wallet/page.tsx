"use client";

import TableContent from "@/app/components/My_Wallet_Component/TableContent";
import WalletFilter from "@/app/components/My_Wallet_Component/WalletFilter";

import PaymentOverview from "@/app/components/My_Wallet_Component/PaymentOverview";
import FundMyWallet from "@/app/components/My_Wallet_Component/FundMyWallet";
import FundingOption from "@/app/components/My_Wallet_Component/walletModals/FundingOption";
import { useMyContext } from "@/context";
import PayoutAccount from "@/app/components/My_Wallet_Component/walletModals/PayoutAccount";
import Withdrawal from "@/app/components/My_Wallet_Component/walletModals/Withdrawal";
import ManualInput from "@/app/components/My_Wallet_Component/walletModals/ManualInput";
import AddAccount from "@/app/components/My_Wallet_Component/walletModals/AddAccount";
import OtpConfirmation from "@/app/components/My_Wallet_Component/walletModals/OtpConfirmation";
import Hurray from "@/app/components/My_Wallet_Component/walletModals/Hurray";
import bg from "../../../../public/assets/my_wallet/cardContainer.png"
import Image from "next/image";
import TaskCreatorCard from "@/app/components/My_Wallet_Component/taskCreatorWalletCard";
import Header from "@/app/components/Task_Creator_Dashboard/Header";


const Wallet: React.FC = () => {
  const { isFundingOptionOpen, isPayoutAccountOpen, isWithdrawalOpen, isManualInputOpen, isAddAccountOpen, isOtpConfirmation, isHurrayOpen } = useMyContext()
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="">
            <h1 className="text-3xl font-bold">Hello Smith,</h1>
            <p className="text-gray-600">Let's manage your finance wallet</p>
          </div>

          {/* Payment Overview */}
          <PaymentOverview />

          {/* Table Content */}
          <TableContent />
        </div>
        {/* Right Side */}
        <div className="space-y-6">
          {/* My Accounts */}
          <div className="relative bg-[#F8F9FC] lg:bg-transparent shadow lg:shadow-none px-4 py-6 pb-9 rounded-lg text-center space-y-4">
            {/* bg lines */}
            <Image src={bg} alt="lines" layout="responsive" width={100} height={100} objectFit="cover" className="absolute hidden lg:flex top-0 right-0" />
            <h3 className="font-bold text-2xl">My Accounts</h3>
            <TaskCreatorCard />
          </div>

          {/* Card Buttons */}
          <div className="flex gap-2 w-f">
            <button className="border w-[50%] text-[14px] py-[12px] rounded-md">
              Add New Card
            </button>
            <button className="border w-[50%] text-[14px] py-[12px] rounded-md">
              Edit Card
            </button>
          </div>

          {/* Filters */}
          <WalletFilter />

          {/* Fund My Wallet */}
          <FundMyWallet />
        </div>
      </div>
      {isFundingOptionOpen ? <FundingOption /> : null}
      {isPayoutAccountOpen ? <PayoutAccount /> : null}
      {isWithdrawalOpen ? <Withdrawal /> : null}
      {isManualInputOpen ? <ManualInput /> : null}
      {isAddAccountOpen ? <AddAccount /> : null}
      {isOtpConfirmation ? <OtpConfirmation /> : null}
      {isHurrayOpen ? <Hurray /> : null}

    </>
  );
};

export default Wallet;
