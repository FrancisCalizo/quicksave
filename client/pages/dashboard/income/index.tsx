import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Income() {
  return (
    <Flex w={['100%', '100%', '60%', '60%', '55%']} flexDir="column" overflow="auto" minH="100vh">
      <h3>Income</h3>
    </Flex>
  );
}

Income.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;