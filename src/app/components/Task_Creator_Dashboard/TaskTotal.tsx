'use client'
import React from 'react'
import { RiErrorWarningLine } from "react-icons/ri";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function TaskTotal() {
  return (
    <div className='flex w-full h-fit flex-col border-gray-300 rounded-lg border'>
        <div className='flex border-b border-gray-300 justify-between p-8'>
            <div className='flex flex-col gap-3'>
                <h3 className='text-lg font-semibold text-gray-400'>Task Total</h3>
                <h2 className='text-2xl font-bold'>178</h2>
            </div>
            <div className='flex items-center '>
                <RiErrorWarningLine size={30} color='gray'/>
            </div>
        </div>

        <div className='w-full h-fit'>
        <PieChart width={800} height={400}>
            <Pie
                data={data}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
      </PieChart>
    </div>


    </div>
  )
}
