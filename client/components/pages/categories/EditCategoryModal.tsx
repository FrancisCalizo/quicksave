import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
  useBreakpointValue,
} from '@chakra-ui/react';

import { CATEGORY_COLORS } from 'utils';
import { CategoryObject, CategoryColors } from 'utils/types';

export type FormValues = {
  categoryName: string;
  categoryColor: CategoryColors;
};

interface EditCategoryModalprops {
  isEditCategoryOpen: boolean;
  onEditCategoryClose: () => void;
  handleEditCategory: (data: any) => void;
  selectedRowInfo: CategoryObject;
  setSelectedRowInfo: React.Dispatch<React.SetStateAction<any>>;
}

export default function EditCategoryModal(props: EditCategoryModalprops) {
  const {
    isEditCategoryOpen,
    onEditCategoryClose,
    handleEditCategory,
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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { categoryName: '', categoryColor: '' as CategoryColors },
  });

  useEffect(() => {
    // The reset() method can be used to provide default values
    // mentioned here: https://react-hook-form.com/api/useform/reset
    reset({
      categoryName: selectedRowInfo.name,
      categoryColor: selectedRowInfo.color as CategoryColors,
    });
  }, [selectedRowInfo]);

  return (
    <Modal
      isOpen={isEditCategoryOpen}
      onClose={() => {
        onEditCategoryClose();
        setSelectedRowInfo({});
      }}
      size={modalSize}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleEditCategory)}>
          <ModalHeader borderTopRadius={5}>
            <Heading size="lg" color="gray.500">
              Edit Category
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
              onClick={() => {
                onEditCategoryClose();
                setSelectedRowInfo({});
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Update Category
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
