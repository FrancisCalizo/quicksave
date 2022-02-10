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
  Badge,
  Flex,
  IconButton,
  chakra,
} from '@chakra-ui/react';

interface CategoryTableProps {
  data: any;
  onDeleteCategoryOpen: () => void;
  onEditCategoryOpen: () => void;
  setSelectedRowInfo: (value: any) => any;
}

export default function CategoryTable(props: CategoryTableProps) {
  const { data, onDeleteCategoryOpen, onEditCategoryOpen, setSelectedRowInfo } =
    props;

  const reactTableColumns = [
    {
      Header: 'Category',
      accessor: 'name',
    },
    {
      Header: 'Color',
      accessor: 'color',
      Cell: (props: any) => (
        <Badge
          px={2}
          py={1}
          textTransform="capitalize"
          colorScheme={props.row.original.color}
          borderRadius={5}
        >
          {props.value}
        </Badge>
      ),
    },
    {
      Header: '',
      accessor: 'NULL',
      disableSortBy: true,
      Cell: (props: any) => (
        <Flex alignItems="center" justifyContent="flex-end">
          <IconButton
            aria-label="Delete Category"
            colorScheme="red"
            onClick={() => {
              setSelectedRowInfo(props.row?.original);
              onDeleteCategoryOpen();
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
      onEditCategoryOpen();
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
