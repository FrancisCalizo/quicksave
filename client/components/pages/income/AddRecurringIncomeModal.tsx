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
  Select,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';

type FormValues = {
  recurringIncomeName: string;
};

interface AddRecurringIncomeModalprops {
  isAddRecurringIncomeOpen: boolean;
  onAddRecurringIncomeClose: () => void;
}

export default function AddRecurringIncomeModal(
  props: AddRecurringIncomeModalprops
) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isAddRecurringIncomeOpen, onAddRecurringIncomeClose } = props;

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

  const handleAddNewRecurringIncome = async (values: FormValues) => {
    const { recurringIncomeName } = values;

    try {
      // await axios.post('/createRecurringIncome', {
      //   name: recurringIncomeName,
      // });

      onAddRecurringIncomeClose();

      // TODO: Supposedly this is not the best way to clear a form
      // in RHF. Find a better way to do so: https://react-hook-form.com/api/useform/reset
      reset();

      await queryClient.invalidateQueries(['categories']);

      toast({
        title: 'Success!',
        description: 'Recurring Income was added successfully.',
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
      isOpen={isAddRecurringIncomeOpen}
      onClose={() => {
        onAddRecurringIncomeClose();
        reset();
      }}
      size={modalSize}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleAddNewRecurringIncome)}>
          <ModalHeader borderTopRadius={5}>
            <Heading size="lg" color="gray.500">
              Add Recurring Income
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="recurring-income-name">
                Recurring Income Name
              </FormLabel>
              <Input
                autoFocus
                id="recurring-income-name"
                {...register('recurringIncomeName', {
                  required: 'Name is required',
                })}
              />
              <FormErrorMessage>
                {errors.recurringIncomeName &&
                  errors.recurringIncomeName.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter borderTop="1px solid gainsboro">
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onAddRecurringIncomeClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Add Recurring Income
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
