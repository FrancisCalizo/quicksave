import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import PageTitle from 'components/layout/dashboard/PageTitle';

export default function Investing() {
  return (
    <Flex
      w={['100%', '100%', '60%', '60%', '55%']}
      flexDir="column"
      overflow="auto"
      minH="100vh"
      px={4}
      py={6}
    >
      <PageTitle
        title="My Investing"
        description="Track how much of your incomes goes towards investments"
      />
    </Flex>
  );
}

Investing.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
