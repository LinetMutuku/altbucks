"use client";

import { useState } from "react";
import { BsChevronUp } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
}

interface FilterProps {
  onClick: () => void;
  filters: { [key: string]: string[] };
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters, onClick }) => {
  const filterSections: FilterSection[] = [
    {
      title: "Date posted",
      options: [
        { label: "Anytime", value: "anytime", count: 0 },
        { label: "Past week", value: "past_week", count: 0 },
        { label: "Past month", value: "past_month", count: 0 },
        { label: "Past 24 hours", value: "past_24_hours", count: 0 },
      ],
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
      const sectionFilters = prev[section] || [];
      return {
        ...prev,
        [section]: sectionFilters.includes(value)
          ? sectionFilters.filter((v) => v !== value)
          : [...sectionFilters, value],
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

  return (
    <div className="w-full lg:w-60 bg-white font-Satoshi text-gray-800 rounded-lg">
      <div className="flex justify-between items-center  px-4 py-2 mb-4 border-b border-b-gray-300">
        <button
            onClick={onClick}
            className="text-blue-500 hover:underline text-sm"
        >
          Apply
        </button>
        <button
          onClick={clearAll}
          className="text-red-500 hover:underline text-sm"
        >
          Clear all
        </button>
      </div>
      {filterSections.map((section) => (
        <div key={section.title} className="p-4">
          <div className="border-b border-b-gray-300 pb-6">
            <h3 className="flex justify-between items-center text-sm font-medium mb-4 cursor-pointer"
            onClick={() => toggleListVisibility(section.title)}
            >
              {section.title} <BsChevronUp className={`text-xl ${
                  showList[section.title]} cursor-pointer`}
                   />
            </h3>
            <div className="space-y-3">
              {showList[section.title] && (section.title === "Skill"
                ? section.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 pl-6 text-xs"
                    >                  
                    <span
                    className={`flex items-center justify-center w-4 h-4 rounded-md border transition-all cursor-pointer
                    ${
                      filters[section.title]?.includes(option.value)
                        ? "border-blue-500"
                        : "border-gray-300 bg-white"
                    }`}
                    onClick={() => toggleOption(section.title, option.value)}
                  >
                    {filters[section.title]?.includes(option.value) && (
                      <IoMdCheckmark className="text-blue-500"/>
                    )}
                  </span>
                      <span
                        className={`px-3 py-1 rounded-full font-medium ${skillColors[option.value]}`}
                      >
                        {option.label}
                      </span>
                      {option.count > 0 && (
                        <span className="text-gray-400 ml-auto">{option.count}</span>
                      )}
                    </label>
                  ))
                : section.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center text-gray-400 gap-4 text-xs pl-6"
                    >
                  <span
                    className={`flex items-center justify-center w-4 h-4 rounded-md border transition-all cursor-pointer
                    ${
                      filters[section.title]?.includes(option.value)
                        ? "border-blue-500"
                        : "border-gray-300 bg-white"
                    }`}
                    onClick={() => toggleOption(section.title, option.value)}
                  >
                    {filters[section.title]?.includes(option.value) && (
                      <IoMdCheckmark className="text-blue-500"/>
                    )}
                  </span>
                  <span className="text-sm">{option.label}</span>
                  {option.count > 0 && (
                    <span className="text-gray-400 ml-auto">{option.count}</span>
                  )}
                    </label>
                  )))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filter;
