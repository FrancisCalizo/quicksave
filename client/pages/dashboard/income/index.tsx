import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import PageTitle from 'components/layout/dashboard/PageTitle';

export default function Income() {
  return (
    <Flex flex={1} flexDir="column" overflow="auto" minH="100vh" px={4} py={6}>
      <PageTitle
        title="My Income"
        description="Measure your monthly income earned"
      />
    </Flex>
  );
}

Income.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
