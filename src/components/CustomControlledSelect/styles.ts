import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  root: {
    margin: theme.spacing(1, 'auto'),
    width: '80%',
  },
  smallRoot: {
    minWidth: '100%',
  },
  outlined: {
    padding: 0,
  },
  subItem: {
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
