import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { formatCurrency } from 'utils';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      datalabels: { anchor: 'end' },
      borderWidth: 1,
    },
  ],
};

export default function SpendingBreakdown() {
  return (
    <Pie
      data={data as any}
      options={{
        layout: { padding: 10 },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 30 },
          },
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.borderColor as any;
            },
            borderColor: 'white',
            borderWidth: 2,
            color: 'white',

            font: {
              weight: 'bold',
              size: 12,
            },
            padding: 6,
            formatter: (value) => {
              return formatCurrency(value);
            },
          },
        },
      }}
    />
  );
}
