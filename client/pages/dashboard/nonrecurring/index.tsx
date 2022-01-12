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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  Box,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  useToast,
} from '@chakra-ui/react';

import Combobox from 'components/Combobox';
import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import ExpenseTable from 'components/pages/nonrecurring/ExpenseTable';

const emptyForm = {
  transactionName: '',
  amount: '',
  date: '',
  category: '',
};

export default function Nonrecurring() {
  const toast = useToast();

  const {
    isOpen: isAddExpenseOpen,
    onOpen: onAddExpenseOpen,
    onClose: onAddExpenseClose,
  } = useDisclosure();

  const [date, setDate] = useState(new Date());
  const [expenses, setExpenses] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [minMaxDates, setMinMaxDates] = useState({ min: '', max: '' });
  const [formState, setFormState] = useState(emptyForm);

  useEffect(() => {
    // Load expense list for given date
    getList(+format(date, 'M'), +format(date, 'yyyy'));

    // Set Min and Max Date for DatePicker
    setMinMaxDates({
      min: format(startOfMonth(date), 'yyyy-MM-dd'),
      max: format(endOfMonth(date), 'yyyy-MM-dd'),
    });
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
    try {
      await axios.post('/createExpense', {
        amount: Number(formState.amount),
        date: formState.date,
        description: formState.transactionName,
        category: formState.category,
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
  };

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
          <Button colorScheme="green" leftIcon={<Icon as={FaPlus} />} onClick={onAddExpenseOpen}>
            Add Expense
          </Button>
        </Flex>

        <Box id="table-container" my={12}>
          <ExpenseTable data={expenses} />
        </Box>
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

      {/* Add Expense Modal */}
      <Modal
        isOpen={isAddExpenseOpen}
        onClose={() => {
          onAddExpenseClose();
          setFormState(emptyForm);
        }}
        size="lg"
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius={5}>
            <Heading size="lg" color="gray.500">
              Add Expense
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="transaction-name">Transaction Name</FormLabel>
              <Input
                id="transaction-name"
                value={formState.transactionName}
                onChange={(e) =>
                  setFormState((old) => ({ ...old, transactionName: e.target.value }))
                }
              />
            </FormControl>

            <Flex>
              <FormControl isRequired mb={4} mr={2}>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="$" />
                  {/* TODO: This will probably need to be a text input with regex */}
                  <NumberInput
                    width="100%"
                    value={formState.amount}
                    onChange={(val) => setFormState((old) => ({ ...old, amount: val }))}
                  >
                    <NumberInputField id="amount" borderLeftRadius={0} />
                  </NumberInput>
                </InputGroup>
              </FormControl>

              <FormControl isRequired mb={4} ml={2}>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  type="date"
                  min={minMaxDates.min}
                  max={minMaxDates.max}
                  value={formState.date}
                  onChange={(e) => setFormState((old) => ({ ...old, date: e.target.value }))}
                />
              </FormControl>
            </Flex>

            {/* TODO: Get categories from the backend and implement into items prop */}
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Combobox
                selectedItem={formState.category}
                handleSelectedItemChange={({ selectedItem }) => {
                  setFormState((old) => ({ ...old, category: selectedItem }));
                }}
                items={['Groceries', 'Exercise & Health', 'Eating Out', 'Misc', 'Splurge']}
              />
            </FormControl>

            {/* TODO: Add Notes Input (Textarea) */}
          </ModalBody>

          <ModalFooter borderTop="1px solid gainsboro">
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onAddExpenseClose();
                setFormState(emptyForm);
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddNewExpense}>
              Add New Expense
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

Nonrecurring.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
