import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Text, Box, Flex, Divider, Heading } from '@chakra-ui/react';

import { formatCurrency } from 'utils';
import { Expense, CategoryObject } from 'utils/types';
import { ca } from 'date-fns/locale';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface SpendingBreakdownProps {
  expenses: Expense[];
  categories: CategoryObject[];
}

export default function SpendingBreakdown(props: SpendingBreakdownProps) {
  const { expenses, categories } = props;

  return (
    <>
      <Heading
        as="h4"
        fontSize={['28px', '28px', '18px', '22px', '28px']}
        textAlign="center"
      >
        Expense Breakdown
      </Heading>
      <Pie
        data={{
          labels: categories?.map((cat) => cat.name),
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
        }}
        options={{
          layout: { padding: 10 },
          plugins: {
            legend: {
              position: 'top',
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

      <Box px={4}>
        {categories
          // Get Total Spending By Category
          ?.map((cat) => {
            const total = expenses?.reduce((prev: any, curr: any) => {
              return curr.category_id === cat.category_id
                ? Number(prev) + Number(curr.amount)
                : Number(prev);
            }, 0);

            return { name: cat.name, amount: total };
          })
          // Sort the Spending in Descending Order
          .sort((a, b) => b.amount - a.amount)
          // Map it to JSX
          .map((category, key) => (
            <React.Fragment key={key}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                py={2}
                fontSize={14}
              >
                <Text>{category.name}</Text>
                <Text>{formatCurrency(category.amount)}</Text>
              </Flex>
              <Divider borderColor="blackAlpha.500" />
            </React.Fragment>
          ))}
      </Box>
    </>
  );
}

const TEMP_DATA = [
  { label: 'Groceries', value: 323 },
  { label: 'Tattoo', value: 120 },
  { label: 'Solo Dining', value: 53 },
  { label: 'Group Dinner', value: 12 },
  { label: 'Gas', value: 392 },
  { label: 'Dinner Date', value: 323 },
  { label: 'Misc', value: 0 },
  { label: 'Nightlife/Going out', value: 73 },
  { label: 'Fitness/Health', value: 0 },
  { label: 'Travel', value: 1303 },
];
