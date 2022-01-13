import React, { useState, useEffect } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { format } from 'date-fns';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import DatePicker from 'react-datepicker';
import axios from 'axios';

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

export const emptyForm = {
  description: '',
  amount: '',
  date: '',
  category: '',
  notes: '',
};

export default function Nonrecurring() {
  const toast = useToast();

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

  const [date, setDate] = useState(new Date());
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minMaxDates, setMinMaxDates] = useState({ min: '', max: '' });
  const [formState, setFormState] = useState(emptyForm);
  const [selectedRowInfo, setSelectedRowInfo] = useState({});

  useEffect(() => {
    // Load expense list for given date
    getList(+format(date, 'M'), +format(date, 'yyyy'));

    // Set Min and Max Date for DatePicker
    setMinMaxDates({
      min: format(startOfMonth(date), 'yyyy-MM-dd'),
      max: format(endOfMonth(date), 'yyyy-MM-dd'),
    });

    // Load User Expense Categories
    (async function getAllCategoriesByUser(userId: number) {
      try {
        const res = await axios.get(`/getAllCategoriesByUser/${userId}`);

        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    })(1); // TODO: Hardcode the Userid until I get the User situation figured out
  }, []);

  async function getList(month: number, year: number) {
    try {
      const res = await axios.get('/getAllExpensesByMonth', {
        params: {
          month,
          year,
        },
      });

      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddNewExpense = async () => {
    setIsSubmitting(true);

    try {
      await axios.post('/createExpense', {
        amount: Number(formState.amount),
        date: formState.date,
        description: formState.description,
        category: formState.category,
        notes: formState.notes,
        userId: 1, // TODO: Hardcoded until I figure out the user situation
      });

      await getList(+format(date, 'M'), +format(date, 'yyyy'));

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

      await getList(+format(date, 'M'), +format(date, 'yyyy'));

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

  return (
    <>
      {/* Middle Section */}
      <Flex
        w={['100%', '100%', '60%', '60%', '60%']}
        direction="column"
        overflow="auto"
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
          >
            {format(date, 'MMMM')}{' '}
            <Text as="span" fontWeight="normal" color="gray.500">
              {format(date, 'yyyy')}
            </Text>
          </Heading>
          <IconButton
            aria-label="Change Date"
            icon={isDatePickerOpen ? <FaChevronUp /> : <FaChevronDown />}
            size="sm"
            ml={4}
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
              getList(+format(date, 'M'), +format(date, 'yyyy'));
              setMinMaxDates({
                min: format(startOfMonth(date), 'yyyy-MM-dd'),
                max: format(endOfMonth(date), 'yyyy-MM-dd'),
              });
            }}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        )}
        <Flex justify="flex-end" align="center">
          <Button
            colorScheme="green"
            leftIcon={<Icon as={FaPlus} />}
            onClick={onAddExpenseOpen}
          >
            Add Expense
          </Button>
        </Flex>

        <Box id="table-container" my={12}>
          <ExpenseTable
            data={expenses}
            setSelectedRowInfo={setSelectedRowInfo}
            onDeleteExpenseOpen={onDeleteExpenseOpen}
          />
        </Box>
      </Flex>

      {/* Right Section */}
      <Flex
        w={['100%', '100%', '40%']}
        bgColor="#F5F5F5"
        flexDir="column"
        overflow="auto"
        minW={[null, null, '300px', '300px', '400px']}
      >
        <h3>NonrecurringRight</h3>
      </Flex>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isAddExpenseOpen={isAddExpenseOpen}
        onAddExpenseClose={onAddExpenseClose}
        formState={formState}
        setFormState={setFormState}
        minMaxDates={minMaxDates}
        handleAddNewExpense={handleAddNewExpense}
        isSubmitting={isSubmitting}
        categories={categories}
      />

      {/* Delete Expense Modal */}
      <DeleteExpenseModal
        isDeleteExpenseOpen={isDeleteExpenseOpen}
        onDeleteExpenseClose={onDeleteExpenseClose}
        handleDeleteExpense={handleDeleteExpense}
        selectedRowInfo={selectedRowInfo}
      />
    </>
  );
}

Nonrecurring.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);
