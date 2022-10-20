import React from 'react';
import {
  Box,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import {
  withStyles,
  createStyles,
} from '@mui/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { visuallyHidden } from '@mui/utils';
import CustomTableCell from './CustomTableCell';
import CustomTypography from '../CustomTypography';
import CustomExpandedTableCell from './CustomExpandedTableCell';

interface CustomTableHeadProps {
  columns:any[]
  order:string
  orderBy:string
  onRequestSort:Function
  primary:boolean
}

const CustomTableHead :React.FC<CustomTableHeadProps> = ({
  columns,
  order,
  orderBy,
  onRequestSort,
  primary,
}) => {
  const createSortHandler = (property:any) => (event:any) => {
    onRequestSort(event, property);
  };
  const StyledTableSortLabel = withStyles(() => (
    createStyles({
      root: {
        color: 'white',
        '&:hover': {
          color: 'white',
        },
        '&$active': {
          color: 'white',
        },
      },
      active: {},
      icon: {
        color: 'inherit !important',
      },
    })
  ))(TableSortLabel);

  return (
    <TableHead>
      <TableRow>
        {columns && columns?.length > 0 && (
          <>
            {columns.map((columnItem:any) => (primary
              ? (
                <CustomTableCell
                  key={columnItem.id}
                >
                  {columnItem.sortable && (
                  <StyledTableSortLabel
                    active={orderBy === columnItem.id}
                    direction={orderBy === columnItem.id ? order : 'asc'}
                    onClick={createSortHandler(columnItem.id)}
                    style={{ color: '#FFF' }}
                  >
                    <CustomTypography
                      title={columnItem.label}
                      variant="h6"
                    />
                    {orderBy === columnItem.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </StyledTableSortLabel>
                  )}
                </CustomTableCell>
              )
              : (
                <CustomExpandedTableCell
                  key={columnItem.id}
                >
                  {columnItem.sortable && (
                  <StyledTableSortLabel
                    active={orderBy === columnItem.id}
                    direction={orderBy === columnItem.id ? order : 'asc'}
                    onClick={createSortHandler(columnItem.id)}
                    style={{ color: 'black' }}
                  >
                    <CustomTypography
                      title={columnItem.label}
                      variant="h6"
                    />
                    {orderBy === columnItem.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </StyledTableSortLabel>
                  )}
                </CustomExpandedTableCell>
              )))}
          </>
        )}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
