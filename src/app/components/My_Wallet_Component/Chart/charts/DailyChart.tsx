import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';

const YearChart = () => {
  return (
    <div>
      <CChart
        type='bar'
        data={{
          labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ],
          datasets: [
            {
              label: 'Task Reports',
              backgroundColor: '#2877ea',
              data: [10, 40, 39, 80, 40, 20],
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
