import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';

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
  useBreakpointValue,
} from '@chakra-ui/react';

export type FormValues = {
  description: string;
  amount: string;
};

interface EditFixedIncomeModalprops {
  isEditFixedIncomeOpen: boolean;
  onEditFixedIncomeClose: () => void;
  handleEditFixedIncome: (data: any) => void;
  selectedRowInfo: FormValues;
  setSelectedRowInfo: React.Dispatch<React.SetStateAction<any>>;
}

export default function EditFixedIncomeModal(props: EditFixedIncomeModalprops) {
  const {
    isEditFixedIncomeOpen,
    onEditFixedIncomeClose,
    handleEditFixedIncome,
    selectedRowInfo,
    setSelectedRowInfo,
  } = props;

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
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { description: '', amount: '' },
  });

  useEffect(() => {
    // The reset() method can be used to provide default values
    // mentioned here: https://react-hook-form.com/api/useform/reset
    reset({
      description: selectedRowInfo.description,
      amount: selectedRowInfo.amount,
    });
  }, [selectedRowInfo]);

  return (
    <Modal
      isOpen={isEditFixedIncomeOpen}
      onClose={() => {
        onEditFixedIncomeClose();
        setSelectedRowInfo({});
      }}
      size={modalSize}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleEditFixedIncome)}>
          <ModalHeader borderTopRadius={5}>
            <Heading size="lg" color="gray.500">
              Edit Fixed Income
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="fixedIncome-name">
                Fixed Income Name
              </FormLabel>
              <Input
                autoFocus
                id="fixedIncome-name"
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
                <NumberInput width="100%" precision={2}>
                  <Controller
                    control={control}
                    name="amount"
                    render={({
                      field: { onChange, ref, name, value, onBlur, ...rest },
                    }) => (
                      <NumberFormat
                        customInput={NumberInputField}
                        {...rest}
                        name={name}
                        onChange={onChange}
                        value={value}
                        thousandSeparator={true}
                        decimalScale={2}
                        isNumericString
                      />
                    )}
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
                onEditFixedIncomeClose();
                setSelectedRowInfo({});
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Update Fixed Income
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
