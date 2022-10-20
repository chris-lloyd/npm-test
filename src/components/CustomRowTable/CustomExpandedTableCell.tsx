import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/system/createTheme/createTheme';

const CustomTableCell = styled(TableCell)(() => {
  const hookTheme:unknown = useTheme();
  const theme:Theme = hookTheme as Theme;
  return ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.tableHead.secondary,
      padding: 7,
    },
    [`&.${tableCellClasses.body}`]: {
      padding: '0 5px',
      fontSize: 12,
    },
  });
});

export default CustomTableCell;
