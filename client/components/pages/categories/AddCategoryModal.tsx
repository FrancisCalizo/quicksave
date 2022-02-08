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

import { CATEGORY_COLORS } from 'utils';
import { CategoryColors } from 'utils/types';

type FormValues = {
  categoryName: string;
  categoryColor: CategoryColors;
};

interface AddCategoryModalprops {
  isAddCategoryOpen: boolean;
  onAddCategoryClose: () => void;
}

export default function AddCategoryModal(props: AddCategoryModalprops) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isAddCategoryOpen, onAddCategoryClose } = props;

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

  const handleAddNewCategory = async (values: FormValues) => {
    const { categoryName, categoryColor } = values;

    try {
      await axios.post('/createCategory', {
        name: categoryName,
        color: categoryColor,
      });

      onAddCategoryClose();

      // TODO: Supposedly this is not the best way to clear a form
      // in RHF. Find a better way to do so: https://react-hook-form.com/api/useform/reset
      reset();

      await queryClient.invalidateQueries(['categories']);

      toast({
        title: 'Success!',
        description: 'Category was added successfully.',
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
      isOpen={isAddCategoryOpen}
      onClose={() => onAddCategoryClose()}
      size={modalSize}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleAddNewCategory)}>
          <ModalHeader borderTopRadius={5}>
            <Heading size="lg" color="gray.500">
              Add Category
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="category-name">Category Name</FormLabel>
              <Input
                autoFocus
                id="category-name"
                {...register('categoryName', {
                  required: 'Name is required',
                })}
              />
              <FormErrorMessage>
                {errors.categoryName && errors.categoryName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="category-color">Category Color</FormLabel>
              <Select
                placeholder="Select option"
                id="category-color"
                {...register('categoryColor', {
                  required: 'color is required',
                })}
              >
                {CATEGORY_COLORS.map((color, key) => {
                  const s = color.label;

                  return (
                    <option value={color.value} key={key}>
                      {s[0].toUpperCase() + s.slice(1)}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {errors.categoryColor && errors.categoryColor.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter borderTop="1px solid gainsboro">
            <Button
              variant="outline"
              mr={3}
              onClick={() => onAddCategoryClose()}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Add Category
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
