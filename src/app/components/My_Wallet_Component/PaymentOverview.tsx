import Image from "next/image";
import bg from "../../../../public/assets/my_wallet/paymentOverviewRec.png"

const PaymentOverview: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold">Payment Overview</h1>
      <div className="relative grid grid-cols-1 md:grid-cols-3 p-4  lg:p-3 rounded-lg">
        {/* bg lines */}
        <Image src={bg} alt="lines" layout="responsive" width={100} height={100} objectFit="cover" className="absolute hidden lg:block" />
        {/* Card 1 */}
        <div className="flex flex-col gap-3 border-r last:border-none p-4 text-left">
          <p className="text-gray-500">Total Spent on Tasks</p>
          <p className="text-2xl font-bold">$150.00</p>
          <div className="flex items-center gap-3">
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
              Today
            </span>
            <span className="bg-white border border-[#0000004D] text-[#828282] px-2 py-1 rounded-[5px] text-sm">
              Today
            </span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col gap-3 border-r last:border-none p-4">
          <p className="text-gray-500">Total Spent on Tasks</p>
          <p className="text-xl font-bold">$150.00</p>
          <div className="mt-2 px-2 py-1 bg-[#414FC9] text-sm text-white rounded w-max">
            Fund Wallet
          </div>
        </div>
        {/* Card 3  */}
        <div className="flex flex-col gap-3 border-r last:border-none p-4 text-left">
          <p className="text-gray-500">Total Spent on Tasks</p>
          <p className="text-2xl font-bold">$150.00</p>
          <div className="flex items-center gap-3">
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
              Today
            </span>
            <span className="bg-white border border-[#0000004D] text-[#828282] px-2 py-1 rounded-[5px] text-sm">
              Today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverview;
