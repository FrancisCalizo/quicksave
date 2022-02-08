import React from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';

import {
  Heading,
  Flex,
  Text,
  Box,
  Icon,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import CategoryTable from 'components/pages/categories/CategoryTable';
import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import { getAllCategoriesByUser } from 'components/api/categories';
import AddCategoryModal from 'components/pages/categories/AddCategoryModal';

export default function Categories() {
  const {
    isOpen: isAddCategoryOpen,
    onOpen: onAddCategoryOpen,
    onClose: onAddCategoryClose,
  } = useDisclosure();

  // Load User Expense Categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    ['categories'],
    () => getAllCategoriesByUser()
  );

  if (isCategoriesLoading) {
    return null;
  }

  return (
    <Flex w="100%" flexDir="column" overflow="auto" minH="100vh" px={4} py={6}>
      <Heading as="h2" size="lg">
        My Categories
      </Heading>

      <AddCategoryModal
        isAddCategoryOpen={isAddCategoryOpen}
        onAddCategoryClose={onAddCategoryClose}
      />

      <Text color="blackAlpha.600">
        Customize the categories in which you label your expenses
      </Text>

      <Flex justify="flex-end" align="center" mt={2} mb={[2, 6, 6, 2]}>
        <Button
          colorScheme="green"
          leftIcon={<Icon as={FaPlus} />}
          onClick={onAddCategoryOpen}
          width={['100%', '100%', '100%', 'inherit']}
        >
          Add Category
        </Button>
      </Flex>

      {/* Moving the table into its own component solved the issue 
      mentioned here: https://stackoverflow.com/a/70359332/13815036 */}
      <Box my={6}>
        <CategoryTable data={categories?.data} />
      </Box>
    </Flex>
  );
}

Categories.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
