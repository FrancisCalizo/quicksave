import React from 'react';
import Head from 'next/head';
import { useQuery, useQueryClient } from 'react-query';

import { Heading, Flex, Text, Box } from '@chakra-ui/react';

import CategoryTable from 'components/pages/categories/CategoryTable';
import DashboardLayout from 'components/layout/dashboard/DashboardLayout';
import { getAllCategoriesByUser } from 'components/api/categories';

export default function Income() {
  const queryClient = useQueryClient();

  // Load User Expense Categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    ['categories', 1],
    () => getAllCategoriesByUser(1)
  );

  if (isCategoriesLoading) {
    return null;
  }

  return (
    <Flex
      w={['100%', '100%', '60%', '60%', '55%']}
      flexDir="column"
      overflow="auto"
      minH="100vh"
      px={4}
      py={6}
    >
      <Heading as="h2" size="lg">
        My Categories
      </Heading>

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

Income.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
