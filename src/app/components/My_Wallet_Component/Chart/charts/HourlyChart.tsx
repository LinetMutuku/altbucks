import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';

const YearChart = () => {
  return (
    <div>
      <CChart
        type='bar'
        data={{
          labels: ['01:00', '06:00', '12:00', '18:00', '24:00'],
          datasets: [
            {
              label: 'Task Report',
              backgroundColor: '#2877ea',
              data: [20, 40, 16, 50, 10],
            },
          ],
        }}
        
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
        }}
      />
    </div>
  );
};

export default YearChart;
