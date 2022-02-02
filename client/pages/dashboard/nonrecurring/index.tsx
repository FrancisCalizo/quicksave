import React, { useState, useEffect } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useQuery, useQueryClient } from 'react-query';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import axios from 'axios';
import _ from 'lodash';

import {
  Flex,
  Button,
  IconButton,
  Icon,
  useDisclosure,
  Heading,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import ExpenseTable from 'components/pages/nonrecurring/ExpenseTable';
import AddExpenseModal from 'components/pages/nonrecurring/AddExpenseModal';
import DeleteExpenseModal from 'components/pages/nonrecurring/DeleteExpenseModal';
import EditExpenseModal from 'components/pages/nonrecurring/EditExpenseModal';
import SpendingBreakdown from 'components/pages/nonrecurring/SpendingBreakdown';
import HeadingOverview from 'components/pages/nonrecurring/HeadingOverview';
import { useFetchExpensesByMonth } from 'components/hooks/queries/useFetchExpensesByMonth';
import { useFetchCategories } from 'components/hooks/queries/useFetchCategories';
import NonrecurringSkeleton from 'components/layout/skeletons/NonrecurringSkeleton';
import useAppContext from 'components/hooks/useAppContext';
import { Expense } from 'utils/types';

export const emptyForm = {
  description: '',
  amount: '',
  date: '',
  category: { name: '', category_id: 0, user_id: 0 },
  notes: '',
};

export default function Nonrecurring() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    userInfo: { userid: userId },
  } = useAppContext();

  const {
    isOpen: isAddExpenseOpen,
    onOpen: onAddExpenseOpen,
    onClose: onAddExpenseClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteExpenseOpen,
    onOpen: onDeleteExpenseOpen,
    onClose: onDeleteExpenseClose,
  } = useDisclosure();

  const {
    isOpen: isEditExpenseOpen,
    onOpen: onEditExpenseOpen,
    onClose: onEditExpenseClose,
  } = useDisclosure();

  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minMaxDates, setMinMaxDates] = useState({ min: '', max: '' });
  const [formState, setFormState] = useState(emptyForm);
  const [selectedRowInfo, setSelectedRowInfo] = useState<any>({});

  // TODO: Temporary. DELETE LATER
  const [tempAmount, setTempAmount] = useState({
    limit: 0,
    spent: 0,
    remaining: 0,
  });

  // Load All Expenses For the Month
  const { data: expenses, isLoading: isExpensesLoading } =
    useFetchExpensesByMonth(userId, date, (data: any) => {
      const sumAmount = data.data
        .map((ex: any) => ex.amount)
        .reduce((prev: string, curr: string) => Number(prev) + Number(curr), 0);

      setTempAmount((old) => ({
        ...old,
        spent: sumAmount,
        limit: 1700, // TODO: Limit is hardcoded for the time being
        remaining: 1700 - sumAmount,
      }));
    });

  // Load User Expense Categories
  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchCategories(userId);

  // Set Min and Max Date for DatePicker
  useEffect(() => {
    setMinMaxDates({
      min: format(startOfMonth(date), 'yyyy-MM-dd'),
      max: format(endOfMonth(date), 'yyyy-MM-dd'),
    });
  }, []);

  const handleAddNewExpense = async (
    formData: Expense,
    clearFormCallback: any
  ) => {
    setIsSubmitting(true);

    try {
      await axios.post('/createExpense', {
        amount: Number(formData.amount),
        date: formData.date,
        description: formData.description,
        category: formData.category.category_id,
        notes: formData.notes,
        userId,
      });

      await queryClient.invalidateQueries([
        'allExpensesByMonth',
        +format(date, 'M'),
        +format(date, 'yyyy'),
      ]);

      setFormState(emptyForm);
      onAddExpenseClose();

      toast({
        title: 'Success!',
        description: 'Expense was added successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });

      clearFormCallback();
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

    setIsSubmitting(false);
  };

  const handleEditExpense = async (formData: Expense) => {
    setIsSubmitting(true);

    try {
      await axios.put(`/updateExpense/${selectedRowInfo.expense_id}`, {
        amount: Number(formData.amount),
        date: formData.date,
        description: formData.description,
        category: formData.category.category_id,
        notes: formData.notes,
        userId,
      });

      await queryClient.invalidateQueries([
        'allExpensesByMonth',
        +format(date, 'M'),
        +format(date, 'yyyy'),
      ]);

      setFormState(emptyForm);
      onEditExpenseClose();

      toast({
        title: 'Success!',
        description: 'Expense was updated successfully.',
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

    setIsSubmitting(false);
  };

  const handleDeleteExpense = async (expenseId: number) => {
    try {
      await axios.delete(`/deleteExpense/${expenseId}`);

      await queryClient.invalidateQueries([
        'allExpensesByMonth',
        +format(date, 'M'),
        +format(date, 'yyyy'),
      ]);

      onDeleteExpenseClose();

      toast({
        title: 'Success!',
        description: 'Expense was deleted successfully.',
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

  if (isExpensesLoading || isCategoriesLoading) {
    return <NonrecurringSkeleton />;
  }

  return (
    <>
      {/* Middle Section */}
      <Flex
        w={['100%', '100%', '70%']}
        direction="column"
        overflowY="auto"
        overflowX="hidden"
        minHeight="100vh"
        px={4}
        py={6}
      >
        <Flex align="center">
          <Heading
            as="h2"
            size="lg"
            cursor="pointer"
            onClick={() => setIsDatePickerOpen((isOpen) => !isOpen)}
            data-type="calendar"
          >
            {format(date, 'MMMM')}{' '}
            <Text
              as="span"
              fontWeight="normal"
              color="gray.500"
              data-type="calendar"
            >
              {format(date, 'yyyy')}
            </Text>
          </Heading>
          <IconButton
            aria-label="Change Date"
            icon={isDatePickerOpen ? <FaChevronUp /> : <FaChevronDown />}
            size="sm"
            ml={4}
            data-type="calendar"
            onClick={() => setIsDatePickerOpen((isOpen) => !isOpen)}
          />
        </Flex>
        {isDatePickerOpen && (
          <DatePicker
            inline
            selected={date}
            onChange={(date: any) => {
              setDate(date);
              setIsDatePickerOpen(false);
              setMinMaxDates({
                min: format(startOfMonth(date), 'yyyy-MM-dd'),
                max: format(endOfMonth(date), 'yyyy-MM-dd'),
              });
            }}
            onClickOutside={(e: any) => {
              if (e.target.dataset?.type !== 'calendar') {
                setIsDatePickerOpen(false);
              }
            }}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        )}

        <HeadingOverview tempAmount={tempAmount} />

        <Flex justify="flex-end" align="center" mt={2} mb={[2, 6, 6, 2]}>
          <Button
            colorScheme="green"
            leftIcon={<Icon as={FaPlus} />}
            onClick={onAddExpenseOpen}
            width={['100%', '100%', '100%', 'inherit']}
          >
            Add Expense
          </Button>
        </Flex>

        <Box id="table-container" overflowX="auto">
          <ExpenseTable
            data={expenses?.data}
            setSelectedRowInfo={setSelectedRowInfo}
            onDeleteExpenseOpen={onDeleteExpenseOpen}
            onEditExpenseOpen={onEditExpenseOpen}
            setFormState={setFormState}
          />
        </Box>
      </Flex>

      {/* Right Section */}
      <Flex
        w={['100%', '100%', '30%']}
        bgColor="#F5F5F5"
        flexDir="column"
        overflow="auto"
        minW={[null, null, '250px', '300px', '400px']}
      >
        <Box my={4}>
          <SpendingBreakdown
            categories={categories?.data}
            expenses={expenses?.data}
          />
        </Box>
      </Flex>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isAddExpenseOpen={isAddExpenseOpen}
        onAddExpenseClose={onAddExpenseClose}
        setFormState={setFormState}
        minMaxDates={minMaxDates}
        handleAddNewExpense={handleAddNewExpense}
        isSubmitting={isSubmitting}
        categories={categories?.data}
      />

      {/* Delete Expense Modal */}
      <DeleteExpenseModal
        isDeleteExpenseOpen={isDeleteExpenseOpen}
        onDeleteExpenseClose={onDeleteExpenseClose}
        handleDeleteExpense={handleDeleteExpense}
        selectedRowInfo={selectedRowInfo}
      />

      {/* Edit Expense Modal */}
      <EditExpenseModal
        isEditExpenseOpen={isEditExpenseOpen}
        onEditExpenseClose={onEditExpenseClose}
        formState={formState}
        setFormState={setFormState}
        minMaxDates={minMaxDates}
        handleEditExpense={handleEditExpense}
        isSubmitting={isSubmitting}
        categories={categories?.data}
      />
    </>
  );
}

Nonrecurring.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);
