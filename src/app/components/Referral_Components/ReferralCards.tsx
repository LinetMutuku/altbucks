import React from "react";

const ReferralCards: React.FC = () => {
  const cards = [
    {
      icon: "👤",
      title: "You get",
      description:
        "$100 when 3 friends sign up with your link and get $200 each from performing tasks",
    },
    {
      icon: "🌱",
      title: "Your referral get",
      description:
        "Up to $50 when they sign up with your link and earn $200 from performing tasks",
    },
  ];

  return (
    <div className="">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white text-black p-6 rounded-lg flex items-start space-x-4"
        >
          <span className="text-3xl">{card.icon}</span>
          <div>
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReferralCards;

export const CardSection = () => {
    return (
      <div className="flex flex-col justify-center items-center font-semibold">
        {/* <h1 className="text-xl">Active Card</h1>
        <img src="/assets/card.png" alt="" /> */}
      </div>
    );
  };