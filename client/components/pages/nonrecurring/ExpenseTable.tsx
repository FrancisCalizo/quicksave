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
} from '@chakra-ui/react';

import { Expense } from 'utils/types';
import { formatCurrency } from 'utils';

interface ExpenseTableProps {
  data: Expense[];
  onDeleteExpenseOpen: () => void;
  setSelectedRowInfo: (value: any) => any;
}

export default function ExpenseTable(props: ExpenseTableProps) {
  const { data, onDeleteExpenseOpen, setSelectedRowInfo } = props;

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
          <IconButton
            aria-label="View Notes"
            variant="outline"
            colorScheme="twitter"
            mr={3}
          >
            <FaFileAlt />
          </IconButton>
          <IconButton
            aria-label="Delete Expense"
            colorScheme="red"
            onClick={() => {
              setSelectedRowInfo(props.row?.original);
              onDeleteExpenseOpen();
            }}
          >
            <FaTrash />
          </IconButton>
        </Flex>
      ),
    },
  ];

  const columns = React.useMemo(() => reactTableColumns, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data } as any, useSortBy);

  return (
    <Table {...getTableProps()}>
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
        {rows.map((row) => {
          prepareRow(row);

          return (
            <Tr {...row.getRowProps()}>
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
