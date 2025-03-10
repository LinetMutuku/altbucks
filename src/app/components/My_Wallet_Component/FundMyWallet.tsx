"use client"

import Image from "next/image";
import bag from "../../../../public/assets/my_wallet/bag.png";
import money from "../../../../public/assets/my_wallet/money.svg";
import { useMyContext } from "@/context";

const FundMyWallet: React.FC = () => {
    const { setIsFundingOptionOpen } = useMyContext()

    const handleShow = () => {
        setIsFundingOptionOpen(true)
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-center bg-[#B8DDFF] rounded-lg pt-12 pb-2 px-24`">
                    <Image src={bag} alt="Wallet" layout="responsive" width={50} height={50} objectFit="contain" />
                </div>
                <div
                    onClick={handleShow}
                    className="bg-[#2877EA] text-white font-bold text-xl py-9 rounded-lg flex justify-center items-center cursor-pointer">
                    <div
                        className="flex gap-4 items-center">
                        <Image src={money} alt="Wallet" width={24} height={24} objectFit="contain" />
                        <p> Fund My Wallet</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FundMyWallet
