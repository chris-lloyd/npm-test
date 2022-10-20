import React, { SyntheticEvent } from 'react';
import {
  TextField, BaseTextFieldProps,
} from '@mui/material';
// import PropTypes from 'prop-types';

interface IProps extends BaseTextFieldProps {
  changeField:Function
  inputLabel?:string
  inputValue:string|number
  inputName:string
  sortid?:string|number
}

const CustomTextField: React.FC<IProps > = ({
  changeField = () => {},
  size = 'small',
  inputLabel = undefined,
  inputValue,
  inputName,
  type = 'string',
  multiline = false,
  rows = undefined,
  fullWidth = true,
  inputProps = {},
  variant = 'outlined',
  disabled = false,
  // eslint-disable-next-line no-unused-vars
  sortid = '',
}) => {
  const handleChange = (evt:SyntheticEvent) => {
    changeField(evt);
  };

  return (
    <TextField
      disabled={disabled}
      required
      type={type}
      id={inputName}
      variant={variant}
      name={inputName}
      label={inputLabel}
      defaultValue={inputValue}
      size={size}
      multiline={multiline}
      rows={rows}
      inputProps={inputProps}
      onBlur={handleChange}
      fullWidth={fullWidth}
    />
  );
};

export default CustomTextField;
