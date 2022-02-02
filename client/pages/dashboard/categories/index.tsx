import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';

import { CATEGORY_COLORS } from 'utils';

import {
  Heading,
  Flex,
  Text,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';

import CategoryTable from 'components/pages/categories/CategoryTable';
import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import { getAllCategoriesByUser } from 'components/api/categories';
import useAppContext from 'components/hooks/useAppContext';
import { CategoryColors } from 'utils/types';

type FormValues = {
  categoryName: string;
  categoryColor: CategoryColors;
};

export default function Categories() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    userInfo: { userid: userId },
  } = useAppContext();

  // Load User Expense Categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    ['categories', userId],
    () => getAllCategoriesByUser(userId)
  );

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
        userId,
      });

      // TODO: Supposedly this is not the best way to clear a form
      // in RHF. Find a better way to do so: https://react-hook-form.com/api/useform/reset
      reset();

      await queryClient.invalidateQueries(['categories', userId]);

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

  if (isCategoriesLoading) {
    return null;
  }

  return (
    <Flex w="100%" flexDir="column" overflow="auto" minH="100vh" px={4} py={6}>
      <Heading as="h2" size="lg">
        My Categories
      </Heading>

      <Box my={10}>
        <form onSubmit={handleSubmit(handleAddNewCategory)}>
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
          <Button
            colorScheme="messenger"
            isLoading={isSubmitting}
            type="submit"
          >
            Add New Category
          </Button>
        </form>
      </Box>

      <Text color="blackAlpha.600">
        Customize the categories in which you label your expenses
      </Text>

      {/* Moving the table into its own component solved the issue 
      mentioned here: https://stackoverflow.com/a/70359332/13815036 */}
      <Box my={6}>
        <CategoryTable data={categories?.data} />
      </Box>
    </Flex>
  );
}

Categories.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
