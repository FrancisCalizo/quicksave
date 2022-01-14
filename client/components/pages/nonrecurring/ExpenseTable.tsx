import React from 'react';
import { format, parseISO } from 'date-fns';
import { useTable, useSortBy } from 'react-table';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { FaTrash, FaFileAlt } from 'react-icons/fa';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Badge,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
} from '@chakra-ui/react';

import { Expense, CategoryObject } from 'utils/types';
import { formatCurrency } from 'utils';

interface ExpenseTableProps {
  data: Expense[];
  onDeleteExpenseOpen: () => void;
  onEditExpenseOpen: () => void;
  setSelectedRowInfo: (value: any) => any;
  setFormState: any;
  categories: CategoryObject[];
}

export default function ExpenseTable(props: ExpenseTableProps) {
  const {
    data,
    onDeleteExpenseOpen,
    onEditExpenseOpen,
    setSelectedRowInfo,
    setFormState,
    categories,
  } = props;

  const reactTableColumns = [
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
      Cell: (props: any) => (
        <Flex alignItems="center">
          <Popover placement="left">
            <PopoverTrigger>
              <IconButton
                aria-label="View Notes"
                variant="outline"
                colorScheme={
                  props.row?.original.notes ? 'twitter' : 'blackAlpha'
                }
                mr={3}
              >
                <FaFileAlt style={{ pointerEvents: 'none' }} />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Text fontWeight="bold">Notes</Text>
              </PopoverHeader>
              <PopoverBody>
                {props.row?.original.notes || (
                  <Text color="gray.500">No notes available.</Text>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <IconButton
            aria-label="Delete Expense"
            colorScheme="red"
            onClick={() => {
              setSelectedRowInfo(props.row?.original);
              onDeleteExpenseOpen();
            }}
          >
            <FaTrash style={{ pointerEvents: 'none' }} />
          </IconButton>
        </Flex>
      ),
    },
  ];

  const columns = React.useMemo(() => reactTableColumns, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data } as any, useSortBy);

  const handleRowclick = (row: any, event: any) => {
    if (event.target.type !== 'button') {
      setSelectedRowInfo(row.original);
      onEditExpenseOpen();

      const date = row.original.date;

      setFormState({
        description: row.original.description,
        amount: Number(row.original.amount),
        date: date.substring(0, date.indexOf('T')),
        category: categories.find((cat) => cat.name === row.original.category),
        notes: row.original.notes,
      });
    }
  };

  return (
    <Table {...getTableProps()} size="sm">
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render('Header')}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);

          return (
            <Tr
              {...row.getRowProps()}
              onClick={(e: any) => handleRowclick(row, e)}
              _hover={{
                background: 'gray.100',
                transform: 'scale(1.01)',
                transition: 'transform .1s linear',
                cursor: 'pointer',
              }}
            >
              {row.cells.map((cell: any) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
