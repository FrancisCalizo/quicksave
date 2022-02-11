import React from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import axios from 'axios';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  NumberInputField,
  NumberInput,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';

type FormValues = {
  description: string;
  amount: string;
};

interface AddFixedIncomeModalprops {
  isAddFixedIncomeOpen: boolean;
  onAddFixedIncomeClose: () => void;
}

export default function AddFixedIncomeModal(props: AddFixedIncomeModalprops) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isAddFixedIncomeOpen, onAddFixedIncomeClose } = props;

  const modalSize = useBreakpointValue({
    base: 'full',
    sm: 'full',
    md: 'lg',
    lg: 'lg',
    xl: 'lg',
    ['2xl']: 'lg',
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const handleAddNewFixedIncome = async (values: FormValues) => {
    const { description, amount } = values;

    try {
      await axios.post('/createFixedIncome', {
        description,
        amount,
      });

      onAddFixedIncomeClose();

      // TODO: Supposedly this is not the best way to clear a form
      // in RHF. Find a better way to do so: https://react-hook-form.com/api/useform/reset
      reset();

      await queryClient.invalidateQueries(['fixedIncome']);

      toast({
        title: 'Success!',
        description: 'Fixed Income was added successfully.',
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
    <Modal
      isOpen={isAddFixedIncomeOpen}
      onClose={() => {
        onAddFixedIncomeClose();
        reset();
      }}
      size={modalSize}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleAddNewFixedIncome)}>
          <ModalHeader borderTopRadius={5}>
            <Heading size="lg" color="gray.500">
              Add Fixed Income
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                autoFocus
                id="description"
                {...register('description', {
                  required: 'Name is required',
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isRequired mb={4} mr={2}>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                {/* TODO: Format this number to fixed (has more than 2 decimal points) */}
                <NumberInput width="100%">
                  <NumberInputField
                    id="amount"
                    borderLeftRadius={0}
                    {...register('amount', {
                      required: 'Amount is required',
                    })}
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter borderTop="1px solid gainsboro">
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onAddFixedIncomeClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Add Fixed Income
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
