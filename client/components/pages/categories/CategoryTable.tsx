import React from 'react';
import Head from 'next/head';
import { useTable, useSortBy } from 'react-table';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { FaTrash } from 'react-icons/fa';
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';

interface CategoryTableProps {
  data: any;
}

export default function CategoryTable({ data }: CategoryTableProps) {
  const reactTableColumns = [
    {
      Header: 'Cateogry',
      accessor: 'name',
    },
    {
      Header: 'Color',
      accessor: 'color',
    },
    {
      Header: '',
      accessor: 'NULL',
    },
  ];

  const columns = React.useMemo(() => reactTableColumns, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data } as any, useSortBy);

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
              // onClick={(e: any) => handleRowclick(row, e)}
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
