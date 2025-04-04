"use client"; // Ensure this is a Client Component

import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
  imageSrc: string; // Image URL (from the public folder)
  imageAlt: string; // Alt text for the image
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div
      className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-auto md:h-[300px]
        gap-6 rounded-lg shadow-lg text-white px-6 md:px-16 py-8 md:py-16 border
        border-transparent hover:border-4 hover:border-blue-600 bg-blue-500
        bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/Rectangle%202225.png')",
      }}
    >
      {/* Left Side (Title, Subtitle, Button) */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
        <h3 className="text-xl md:text-4xl mb-2 md:mb-4 font-mulish font-bold text-custom tracking-tightest">
          {title}
        </h3>
        <p className="text-sm md:text-lg mb-4 font-mulish font-normal text-custom-sm">
          {subtitle}
        </p>
        <button
          className="bg-blue-500 text-white hover:bg-blue-800 transition-all duration-500 px-6 md:px-10 py-2 md:py-3 rounded-lg font-mulish font-medium text-sm md:text-base"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>

      {/* Right Side (Image) */}
      <div className="relative z-10 flex items-center justify-center w-full md:w-1/2">
        <img
          src="/assets/hero.png"
          alt="Hero Image"
          className="max-w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default HeroSection;
