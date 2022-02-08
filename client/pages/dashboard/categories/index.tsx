import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useQueryClient, useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';

import {
  Heading,
  Flex,
  Text,
  Box,
  Icon,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import CategoryTable from 'components/pages/categories/CategoryTable';
import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import { getAllCategoriesByUser } from 'components/api/categories';
import AddCategoryModal from 'components/pages/categories/AddCategoryModal';
import DeleteCategoryModal from 'components/pages/categories/DeleteCategoryModal';

export const emptyForm = {
  categoryName: '',
  categoryColor: '',
};

export default function Categories() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    isOpen: isAddCategoryOpen,
    onOpen: onAddCategoryOpen,
    onClose: onAddCategoryClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteCategoryOpen,
    onOpen: onDeleteCategoryOpen,
    onClose: onDeleteCategoryClose,
  } = useDisclosure();

  // Load User Expense Categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    ['categories'],
    () => getAllCategoriesByUser()
  );

  const [selectedRowInfo, setSelectedRowInfo] = useState<any>({});
  const [formState, setFormState] = useState(emptyForm);

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(`/deleteCategory/${categoryId}`);

      await queryClient.invalidateQueries(['categories']);

      onDeleteCategoryClose();

      toast({
        title: 'Success!',
        description: 'Category was deleted successfully.',
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

      {/* Add Category Modal */}

      <AddCategoryModal
        isAddCategoryOpen={isAddCategoryOpen}
        onAddCategoryClose={onAddCategoryClose}
      />

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        isDeleteCategoryOpen={isDeleteCategoryOpen}
        onDeleteCategoryClose={onDeleteCategoryClose}
        handleDeleteCategory={handleDeleteCategory}
        selectedRowInfo={selectedRowInfo}
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
        <CategoryTable
          data={categories?.data}
          setSelectedRowInfo={setSelectedRowInfo}
          onDeleteCategoryOpen={onDeleteCategoryOpen}
          // onEditCategoryOpen={onEditCategoryOpen}
          setFormState={setFormState}
        />
      </Box>
    </Flex>
  );
}

Categories.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
