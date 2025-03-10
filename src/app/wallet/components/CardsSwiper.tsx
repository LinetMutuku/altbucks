"use client";

// components/CardCarousel.tsx
import React from "react";
import dynamic from "next/dynamic"; // For SSR handling
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// ShadCN UI Card Component
import { ArrowDown, ArrowUp } from "../../../../public/assets/svg";

//imports of the card images
import PurpleCard from '../../../../public/assets/Credit-card.png'
import GreyCard from '../../../../public/assets/Credit-card-1.png'
import GoldCard from '../../../../public/assets/Credit-card-2.png'

// Dynamically import Swiper components
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

// Swiper modules
import { Navigation, EffectCoverflow } from "swiper/modules";
import Image from "next/image";

const CardCarousel = () => {
  const cards = [ PurpleCard, GreyCard, GoldCard ];

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-lg font-bold text-center mb-4">My Cards</h2>

      {/* Swiper Carousel */}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1.5} // Adjust to your liking (can vary with screen size)
        spaceBetween={10} // Add spacing between cards
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 100,
          modifier: 1,
          slideShadows: false, // Disable shadows for cleaner design
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Navigation]}
        className="overflow-visible"
      >
        {cards.map((card, idx) => (
          <SwiperSlide key={idx}>
            <Image src={card} alt="credit-card-variant" width={500} height={45}/>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center mt-4">
        <div className="swiper-button-prev slider-arrow">
          <ArrowUp />
        </div>
        <div className="swiper-button-next slider-arrow">
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;