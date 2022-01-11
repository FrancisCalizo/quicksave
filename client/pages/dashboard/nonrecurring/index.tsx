import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Nonrecurring() {
  return (
    <>
      {/* Middle Section */}
      <Flex w={['100%', '100%', '60%', '60%', '55%']} flexDir="column" overflow="auto" minH="100vh">
        <h3>Nonrecurring</h3>
      </Flex>

      {/* Right Section */}
      <Flex
        w={['100%', '100%', '30%']}
        bgColor="#F5F5F5"
        flexDir="column"
        overflow="auto"
        minW={[null, null, '300px', '300px', '400px']}
      >
        <h3>NonrecurringRight</h3>
      </Flex>
    </>
  );
}

Nonrecurring.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
