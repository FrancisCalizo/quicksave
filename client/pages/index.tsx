import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Quicksave App</title>
        <meta name="description" content="Quicksave expense tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Column 2 */}
      <Flex w={['100%', '100%', '60%', '60%', '55%']} flexDir="column" overflow="auto" minH="100vh">
        <h3>Column 2</h3>
      </Flex>

      {/* Column 3 */}
      <Flex
        w={['100%', '100%', '30%']}
        bgColor="#F5F5F5"
        flexDir="column"
        overflow="auto"
        minW={[null, null, '300px', '300px', '400px']}
      >
        <h3>Column 3</h3>
      </Flex>
    </>
  );
}

Home.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
