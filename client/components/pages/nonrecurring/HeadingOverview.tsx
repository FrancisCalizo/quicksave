import React from 'react';
import CountUp from 'react-countup';

import { Flex, Heading, Box } from '@chakra-ui/react';

import { formatCurrency } from 'utils';

type TempAmount = {
  limit: number;
  spent: number;
  remaining: number;
};

interface HeadingOverviewProps {
  tempAmount: TempAmount;
}

export default function HeadingOverview({ tempAmount }: HeadingOverviewProps) {
  const handleFormatCurrency = React.useCallback(
    (value: number) => formatCurrency(value),
    [tempAmount]
  );

  return (
    <Flex
      flexDirection={['column', 'column', 'column', 'row']}
      alignItems="center"
      justifyContent="space-between"
      mt={2}
      mb={4}
    >
      <Box
        w="full"
        px={2}
        py={4}
        my={2}
        boxShadow="md"
        rounded="md"
        overflow="hidden"
        bg="gray.50"
        border="1px solid gainsboro"
      >
        <Heading size="sm" textAlign="center" mb={2} color="blackAlpha.700">
          Spending Limit
        </Heading>

        <CountUp
          start={0}
          end={tempAmount.limit}
          delay={0}
          duration={2}
          decimals={2}
          formattingFn={handleFormatCurrency}
        >
          {({ countUpRef }) => (
            <Heading size="md" textAlign="center">
              <span ref={countUpRef} />
            </Heading>
          )}
        </CountUp>
      </Box>

      <Box
        w="full"
        px={2}
        py={4}
        my={2}
        mx={4}
        boxShadow="md"
        rounded="md"
        overflow="hidden"
        bg="gray.50"
        border="1px solid gainsboro"
      >
        <Heading size="sm" textAlign="center" mb={2} color="blackAlpha.700">
          Total Spent
        </Heading>

        <CountUp
          start={0}
          end={tempAmount.spent}
          delay={0}
          duration={2}
          decimals={2}
          formattingFn={handleFormatCurrency}
        >
          {({ countUpRef }) => (
            <Heading size="md" textAlign="center">
              <span ref={countUpRef} />
            </Heading>
          )}
        </CountUp>
      </Box>

      <Box
        w="full"
        px={2}
        py={4}
        my={2}
        boxShadow="md"
        rounded="md"
        overflow="hidden"
        bg="gray.50"
        border="1px solid gainsboro"
      >
        <Heading size="sm" textAlign="center" mb={2} color="blackAlpha.700">
          Remaining Balance
        </Heading>

        <CountUp
          start={0}
          end={tempAmount.remaining}
          delay={0}
          duration={2}
          decimals={2}
          formattingFn={handleFormatCurrency}
        >
          {({ countUpRef }) => (
            <Heading
              size="md"
              textAlign="center"
              color={+tempAmount.remaining < 0 ? 'red.500' : 'green.500'}
            >
              <span ref={countUpRef} />
            </Heading>
          )}
        </CountUp>
      </Box>
    </Flex>
  );
}
