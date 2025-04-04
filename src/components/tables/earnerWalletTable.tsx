import { useEffect } from 'react';
import ApexCharts from 'apexcharts';

interface WorkerEngagement {
  date: string; 
  count: number;
}

interface BarChartProps {
  workerEngagements: WorkerEngagement[];
}

const BarChart: React.FC<BarChartProps> = ({ workerEngagements }) => {
  useEffect(() => {
    const monthsMap = new Map<string, number>();

    workerEngagements.forEach(({ date, count }) => {
      const [year, month] = date.split('-');
      const monthIndex = parseInt(month, 10) - 1;

      const monthName = new Date(0, monthIndex).toLocaleString('en-US', { month: 'short' }); 
      const key = `${monthName} ${year}`; 

      monthsMap.set(key, (monthsMap.get(key) || 0) + count);
    });

    const categories = Array.from(monthsMap.keys());
    const dataValues = Array.from(monthsMap.values());

    const chartConfig = {
      series: [
        {
          name: 'Worker Engagement',
          data: dataValues,
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
        type: 'category',
        categories,
        labels: {
          style: { colors: '#616161', fontSize: '12px', fontWeight: 400 },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => `${value} Workers`,
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
          formatter: (value: number) => `${value} Workers`,
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#bar-chart'), chartConfig);
    chart.render();

    return () => chart.destroy();
  }, [workerEngagements]);

  return (
    <div className="relative flex flex-col rounded-xl bg-white text-gray-700">
      <div className="p-2">
        <div id="bar-chart"></div>
      </div>
    </div>
  );
};

export default BarChart;
