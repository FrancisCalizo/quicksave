import { Flex, Button, Icon } from '@chakra-ui/react';

import { FaPlus } from 'react-icons/fa';
import { MdLabel } from 'react-icons/md';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Nonrecurring() {
  return (
    <>
      {/* Middle Section */}
      <Flex
        w={['100%', '100%', '60%', '60%', '55%']}
        direction="column"
        overflow="auto"
        minHeight="100vh"
        px={4}
        py={6}
      >
        <Flex justify="flex-end" align="center">
          <Button leftIcon={<Icon as={FaPlus} />} mr={4} size="sm">
            Add Label
          </Button>
          <Button colorScheme="green" leftIcon={<Icon as={FaPlus} />} size="sm">
            Add Expense
          </Button>
        </Flex>
      </Flex>

      {/* Right Section */}
      <Flex
        w={['100%', '100%', '30%']}
        bgColor="#F5F5F5"
        flexDir="column"
        overflow="auto"
        minW={[null, null, '300px', '300px', '400px']}
      >
        <h3>NonrecurringRight</h3>
      </Flex>
    </>
  );
}

Nonrecurring.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
