import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addMonths, subMonths } from "date-fns";

interface SearchByDateProps {
  initialFrom?: Date | null;
  initialTo?: Date | null;
  onApply: (dates: { fromDate: string; toDate: string }) => void;
  onCancel?: () => void;
}

const SearchByDate: React.FC<SearchByDateProps> = ({
  initialFrom = null,
  initialTo = null,
  onApply,
  onCancel,
}) => {
  const [fromDate, setFromDate] = useState<Date | null>(initialFrom);
  const [toDate, setToDate] = useState<Date | null>(initialTo);

  // Navigation between months
  const navigateMonth = (
    date: Date | null,
    direction: "prev" | "next",
    setter: React.Dispatch<React.SetStateAction<Date | null>>
  ) => {
    if (date) {
      setter(direction === "prev" ? subMonths(date, 1) : addMonths(date, 1));
    }
  };

  // Reset dates
  const handleCancel = () => {
    setFromDate(null);
    setToDate(null);
    onCancel?.();
  };

  // Format dates and pass to parent
  const handleApply = () => {
    if (!fromDate || !toDate) return;
    onApply({
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
    });
  };

  return (
    <div className="max-w-full bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Search by Date</h2>
      
      {/* Date Range Display */}
      <div className="flex gap-2 items-center justify-between">
        <label className="text-sm text-gray-800 font-bold w-full whitespace-nowrap">
          Date Range:
        </label>
        <div className="flex items-center space-x-1 mt-1">
          <input
            type="text"
            placeholder="MM/DD/YYYY"
            className="border border-gray-300 text-[14px] rounded-md p-1 w-[98px] placeholder:text-xs"
            value={fromDate ? format(fromDate, "MM/dd/yyyy") : ""}
            readOnly
          />
          <span>→</span>
          <input
            type="text"
            placeholder="MM/DD/YYYY"
            className="border border-gray-300 text-[14px] rounded-md p-1 w-[98px] placeholder:text-xs"
            value={toDate ? format(toDate, "MM/dd/yyyy") : ""}
            readOnly
          />
        </div>
      </div>
      
      {/* From Date Picker */}
      <div className="flex gap-2 items-center justify-between">
        <label className="text-sm text-gray-800 font-bold">From:</label>
        <div className="flex items-center mt-1 space-x-4">
          <button 
            className="border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={() => navigateMonth(fromDate, "prev", setFromDate)}
          >
            ←
          </button>
          <DatePicker
            selected={fromDate}
            onChange={setFromDate}
            dateFormat="MMMM yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Select From Date"
            customInput={
              <input 
                className="border border-gray-300 rounded-md p-2 w-[120px] text-[13px]" 
                readOnly
              />
            }
          />
          <button 
            className="border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={() => navigateMonth(fromDate, "next", setFromDate)}
          >
            →
          </button>
        </div>
      </div>
      
      {/* To Date Picker */}
      <div className="flex gap-2 items-center justify-between">
        <label className="text-sm text-gray-800 font-bold">To:</label>
        <div className="flex items-center mt-1 space-x-4">
          <button 
            className="border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={() => navigateMonth(toDate, "prev", setToDate)}
          >
            ←
          </button>
          <DatePicker
            selected={toDate}
            onChange={setToDate}
            dateFormat="MMMM yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Select End Date"
            customInput={
              <input 
                className="border border-gray-300 rounded-md p-2 w-[120px] text-[13px]" 
                readOnly
              />
            }
          />
          <button 
            className="border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={() => navigateMonth(toDate, "next", setToDate)}
          >
            →
          </button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between space-x-4">
        <button
          className="px-8 py-2 w-full text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-8 py-2 w-full text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleApply}
          disabled={!fromDate || !toDate}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SearchByDate;








// import React, { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, addMonths, subMonths } from "date-fns";
// import api from "@/lib/api";
// import { API_URL } from "@/lib/utils";

// interface SearchByDateProps {
//   onReferralData?: (
//     data: any[], 
//     pagination: { totalPages: number; total: number },
//     formattedFromDate: string, 
//     formattedToDate: string,
//     rangeText: string // New
//   ) => void;
  
//   onPaginationChange?: (page: number) => void;
//   currentPage?: number;
// }


// const DATE_FORMAT = "MM/dd/yyyy";
// const DEFAULT_LIMIT: any = "2";

// const SearchByDate: React.FC<SearchByDateProps> = ({ onReferralData, onPaginationChange, currentPage }) => {
//   const [fromDate, setFromDate] = useState<Date | null>(null);
//   const [toDate, setToDate] = useState<Date | null>(null);
//   const [page] = useState(1);

// console.log("current page", currentPage)
//   const router = useRouter();
//   const pathname = usePathname();

//   const resetDates = () => {
//     setFromDate(null);
//     setToDate(null);
//   };

//   const handleDateChange = (
//     date: Date | null,
//     setter: React.Dispatch<React.SetStateAction<Date | null>>
//   ) => {
//     setter(date);
//   };

//   const navigateMonth = (
//     date: Date | null,
//     direction: "prev" | "next",
//     setter: React.Dispatch<React.SetStateAction<Date | null>>
//   ) => {
//     if (date) {
//       setter(direction === "prev" ? subMonths(date, 1) : addMonths(date, 1));
//     }
//   };

//   // Filter the data based on the selected date range
//   const filterDataByDateRange = (data: any[], fromDate: Date | null, toDate: Date | null) => {
//     if (!fromDate || !toDate) return data;

//     return data.filter((item) => {
//       const itemDate = new Date(item.createdAt); 
//       return itemDate >= fromDate && itemDate <= toDate;
//     });
//   };

//   const fetchReferralData = async () => {
//     const pageToUse = currentPage || 1;

//     const queryParams: Record<string, string> = {
//       page: pageToUse?.toString() || "1",
//       limit: DEFAULT_LIMIT,
//     };
  
//     const formattedFromDate = fromDate ? format(fromDate, "MMMM yyyy") : '';
//     const formattedToDate = toDate ? format(toDate, "MMMM yyyy") : '';
  
//     if (formattedFromDate) queryParams.fromDate = formattedFromDate;
//     if (formattedToDate) queryParams.toDate = formattedToDate;
  
//     const queryString = new URLSearchParams(queryParams).toString();
  
//     const storedData = localStorage.getItem("referralData");
  
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       const filteredData = filterDataByDateRange(parsedData, fromDate, toDate);
  
//       const totalPages = Math.ceil(filteredData.length / DEFAULT_LIMIT);
//       const startIndex = (pageToUse - 1) * DEFAULT_LIMIT;
//       const endIndex = startIndex + DEFAULT_LIMIT;
//       const dataToRender = filteredData.slice(startIndex, endIndex);
//       const rangeText = `${startIndex + 1} - ${Math.min(endIndex, filteredData.length)}`;
  
//       if (onReferralData) {
//         onReferralData(dataToRender, { totalPages, total: filteredData.length }, formattedFromDate, formattedToDate, rangeText);
//       }

//       if (onPaginationChange) {
//         onPaginationChange(pageToUse);
//       }
  
//       if (pathname === "/dashboard/referral") {
//         router.push(`/dashboard/referralResult?${queryString}`);
//       }
  
//       return;
//     }
  
//     try {
//       const response = await api.get(`${API_URL}/api/v1/referrals/?${queryString}`);
//       const { data } = response.data;
//       const filteredData = filterDataByDateRange(data, fromDate, toDate);
    
//       localStorage.setItem("referralData", JSON.stringify(filteredData));
    
//       const totalPages = Math.ceil(filteredData.length / DEFAULT_LIMIT);
//       const startIndex = (page - 1) * DEFAULT_LIMIT;
//       const endIndex = startIndex + DEFAULT_LIMIT;
//       const dataToRender = filteredData.slice(startIndex, endIndex);
//       const rangeText = `${startIndex + 1} - ${Math.min(endIndex, filteredData.length)}`;
    
//       if (onReferralData) {
//         onReferralData(
//           dataToRender,
//           { totalPages, total: filteredData.length },
//           formattedFromDate,
//           formattedToDate,
//           rangeText
//         );
//       }
    
//       if (pathname === "/dashboard/referral") {
//         router.push(`/dashboard/referralResult?${queryString}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch referral data:", err);
//     }
    
//   };
  

//   const renderDateRangeDisplay = () => (
//     <div className="flex items-center space-x-1 mt-1">
//       <input
//         type="text"
//         placeholder="MM/DD/YYYY"
//         className="border border-gray-300 text-[14px] rounded-md p-1 w-[98px] placeholder:text-xs"
//         value={fromDate ? format(fromDate, DATE_FORMAT) : ""}
//         readOnly
//       />
//       <span>→</span>
//       <input
//         type="text"
//         placeholder="MM/DD/YYYY"
//         className="border border-gray-300 text-[14px] rounded-md p-1 w-[98px] placeholder:text-xs"
//         value={toDate ? format(toDate, DATE_FORMAT) : ""}
//         readOnly
//       />
//     </div>
//   );

//   const renderDatePicker = (
//     date: Date | null,
//     onChange: (date: Date | null) => void,
//     onNavigate: (direction: "prev" | "next") => void,
//     placeholder: string
//   ) => (
//     <div className="flex items-center space-x-4">
//       <button 
//         className="border border-gray-300 rounded-md p-2 hover:bg-gray-50"
//         onClick={() => onNavigate("prev")}
//       >
//         ←
//       </button>
//       <DatePicker
//         selected={date}
//         onChange={onChange}
//         dateFormat="MMMM yyyy"
//         showMonthDropdown
//         showYearDropdown
//         dropdownMode="select"
//         placeholderText={placeholder}
//         customInput={ 
//           <input 
//             className="border border-gray-300 rounded-md p-2 w-[120px] text-[13px]" 
//             readOnly
//           />
//         }
//         popperPlacement="bottom"
//       />
//       <button 
//         className="border border-gray-300 rounded-md p-2 hover:bg-gray-50"
//         onClick={() => onNavigate("next")}
//       >
//         →
//       </button>
//     </div>
//   );

//   return (
//     <div className="max-w-full bg-white rounded-lg shadow p-6 space-y-4">
//       <h2 className="text-lg font-semibold">Search by Date</h2>

//       <div className="flex gap-2 items-center justify-between">
//         <label className="text-sm text-gray-800 font-bold whitespace-nowrap">Date Range:</label>
//         {renderDateRangeDisplay()}
//       </div>

//       <div className="flex gap-2 items-center justify-between">
//         <label className="text-sm text-gray-800 font-bold">From:</label>
//         {renderDatePicker(
//           fromDate,
//           (date) => handleDateChange(date, setFromDate),
//           (dir) => navigateMonth(fromDate, dir, setFromDate),
//           "Select From Date"
//         )}
//       </div>

//       <div className="flex gap-2 items-center justify-between">
//         <label className="text-sm text-gray-800 font-bold">To:</label>
//         {renderDatePicker(
//           toDate,
//           (date) => handleDateChange(date, setToDate),
//           (dir) => navigateMonth(toDate, dir, setToDate),
//           "Select End Date"
//         )}
//       </div>

//       <div className="flex justify-between space-x-4">
//         <button
//           className="px-8 py-2 w-full text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
//           onClick={resetDates}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-8 py-2 w-full text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           onClick={fetchReferralData}
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchByDate;


