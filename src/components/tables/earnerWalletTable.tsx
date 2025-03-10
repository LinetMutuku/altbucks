'use client';

import { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const BarChart = () => {
  useEffect(() => {
    const chartConfig = {
      series: [
        {
          name: 'Earnings',
          data: [50, 40, 300, 320, 100, 350, 200, 230, 60, 30, 39, 40],
        },
      ],
      chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      colors: ['#2877EA'],
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 12,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: { colors: '#616161', fontSize: '12px', fontWeight: 400 },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => `$${value}`,
          style: { colors: '#616161', fontSize: '12px', fontWeight: 400 },
        },
      },
      grid: {
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: { lines: { show: true } },
        padding: { top: 5, right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (value: number) => `$${value}`,
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#bar-chart'), chartConfig);
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <div className="relative flex flex-col rounded-xl bg-white text-gray-700 ">
      <div className="relative mx-4  flex flex-col gap-4 md:flex-row md:items-center">
      </div>
      <div className="p-2">
        <div id="bar-chart"></div>
      </div>
    </div>
  );
};

export default BarChart;
