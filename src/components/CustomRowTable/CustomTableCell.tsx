import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/system/createTheme/createTheme';
import { useTheme } from '@mui/material';

const CustomTableCell = styled(TableCell)(() => {
  const hookTheme:unknown = useTheme();
  const theme:Theme = hookTheme as Theme;
  return ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.tableHead.main,
      padding: 7,
    },
    [`&.${tableCellClasses.body}`]: {
      padding: '0 5px',
      fontSize: 12,
    },
  });
});

export default CustomTableCell;
