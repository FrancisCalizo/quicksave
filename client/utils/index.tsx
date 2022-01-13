import { Badge, Flex, IconButton } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { FaTrash, FaFileAlt } from 'react-icons/fa';

export const formatCurrency = (value: number) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);

// Table columns for Nonrecurring expenses page
export const reactTableColumns = [
  {
    Header: 'Date',
    accessor: 'date',
    Cell: (props: any) => format(parseISO(props.value), 'M/dd/yy'),
  },
  {
    Header: 'Transaction',
    accessor: 'description',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    Cell: (props: any) => formatCurrency(props.value),
  },
  {
    Header: 'Category',
    accessor: 'category',
    Cell: (props: any) => <Badge p={1}>{props.value}</Badge>,
  },
  {
    Header: '',
    accessor: 'NULL',
    disableSortBy: true,
    Cell: (_: never) => (
      <Flex alignItems="center">
        <IconButton
          aria-label="View Notes"
          variant="outline"
          colorScheme="twitter"
          mr={3}
        >
          <FaFileAlt />
        </IconButton>
        <IconButton aria-label="Delete Expense" colorScheme="red">
          <FaTrash />
        </IconButton>
      </Flex>
    ),
  },
];
