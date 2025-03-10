import React from 'react';
import Cards from './Cards';
import Chart from './Chart/Chart';

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

const Main = ({user}:UserCardProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-[40px] text-black font-bold'>Hello {user?.firstName}</h1>
      <p className='text-[22px] font-normal text-[#585858]'>
        Your wallet is ready—secure, fast, and always within reach. Manage your
        funds easily and unlock new possibilities with every transaction.
      </p>
      <Cards />
      <Chart />
    </div>
  );
};

export default Main;
