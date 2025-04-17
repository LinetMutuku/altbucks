"use client";

import Image from "next/image";
import React from "react";
import bannerImg from "../../../../public/assets/image 90.png";
import { useRouter } from "next/navigation"; 
import { useAuthStore } from "@/store/authStore";

export default function Banner() {
  const router = useRouter();
  const { user } = useAuthStore();


  const handleNavigate = () => {
    if(user?.isTaskCreator) {
      router.push("/dashboard_taskcreator")
    } else {
      router.push("/dashboard")
    }
  };

  return (
    <div className="flex w-full items-center h-[700px] bg-[#F1F2F4]">
      <div className="flex w-[80%] mx-auto justify-between">
        <div className="flex flex-col gap-8 w-[45%] h-full justify-center">
          <h3 className="text-[#F2994A] tracking-wide text-2xl uppercase font-semibold">
            The Alternative Bucks!
          </h3>
          <h2 className="text-5xl font-medium tracking-wide text-black leading-[55px]">
            Get Paid for Simple Tasks Earn-Cash Online with AltBucks!
          </h2>
          <p className="text-base tracking-wide text-gray-500 leading-6">
            Complete micro-tasks, surveys, and more to earn rewards from the comfort of your home.
          </p>
          <button
            onClick={handleNavigate}
            className="w-fit h-fit px-12 py-3 rounded-lg text-white text-sm tracking-wide bg-[#2877EA] hover:text-base transition-all duration-300 hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
        <div className="w-[45%] flex items-center h-full">
          <Image src={bannerImg} alt="" className="w-[80%] h-auto" />
        </div>
      </div>
    </div>
  );
}
