import { format, parseISO } from 'date-fns';

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
  },
  {
    Header: '',
    accessor: 'NULL',
    disableSortBy: true,
  },
];
