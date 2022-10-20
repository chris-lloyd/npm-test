import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import MenuProps from './menuProps';
import useStyles from './styles';

interface IProps extends SelectProps {
control?:any
list?:any[]
value?:string
listType?:string
error?:any
errorMessage?:string
handleChange?:Function |null
selectAll?:boolean
isFocused?:boolean
smallStyle?:boolean
status?:string
}

const CustomControlledSelect: React.FC<IProps> = ({
  control = null,
  label = '',
  name = '',
  value: controlledValue = null,
  list = [],
  listType = '',
  variant = 'outlined',
  size = 'small',
  error = null,
  errorMessage = '',
  handleChange = null,
  defaultValue = '',
  selectAll = false,
  isFocused = false,
  multiple = false,
  disabled = false,
  smallStyle = false,
  status = 'regular',
}) => {
  const classes: any = useStyles();
  const theme:any = useTheme();
  return (
    <FormControl
      variant={variant}
      className={!smallStyle ? classes.root : classes.smallRoot}
      error={error}
      disabled={disabled}
      size={smallStyle ? 'small' : size}
      sx={{
        margin: theme.spacing(1, 'auto'),
        width: !smallStyle ? '100%' : 'auto',
        minWidth: !smallStyle ? '300px' : '100%',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: status !== 'regular' ? `${theme.palette.status[status].main} !important` : undefined,
        },
        '& .MuiFormLabel-root': {
          color: status !== 'regular' ? `${theme.palette.status[status].main} !important` : undefined,
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: status !== 'regular' ? `${theme.palette.status[status].light} !important` : undefined,
          },
        },
        '& .Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: status !== 'regular' ? `${theme.palette.status[status].main} !important` : undefined,
            color: status !== 'regular' ? `${theme.palette.status[status].main} !important` : undefined,
          },
        },
      }}
    >
      <InputLabel htmlFor={`${name}--label`}>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }: any) => (
          <Select
            className={!smallStyle ? classes.select : classes.smallSelect}
            size={size}
            labelId={`${name}--label`}
            label={label}
            value={!controlledValue ? value : controlledValue}
            id={name}
            autoFocus={isFocused}
            name={name}
            onChange={
              !handleChange
                ? onChange
                : (evt) => {
                  handleChange(evt);
                  onChange();
                }
            }
            MenuProps={MenuProps}
            multiple={multiple}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: status !== 'regular' ? theme.palette.status[status].main : undefined,
              },
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: status !== 'regular' ? theme.palette.status[status].light : undefined,
                },
              },
              '& .MuiInputLabel': {
                color: status !== 'regular' ? theme.palette.status[status].main : undefined,
              },
            }}
          >
            <MenuItem aria-label="None" disabled value="" />
            {selectAll && (
              <MenuItem aria-label="allSelected" value="allSelected">
                Tout selectionner
              </MenuItem>
            )}
            {listType === 'object'
              && list.length >= 0
              && list.map((object: any) => (
                <MenuItem
                  value={object.code || object._id}
                  key={object._id}
                  disabled={object.isDisabled}
                >
                  { object.name || object.label}
                </MenuItem>
              ))}
            {listType === 'string'
              && list.length >= 0
              && list.map((string: any) => (
                <MenuItem value={string} key={string}>
                  {string}
                </MenuItem>
              ))}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default CustomControlledSelect;
