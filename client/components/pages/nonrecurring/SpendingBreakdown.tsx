import React, { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { transparentize } from 'polished';
import { Pie } from 'react-chartjs-2';

import { Text, Box, Flex, Divider, Heading } from '@chakra-ui/react';

import { formatCurrency, CATEGORY_COLORS } from 'utils';
import { Expense, CategoryObject } from 'utils/types';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface SpendingBreakdownProps {
  expenses: Expense[];
  categories: CategoryObject[];
}

export default function SpendingBreakdown(props: SpendingBreakdownProps) {
  const { expenses, categories } = props;

  const [breakdownData, setBreakdownData] = useState<any[]>([]);

  useEffect(() => {
    (function calculateSpendingBreakdown() {
      const res = categories
        // Get Total Spending By Category
        ?.map((cat) => {
          const total = expenses?.reduce((prev: any, curr: any) => {
            return curr.category_id === cat.category_id
              ? Number(prev) + Number(curr.amount)
              : Number(prev);
          }, 0);

          const colorHex = CATEGORY_COLORS.find(
            (c) => c.label.toLowerCase() === cat.color.toLowerCase()
          )!.rgb;

          return { name: cat.name, amount: total, colorHex };
        })
        // Sort the Spending in Descending Order
        .sort((a, b) => b.amount - a.amount);

      setBreakdownData(res);
    })();
  }, [expenses]);

  return (
    <>
      <Heading
        as="h4"
        fontSize={['28px', '28px', '18px', '22px', '28px']}
        textAlign="center"
      >
        Expense Breakdown
      </Heading>

      <Text
        fontSize="xs"
        fontWeight="normal"
        color="gray.500"
        textAlign="center"
        mt={1}
      >
        Hover over chart to view categories
      </Text>

      <Box px={4}>
        <Pie
          data={{
            labels: breakdownData
              .filter((data) => data.amount > 0)
              .map((cat) => cat.name),
            datasets: [
              {
                data: breakdownData
                  .filter((data) => data.amount > 0)
                  .map((cat) => cat.amount),
                backgroundColor: breakdownData
                  .filter((data) => data.amount > 0)
                  .map((cat) => transparentize(0.5, cat.colorHex)),
                borderColor: breakdownData
                  .filter((data) => data.amount > 0)
                  .map((cat) => cat.colorHex),
                datalabels: { anchor: 'end' },
                borderWidth: 1,
              },
            ],
          }}
          options={{
            layout: { padding: 20 },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (toolTipItem) =>
                    `${toolTipItem.label}: ${formatCurrency(
                      Number(toolTipItem.formattedValue)
                    )}`,
                },
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
                formatter: (value) => {
                  return formatCurrency(value);
                },
              },
            },
          }}
        />
      </Box>

      <Box px={4}>
        {breakdownData
          // Map it to JSX
          ?.map((category, key) => (
            <React.Fragment key={key}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                py={2}
                fontSize={[14, 14, 12, 14]}
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
