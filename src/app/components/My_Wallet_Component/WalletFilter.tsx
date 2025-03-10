"use client";

const WalletFilter: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6  border">
      <h3 className="font-bold text-lg text-lg mb-4">Filters</h3>

      <h4 className="font-medium text-base mb-2">Sort</h4>
      <div className="relative">
        <select className="w-full p-3 border rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none">
        <option>Writing</option>
      <option>Review</option>
      <option>Delivery</option>
      <option>Survey</option>
        </select>
      </div>

      <h4 className="font-medium text-base mt-4 mb-2">Dates</h4>
      <div className="space-y-3">
        {["Today", "7 days", "30 Days", "All time"].map((label, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600 rounded-md border-gray-300"
            />
            <label className="text-gray-700">{label}</label>
          </div>
        ))}
      </div>

      <button className="bg-blue-600 text-white font-medium text-base py-2 w-full mt-6 rounded-lg hover:bg-blue-700 transition">
        Apply
      </button>
    </div>
  );
};

export default WalletFilter;











// "use client"

// const WalletFilter: React.FC = () => {
//   return (
//     <div className="bg-white shadow p-4 rounded-lg">
//     <h3 className="font-semibold mb-2">Sort</h3>
//     <select className="w-full p-2 border rounded-lg">
      // <option>Writing</option>
      // <option>Review</option>
      // <option>Delivery</option>
      // <option>Survey</option>
//     </select>
//     <h3 className="font-semibold mt-4">Dates</h3>
//     <div className="space-y-2">
//       {["Today", "7 Days", "30 Days", "All time"].map(
//         (label, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <input type="checkbox" />
//             <label>{label}</label>
//           </div>
//         )
//       )}
//     </div>
//   </div>
//   )
// }

// export default WalletFilter
