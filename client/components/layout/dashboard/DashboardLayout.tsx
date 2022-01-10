import React from 'react';

import { Flex } from '@chakra-ui/react';

import Sidebar from 'components/layout/dashboard/Sidebar';

export default function DashboardLayout({ children }: any) {
  return (
    <Flex h={[null, null, '100vh']} maxW="2000px" flexDir={['column', 'column', 'row']} overflow="hidden">
      <Sidebar />
      {children}
    </Flex>
  );
}
