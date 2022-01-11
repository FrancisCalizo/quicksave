import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Quicksave App</title>
        <meta name="description" content="Quicksave expense tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w={['100%', '100%', '60%', '60%', '55%']} flexDir="column" overflow="auto" minH="100vh">
        <h3>Overview</h3>
      </Flex>
    </>
  );
}

Dashboard.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
