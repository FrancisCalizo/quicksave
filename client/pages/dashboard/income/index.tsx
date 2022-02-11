import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useQueryClient } from 'react-query';
import { FaPlus } from 'react-icons/fa';

import {
  Flex,
  Box,
  Icon,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import FixedIncomeTable from 'components/pages/income/FixedIncomeTable';
import PageTitle from 'components/layout/dashboard/PageTitle';
import { useFetchFixedIncome } from 'components/hooks/queries/useFetchFixedIncome';
import DeleteFixedIncomeModal from 'components/pages/income/DeleteFixedIncomeModal';
import AddFixedIncomeModal from 'components/pages/income/AddFixedIncomeModal';

export default function Income() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Load User Expense Categories
  const { data: fixedIncome, isLoading: isFixedIncomeLoading } =
    useFetchFixedIncome();

  const {
    isOpen: isAddFixedIncomeOpen,
    onOpen: onAddFixedIncomeOpen,
    onClose: onAddFixedIncomeClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteFixedIncomeOpen,
    onOpen: onDeleteFixedIncomeOpen,
    onClose: onDeleteFixedIncomeClose,
  } = useDisclosure();

  const [selectedRowInfo, setSelectedRowInfo] = useState<any>({});

  const handleDeleteFixedIncome = async (id: number) => {
    try {
      await axios.delete(`/deleteFixedIncome/${id}`);

      await queryClient.invalidateQueries(['fixedIncome']);

      onDeleteFixedIncomeClose();

      toast({
        title: 'Success!',
        description: 'Fixed Income was deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (error) {
      console.error(error);

      toast({
        title: 'Oops!',
        description: 'There was an error processing your request.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  if (isFixedIncomeLoading) {
    return null;
  }

  return (
    <Flex flex={1} flexDir="column" overflow="auto" minH="100vh" px={4} py={6}>
      <PageTitle
        title="My Income"
        description="Measure your monthly income earned"
      />

      <Flex justify="flex-end" align="center" mt={2} mb={[2, 6, 6, 2]}>
        <Button
          colorScheme="green"
          leftIcon={<Icon as={FaPlus} />}
          onClick={onAddFixedIncomeOpen}
          width={['100%', '100%', '100%', 'inherit']}
        >
          Add Fixed Income
        </Button>
      </Flex>

      <Box my={6}>
        <FixedIncomeTable
          data={fixedIncome?.data}
          setSelectedRowInfo={setSelectedRowInfo}
          onDeleteFixedIncomeOpen={onDeleteFixedIncomeOpen}
          // onEditCategoryOpen={onEditCategoryOpen}
        />
      </Box>

      <Flex justify="flex-end" align="center" mt={2} mb={[2, 6, 6, 2]}>
        <Button
          colorScheme="blue"
          leftIcon={<Icon as={FaPlus} />}
          // onClick={onAddCategoryOpen}
          width={['100%', '100%', '100%', 'inherit']}
        >
          Add One-Time Income
        </Button>
      </Flex>

      {/* Add FixedIncome Modal */}
      <AddFixedIncomeModal
        isAddFixedIncomeOpen={isAddFixedIncomeOpen}
        onAddFixedIncomeClose={onAddFixedIncomeClose}
      />

      {/* Delete Fixed Income Modal */}
      <DeleteFixedIncomeModal
        isDeleteFixedIncomeOpen={isDeleteFixedIncomeOpen}
        onDeleteFixedIncomeClose={onDeleteFixedIncomeClose}
        handleDeleteFixedIncome={handleDeleteFixedIncome}
        selectedRowInfo={selectedRowInfo}
      />
    </Flex>
  );
}

Income.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
