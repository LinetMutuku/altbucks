"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// const chartData = [
//   { month: "Jan", earnings: 200 },
//   { month: "Feb", earnings: 300 },
//   { month: "Mar", earnings: 250 },
//   { month: "Apr", earnings: 150 },
//   { month: "May", earnings: 100 },
//   { month: "Jun", earnings: 200 },
//   { month: "Jul", earnings: 300 },
//   { month: "Aug", earnings: 250 },
//   { month: "Sep", earnings: 200 },
//   { month: "Oct", earnings: 45000 }, // Example for October
//   { month: "Nov", earnings: 300 },
//   { month: "Dec", earnings: 200 },
// ];

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2363eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
