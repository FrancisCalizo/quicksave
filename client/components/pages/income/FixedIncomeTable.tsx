import React from 'react';
import { useTable, useSortBy } from 'react-table';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { FaTrash } from 'react-icons/fa';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  chakra,
} from '@chakra-ui/react';

import { formatCurrency } from 'utils';

interface FixedIncomeTableProps {
  data: any;
  onDeleteFixedIncomeOpen: () => void;
  onEditFixedIncomeOpen: () => void;
  setSelectedRowInfo: (value: any) => any;
}

export default function FixedIncomeTable(props: FixedIncomeTableProps) {
  const {
    data,
    onDeleteFixedIncomeOpen,
    onEditFixedIncomeOpen,
    setSelectedRowInfo,
  } = props;

  const reactTableColumns = [
    {
      Header: 'Description',
      accessor: 'description',
    },

    {
      Header: 'Amount',
      accessor: 'monthly_amount',
      Cell: (props: any) => formatCurrency(props.value),
    },

    {
      Header: '',
      accessor: 'NULL',
      disableSortBy: true,
      Cell: (props: any) => (
        <Flex alignItems="center" justifyContent="flex-end">
          <IconButton
            aria-label="Delete Recurring-Income"
            colorScheme="red"
            onClick={() => {
              setSelectedRowInfo(props.row?.original);
              onDeleteFixedIncomeOpen();
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
      onEditFixedIncomeOpen();
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
              style={{ position: 'relative' }}
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
