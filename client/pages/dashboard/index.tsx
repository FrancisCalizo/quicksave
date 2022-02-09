import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import PageTitle from 'components/layout/dashboard/PageTitle';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Quicksave App</title>
        <meta name="description" content="Quicksave expense tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        w={['100%', '100%', '60%', '60%', '55%']}
        flexDir="column"
        overflow="auto"
        minH="100vh"
        px={4}
        py={6}
      >
        <PageTitle title="Overview" description="A summary of your budget" />
      </Flex>
    </>
  );
}

Dashboard.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
