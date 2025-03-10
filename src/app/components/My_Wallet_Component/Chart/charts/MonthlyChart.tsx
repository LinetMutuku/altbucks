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
            '1st Wk',
            '2nd Wk',
            '3rd Wk',
            '4th Wk',
            '5th Wk',
          ],
          datasets: [
            {
              label: 'Task Report',
              backgroundColor: '#2877ea',
              data: [40, 20, 12, 39, 10],
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
