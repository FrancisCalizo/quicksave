import Head from 'next/head';
import NextLink from 'next/link';

import { Button, Center, Link } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Quicksave App</title>
        <meta name="description" content="Quicksave expense tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center h="100vh">
        <Link as={NextLink} href={'/dashboard'}>
          <Button colorScheme="green">Go to Dashboard</Button>
        </Link>
      </Center>
    </>
  );
}
