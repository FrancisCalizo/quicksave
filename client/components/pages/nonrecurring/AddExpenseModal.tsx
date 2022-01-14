import React from 'react';

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
} from '@chakra-ui/react';

import Combobox from 'components/Combobox';
import { emptyForm } from 'pages/dashboard/nonrecurring';
import { Expense } from 'utils/types';

interface AddExpenseModalprops {
  isAddExpenseOpen: boolean;
  onAddExpenseClose: () => void;
  formState: Expense;
  setFormState: any;
  minMaxDates: { min: string; max: string };
  handleAddNewExpense: () => void;
  isSubmitting: boolean;
  categories: any[];
}

export default function AddExpenseModal(props: AddExpenseModalprops) {
  const {
    isAddExpenseOpen,
    onAddExpenseClose,
    formState,
    setFormState,
    minMaxDates,
    handleAddNewExpense,
    isSubmitting,
    categories,
  } = props;

  return (
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
              autoFocus
              id="transaction-name"
              value={formState.description}
              onChange={(e) =>
                setFormState((old: any) => ({
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
                {/* TODO: This will probably need to be a text input with regex */}
                <NumberInput
                  width="100%"
                  value={formState.amount}
                  onChange={(val) =>
                    setFormState((old: any) => ({ ...old, amount: val }))
                  }
                  onBlur={(e: any) => {
                    const val = Math.abs(
                      Number(parseFloat(e.target.value).toFixed(2))
                    );

                    setFormState((old: any) => ({
                      ...old,
                      amount: val ? val.toFixed(2) : 0,
                    }));
                  }}
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
                onChange={(e) =>
                  setFormState((old: any) => ({ ...old, date: e.target.value }))
                }
              />
            </FormControl>
          </Flex>

          {/* TODO: Get categories from the backend and implement into items prop */}
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Combobox
              selectedItem={formState.category}
              handleSelectedItemChange={({ selectedItem }) => {
                setFormState((old: any) => ({
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
              value={formState.notes}
              onChange={(e) =>
                setFormState((old: any) => ({
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
              setFormState(emptyForm);
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleAddNewExpense}
            disabled={
              !formState.description ||
              !formState.amount ||
              !formState.date ||
              !formState.category ||
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
