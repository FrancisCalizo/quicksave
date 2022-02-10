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
import RecurringIncomeTable from 'components/pages/income/RecurringIncomeTable';
import PageTitle from 'components/layout/dashboard/PageTitle';
import { useFetchRecurringIncome } from 'components/hooks/queries/useFetchRecurringIncome';
import DeleteRecurringIncomeModal from 'components/pages/income/DeleteRecurringIncomeModal';
import AddRecurringIncomeModal from 'components/pages/income/AddRecurringIncomeModal';

export default function Income() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Load User Expense Categories
  const { data: recurringIncome, isLoading: isRecurringIncomeLoading } =
    useFetchRecurringIncome();

  const {
    isOpen: isAddRecurringIncomeOpen,
    onOpen: onAddRecurringIncomeOpen,
    onClose: onAddRecurringIncomeClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteRecurringIncomeOpen,
    onOpen: onDeleteRecurringIncomeOpen,
    onClose: onDeleteRecurringIncomeClose,
  } = useDisclosure();

  const [selectedRowInfo, setSelectedRowInfo] = useState<any>({});

  const handleDeleteRecurringIncome = async (id: number) => {
    try {
      await axios.delete(`/deleteRecurringIncome/${id}`);

      await queryClient.invalidateQueries(['recurringIncome']);

      onDeleteRecurringIncomeClose();

      toast({
        title: 'Success!',
        description: 'Recurring Income was deleted successfully.',
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

  if (isRecurringIncomeLoading) {
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
          onClick={onAddRecurringIncomeOpen}
          width={['100%', '100%', '100%', 'inherit']}
        >
          Add Recurring Income
        </Button>
      </Flex>

      <Box my={6}>
        <RecurringIncomeTable
          data={recurringIncome?.data}
          setSelectedRowInfo={setSelectedRowInfo}
          onDeleteRecurringIncomeOpen={onDeleteRecurringIncomeOpen}
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

      {/* Add RecurringIncome Modal */}
      <AddRecurringIncomeModal
        isAddRecurringIncomeOpen={isAddRecurringIncomeOpen}
        onAddRecurringIncomeClose={onAddRecurringIncomeClose}
      />

      {/* Delete Recurring Income Modal */}
      <DeleteRecurringIncomeModal
        isDeleteRecurringIncomeOpen={isDeleteRecurringIncomeOpen}
        onDeleteRecurringIncomeClose={onDeleteRecurringIncomeClose}
        handleDeleteRecurringIncome={handleDeleteRecurringIncome}
        selectedRowInfo={selectedRowInfo}
      />
    </Flex>
  );
}

Income.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
