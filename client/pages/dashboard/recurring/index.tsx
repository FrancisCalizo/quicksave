import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Recurring() {
  return (
    <Flex w={['100%', '100%', '60%', '60%', '55%']} flexDir="column" overflow="auto" minH="100vh">
      <h3>Recurring</h3>
    </Flex>
  );
}

Recurring.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
