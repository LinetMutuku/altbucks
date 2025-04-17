// src/app/wallet/components/card.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MoneyAvailable,
  MoneyRecieved,
  MoneyWithdrawn,
} from "../../../../public/assets/svg";
import React from "react";

export default function CardComponent() {
  const cardDetails = [
    {
      id: 1,
      icon: <MoneyAvailable />,
      title: "Money Available",
      amount: ["$123,456.00", "All Time"],
      isHighlighted: true, // Added property to identify the first card
    },
    {
      id: 2,
      icon: <MoneyRecieved />,
      title: "Total Money Received",
      amount: ["$1,234,567.00", "All Time"],
    },
    {
      id: 3,
      icon: <MoneyWithdrawn />,
      title: "Total Money Withdrawn",
      amount: ["$1,234,567.00", "All Time"],
    },
  ];

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {cardDetails.map((card) => (
        <Card
          key={card.id}
          className={`min-w-[300px] ${
            card.isHighlighted ? "bg-blue-500 text-white" : "bg-[#f7f7f7] shadow-md"
          }`} // Conditional styling
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <>{card.icon}</>
              <h2>{card.title}</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{card.amount[0]}</p>
          </CardContent>
          <CardFooter>
            <p>Today</p>
            <p>All Time</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
