import React, { useState } from 'react';
import {
  Paper, Table, TableBody, TableContainer, TablePagination, TableRow, IconButton, Collapse,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CustomTableCell from './CustomTableCell';
import CustomTableHead from './CustomTableHead';

interface CustomRowTableProps {
  columns:any[]
  rows:any[];
  expandable?:boolean
  // eslint-disable-next-line no-unused-vars
  expandableComponent?:(record:any)=>any
  primary?:boolean
}

const CustomRowTable: React.FC<CustomRowTableProps> = ({
  columns, rows, expandable = false, expandableComponent: ExpandableComponent = () => null, primary = true,
}) => {
  // SORTING
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('status');
  const [structureRows, setStructureRow] = React.useState(!primary ? rows : rows.map((
    rowItem:any,
  ) => ({ ...rowItem, isOpen: false })));
  const handleRequestSort = (event:any, property:any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // PAGINATION
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const descendingComparator = (firstElement:any, secondElement:any, orderByItem:any) => {
    if (secondElement[orderByItem]?.props?.sortid < firstElement[orderByItem]?.props?.sortid) {
      return -1;
    }
    if (secondElement[orderByItem]?.props?.sortid > firstElement[orderByItem]?.props?.sortid) {
      return 1;
    }
    return 0;
  };

  const getComparator = (orderItem:any, orderByItem:any) => (
    orderItem === 'desc'
      ? (a:any, b:any) => descendingComparator(a, b, orderByItem)
      : (a:any, b:any) => -descendingComparator(a, b, orderByItem)
  );
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  const stableSort = (array:any, comparator:any) => {
    const stabilizedThis = array.map((el:any, index:any) => [el, index]);
    stabilizedThis.sort((a:any, b:any) => {
      const newOrder = comparator(a[0], b[0]);
      if (newOrder !== 0) {
        return newOrder;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el:any) => el[0]);
  };

  const isExpandedColumn = (isExpanded:boolean, tableColums:any[]) => (isExpanded ? [{
    id: 'expandable',
    label: '',
  }, ...tableColums] : tableColums);

  const openExpandedColumn = (row:any) => {
    const copyStructureRows = [...structureRows].map((rowItem:any) => ({ ...rowItem, isOpen: false }));
    const getRowIndex:number = structureRows.findIndex((rowItem:any) => rowItem.id === row.id);
    copyStructureRows[getRowIndex] = { ...row, isOpen: !row.isOpen };
    setStructureRow(copyStructureRows);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <CustomTableHead
          columns={isExpandedColumn(expandable, columns)}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          primary={primary}
        />
        <TableBody>
          {stableSort(structureRows, getComparator(order, orderBy))
            .slice(...(primary
              ? [page * rowsPerPage, (page * rowsPerPage) + rowsPerPage] : []))
            .map((rowItem:any) => (
              <React.Fragment key={rowItem?.id?.props?.sortid || rowItem?.id}>
                <TableRow
                  tabIndex={-1}
                  sx={{ backgroundColor: rowItem.backgroundColor }}
                >

                  {expandable && (
                  <CustomTableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => openExpandedColumn(rowItem)}
                    >
                      {rowItem.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </CustomTableCell>
                  )}

                  {columns.map((column:any) => {
                    const value = rowItem[column.id];
                    return (
                      <CustomTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </CustomTableCell>
                    );
                  })}

                </TableRow>
                {expandable && (
                <TableRow>
                  <CustomTableCell style={{ paddingLeft: 45 }} colSpan={10}>
                    <Collapse sx={{ width: '100%' }} in={rowItem.isOpen} timeout="auto" unmountOnExit>
                      <ExpandableComponent rowID={rowItem?.id?.props?.sortid || rowItem?.id} />
                    </Collapse>
                  </CustomTableCell>
                </TableRow>
                )}
              </React.Fragment>
            ))}

        </TableBody>
      </Table>

      {primary && (
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={structureRows.length}
        labelRowsPerPage="éléments par page"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count !== -1 ? count : ''}`}
        rowsPerPage={rowsPerPage}
        page={page}
        getItemAriaLabel={(type) => {
          let typeToReturn = '';
          switch (type) {
            case 'previous':
              typeToReturn = 'Page précédente';
              break;
            case 'next':
              typeToReturn = 'Page suivante';
              break;
            default:
              typeToReturn = '';
              break;
          }
          return typeToReturn;
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      )}
    </TableContainer>
  );
};

export default CustomRowTable;
