import React, { useState } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

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
} from '@chakra-ui/react';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Nonrecurring() {
  const {
    isOpen: isAddExpenseOpen,
    onOpen: onAddExpenseOpen,
    onClose: onAddExpenseClose,
  } = useDisclosure();
  const {
    isOpen: isAddLabelOpen,
    onOpen: onAddLabelOpen,
    onClose: onAddLabelClose,
  } = useDisclosure();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [date, setDate] = useState(new Date());

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
            <Text as="span" fontWeight="normal">
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
            }}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        )}

        <Flex justify="flex-end" align="center">
          <Button leftIcon={<Icon as={FaPlus} />} mr={4} onClick={onAddLabelOpen}>
            Add Label
          </Button>
          <Button colorScheme="green" leftIcon={<Icon as={FaPlus} />} onClick={onAddExpenseOpen}>
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

      {/* Add Expense Modal */}
      <Modal isOpen={isAddExpenseOpen} onClose={onAddExpenseClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, nisi.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onAddExpenseClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Label Modal */}
      <Modal isOpen={isAddLabelOpen} onClose={onAddLabelClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Label</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, nisi.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onAddLabelClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

Nonrecurring.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
