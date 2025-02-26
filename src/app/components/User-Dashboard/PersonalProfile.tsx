
import React from 'react';
import Image from 'next/image';
import profileImg from "../../../../public/assets/Ellipse68.png";  // Import the image
import Link from 'next/link';

interface User{
  _id:number,
  firstName:string,
  email:string,
  lastName:string,
  phoneNumber:string,
}

interface UserCardProps{
  user:User
}

const PersonalProfile: React.FC<UserCardProps> = ({user}) => {
  return (
      <div className="lg:w-[448px] md:w-[900px] lg:h-[440px] bg-white border border-blue-600 hover:border-2
        hover:border-blue-600 transition-all rounded-lg px-6 py-10 flex flex-col items-center ml-6 sm:mr-2">
        <div className="w-[323px] h-[259px] flex flex-col items-center gap-6 font-mulish">
          {/* Avatar and Name Section */}
          <div className="relative w-[161px] h-[160px] flex justify-center items-center">
            {/* Avatar and Name Section */}
            <div className="relative w-[161px] h-[160px] flex justify-center items-center">
              {/* Circle background */}
              <div className="absolute w-[80px] h-[80px] bg-[#51AF4E] rounded-full z-0"></div>

              {/* Avatar Image */}
              <Image
                  src={profileImg} // Use the imported image URL
                  alt="User Avatar"
                  width={70}
                  height={70}
                  className="rounded-full z-10" // Ensure this is above the green background
              />
            </div>



            {/* Name and ID */}
            <div className="absolute top-[96px] text-center mt-5 flex flex-col gap-2">
              <p className="text-2xl font-bold text-[#18181B] mt-5 font-mulish">{user?.firstName} {user?.lastName}</p>
              <p className="text-base font-medium text-[#949396] font-mulish">ID: {user?._id}</p>
              <div className="items-center justify-center py-1 px-3 bg-[#ECFDF3] font-mulish rounded-full text-sm font-medium text-[#0F8152]">
                Online
              </div>
              <p className="text-center text-sm font-medium text-[#949396] mt-2">
                Your profile is 80% complete. Finish setting up
              </p>
              <button className="w-[265px] h-[41px] bg-[#2877EA] rounded-lg font-mulish text-white text-sm font-medium flex justify-center items-center gap-2 mt-3">
                <Link href={"/profile"}>View Profile</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PersonalProfile;
