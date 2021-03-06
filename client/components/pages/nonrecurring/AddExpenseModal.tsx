import React, { useState } from 'react';
import NumberFormat from 'react-number-format';

import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Textarea,
  useBreakpointValue,
} from '@chakra-ui/react';

import Combobox from 'components/Combobox';
import { emptyForm } from 'pages/dashboard/nonrecurring';
import { Expense } from 'utils/types';

interface AddExpenseModalprops {
  isAddExpenseOpen: boolean;
  onAddExpenseClose: () => void;
  setFormState: any;
  minMaxDates: { min: string; max: string };
  handleAddNewExpense: (data: any, callback?: any) => void;
  isSubmitting: boolean;
  categories: any[];
}

export default function AddExpenseModal(props: AddExpenseModalprops) {
  const {
    isAddExpenseOpen,
    onAddExpenseClose,
    setFormState,
    minMaxDates,
    handleAddNewExpense,
    isSubmitting,
    categories,
  } = props;

  const modalSize = useBreakpointValue({
    base: 'full',
    sm: 'full',
    md: 'lg',
    lg: 'lg',
    xl: 'lg',
    ['2xl']: 'lg',
  });

  const [formData, setFormData] = useState<Expense>(emptyForm);

  return (
    <Modal
      isOpen={isAddExpenseOpen}
      onClose={() => {
        setFormData(emptyForm);
        onAddExpenseClose();
      }}
      size={modalSize}
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
              autoFocus
              id="transaction-name"
              value={formData.description}
              onChange={(e) =>
                setFormData((old: any) => ({
                  ...old,
                  description: e.target.value,
                }))
              }
            />
          </FormControl>

          <Flex>
            <FormControl isRequired mb={4} mr={2}>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <NumberInput
                  width="100%"
                  value={formData.amount}
                  onChange={(val) =>
                    setFormData((old: any) => ({ ...old, amount: val }))
                  }
                >
                  <NumberFormat
                    borderLeftRadius={0}
                    customInput={NumberInputField}
                    thousandSeparator={true}
                    decimalScale={2}
                    isNumericString
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>

            <FormControl isRequired mb={4} ml={2}>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input
                type="date"
                min={minMaxDates.min}
                max={minMaxDates.max}
                value={formData.date}
                onChange={(e) =>
                  setFormData((old: any) => ({ ...old, date: e.target.value }))
                }
              />
            </FormControl>
          </Flex>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Combobox
              selectedItem={formData.category}
              handleSelectedItemChange={({ selectedItem }) => {
                setFormData((old: any) => ({
                  ...old,
                  category: selectedItem,
                }));
              }}
              items={categories}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Textarea
              id="notes"
              resize="vertical"
              value={formData.notes}
              onChange={(e) =>
                setFormData((old: any) => ({
                  ...old,
                  notes: e.target.value,
                }))
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter borderTop="1px solid gainsboro">
          <Button
            variant="outline"
            mr={3}
            onClick={() => {
              onAddExpenseClose();
              setFormData(emptyForm);
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              setFormState(formData);
              handleAddNewExpense(formData, () => setFormData(emptyForm));
            }}
            disabled={
              !formData.description ||
              !formData.amount ||
              !formData.date ||
              !formData.category.category_id ||
              isSubmitting
            }
          >
            Add New Expense
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
