import { Flex } from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import PageTitle from 'components/layout/dashboard/PageTitle';

export default function Recurring() {
  return (
    <Flex flex={1} flexDir="column" overflow="auto" minH="100vh" px={4} py={6}>
      <PageTitle
        title="Recurring Expenses"
        description="Track recurring expenses that occur consistenly within your budget"
      />
    </Flex>
  );
}

Recurring.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
