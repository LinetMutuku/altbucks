"use client";

import { Filters } from "@/interface/Filter";
import { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  exclusive?: boolean;
}

interface FilterProps {
  onClick: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const filterSections: FilterSection[] = [
    {
      title: "Date posted",
      options: [
        { label: "Anytime", value: "anytime", count: 0 },
        { label: "Past week", value: "past_week", count: 0 },
        { label: "Past month", value: "past_month", count: 0 },
        { label: "Past 24 hours", value: "past_24_hours", count: 0 },
      ],
      exclusive: true,
    },
    {
      title: "Skill",
      options: [
        { label: "Design", value: "Design", count: 14208 },
        { label: "Product", value: "Product", count: 2435 },
        { label: "Marketing", value: "Marketing", count: 600 },
        { label: "Management", value: "Management", count: 412 },
        { label: "Sales", value: "Sales", count: 19397 },
        { label: "Development", value: "Development", count: 416 },
        { label: "Operations", value: "Operations", count: 217 },
        { label: "Engineering", value: "Engineering", count: 359 },
        { label: "Other", value: "Other", count: 28457 },
      ],
    },
    {
      title: "Number of Applications",
      options: [
        { label: "Less than 5 Applications", value: "Less than 5 Applications", count: 93 },
        { label: "5 - 10 Applications", value: "5 - 10 Applications", count: 93 },
        { label: "10 - 15 Applications", value: "10 - 15 Applications", count: 93 },
        { label: "15 - 20 Applications", value: "15 - 20 Applications", count: 93 },
        { label: "20 - 25 Applications", value: "20 - 25 Applications", count: 93 },
      ],
    },
    {
      title: "Task Pay",
      options: [
        { label: "$50K - $80K", value: "$50K - $80K", count: 93 },
        { label: "$80K - $100K", value: "$80K - $100K", count: 93 },
        { label: "$100K - $120K", value: "$100K - $120K", count: 93 },
        { label: "$120K - $150K", value: "$120K - $150K", count: 93 },
        { label: "$150K - $200K", value: "$150K - $200K", count: 93 },
        { label: "Above $200K", value: "Above $200K", count: 93 },
      ],
    },
  ];

  const [showList, setShowList] = useState<{ [key: string]: boolean }>(
    filterSections.reduce((acc, section) => {
      acc[section.title] = true;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleOption = (section: string, value: string) => {
    setFilters((prev) => {
      if (section === "Date posted") {
        let isoDate: string | undefined;

        switch (value) {
          case "past_24_hours":
            isoDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];
            break;
          case "past_week":
            isoDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
            break;
          case "past_month":
            isoDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
            break;
          default:
            isoDate = undefined;
        }

        return {
          ...prev,
          [section]: isoDate ? [isoDate] : [],
        };
      }

      if (section === "Number of Applications") {
        let minApplications = 0;
        let maxApplications = 0;

        switch (value) {
          case "Less than 5 Applications":
            minApplications = 0;
            maxApplications = 5;
            break;
          case "5 - 10 Applications":
            minApplications = 5;
            maxApplications = 10;
            break;
          case "10 - 15 Applications":
            minApplications = 10;
            maxApplications = 15;
            break;
          case "15 - 20 Applications":
            minApplications = 15;
            maxApplications = 20;
            break;
          case "20 - 25 Applications":
            minApplications = 20;
            maxApplications = 25;
            break;
        }

        
        return {
          ...prev,
          [section]: { minApplications, maxApplications },
        };
      }


      if (section === "Task Pay") {
        let minPay = 0;
        let maxPay = Infinity;
      
        switch (value) {
          case "$50K - $80K":
            minPay = 50000;
            maxPay = 80000;
            break;
          case "$80K - $100K":
            minPay = 80000;
            maxPay = 100000;
            break;
          case "$100K - $120K":
            minPay = 100000;
            maxPay = 120000;
            break;
          case "$120K - $150K":
            minPay = 120000;
            maxPay = 150000;
            break;
          case "$150K - $200K":
            minPay = 150000;
            maxPay = 200000;
            break;
          case "Above $200K":
            minPay = 200000;
            maxPay = 1000000000;
            break;
        }
      
        return {
          ...prev,
          [section]: { minPay, maxPay },
        };
      }
      

      const currentValues = Array.isArray(prev[section]) ? prev[section] as string[] : [];
      const alreadySelected = currentValues.includes(value);

      return {
        ...prev,
        [section]: alreadySelected
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const toggleListVisibility = (section: string) => {
    setShowList((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAll = () => {
    setFilters({});
  };

  const skillColors: { [key: string]: string } = {
    Design: "bg-purple-100 text-purple-700",
    Product: "bg-blue-100 text-blue-700",
    Marketing: "bg-indigo-100 text-indigo-700",
    Management: "bg-pink-100 text-pink-700",
    Sales: "bg-green-100 text-green-700",
    Development: "bg-orange-100 text-orange-700",
    Operations: "bg-yellow-100 text-yellow-700",
    Engineering: "bg-cyan-100 text-cyan-700",
    Other: "bg-gray-100 text-gray-700",
  };

  const isSelected = (section: string, value: string) => {
    if (section === "Date posted") {
      const isoDate = filters[section]?.[0];
    
      if (value === "anytime") {
        return !filters[section] || filters[section].length === 0;
      }
    
      const dateFromValueMap: Record<string, number> = {
        "past_24_hours": 1,
        "past_week": 7,
        "past_month": 30,
      };
    
      const daysAgo = dateFromValueMap[value];
      if (!daysAgo || !isoDate) return false;
    
      const expectedDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
    
      return isoDate === expectedDate;
    }
    
  
    if (section === "Number of Applications") {
      const appRange = filters[section] as { minApplications: number; maxApplications: number };
      if (!appRange) return false;
      const valueMap: { [key: string]: [number, number] } = {
        "Less than 5 Applications": [0, 5],
        "5 - 10 Applications": [5, 10],
        "10 - 15 Applications": [10, 15],
        "15 - 20 Applications": [15, 20],
        "20 - 25 Applications": [20, 25],
      };
      const [min, max] = valueMap[value] || [];
      return appRange.minApplications === min && appRange.maxApplications === max;
    }
  
    if (section === "Task Pay") {
      const payRange = filters[section] as unknown as { minPay: number; maxPay: number };
      if (!payRange) return false;
      const valueMap: { [key: string]: [number, number] } = {
        "$50K - $80K": [50000, 80000],
        "$80K - $100K": [80000, 100000],
        "$100K - $120K": [100000, 120000],
        "$120K - $150K": [120000, 150000],
        "$150K - $200K": [150000, 200000],
        "Above $200K": [200000, 1000000000],
      };
      const [min, max] = valueMap[value] || [];
      return payRange.minPay === min && payRange.maxPay === max;
    }
  
    // default array-based match
    return Array.isArray(filters[section]) && (filters[section] as string[]).includes(value);
  };
  

  return (
    <div className="w-full lg:w-60 bg-white font-Satoshi text-gray-800 rounded-lg">
      <div className="flex justify-between items-center px-4 py-2 mb-4 border-b border-b-gray-300">
        {/* <button onClick={onClick} className="text-blue-500 hover:underline text-sm">Apply</button> */}
        <button onClick={clearAll} className="text-red-500 hover:underline text-sm">Clear all</button>
      </div>

      {filterSections.map((section) => (
        <div key={section.title} className="p-4 border-b border-b-gray-300">
          <h3
            className="flex justify-between items-center text-sm font-medium mb-4 cursor-pointer"
            onClick={() => toggleListVisibility(section.title)}
          >
            {section.title}
            {showList[section.title] ? <BsChevronUp /> : <BsChevronDown />}
          </h3>

          {showList[section.title] && (
            <div className="space-y-3">
              {section.options.map((option) => (
                <label key={option.value} className="flex items-center gap-2 text-xs pl-6 cursor-pointer">
                  <span
                    onClick={() => toggleOption(section.title, option.value)}
                    className={`flex items-center justify-center w-4 h-4 rounded-md border transition-all
                      ${
                        isSelected(section.title, option.value)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 bg-white"
                      }
                      ${
                        section.exclusive ? "rounded-full" : "rounded-md"
                      }
                    `}
                  >
                    {isSelected(section.title, option.value) && <IoMdCheckmark className="text-blue-500 text-xs" />}
                  </span>

                  <span
                    className={`${
                      section.title === "Skill" ? `px-3 py-1 rounded-full font-medium ${skillColors[option.value]}` : "text-sm"
                    }`}
                  >
                    {option.label}
                  </span>

                  {option.count > 0 && (
                    <span className="text-gray-400 ml-auto text-xs">{option.count}</span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filter;
