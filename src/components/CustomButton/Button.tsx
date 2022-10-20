import React from 'react';
import {
  Button, Divider, IconButton, ButtonProps, CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomTypography from '../CustomTypography';

interface IProps extends ButtonProps {
  iconButton?:boolean
  icon?:Object|null
  handler?:Function | null;
  buttonProps?: any
  underline?:boolean
  customIcon?:object|null
  titleVariant?:'h1' | 'h2' | 'h3' | 'h4'
  | 'h5' | 'h6' | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'inherit' | undefined;
  sx?:object
  isLoading?:boolean
  mediumButton?:boolean
  isMargin?:boolean
  bigButton?:boolean
}

const CustomButton: React.FC<IProps > = ({
  title = '',
  handler = null,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  fullWidth = false,
  endIcon = null,
  startIcon = null,
  iconButton = false,
  icon: Icon = null,
  buttonProps = {},
  underline = false,
  customIcon = null,
  titleVariant = 'subtitle1',
  sx = {},
  isLoading = false,
  mediumButton = false,
  bigButton = false,
  isMargin = true,
}) => {
  const theme = useTheme();
  return (
    <>
      {!iconButton && (
      <Button
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        color={color}
        onClick={handler}
        type={type}
        fullWidth={fullWidth}
        sx={{
          margin: isMargin ? theme.spacing(1, 'auto') : 0,
          padding: bigButton ? theme.spacing(2, 3) : theme.spacing(1, 2),
          height: mediumButton ? '35px' : undefined,
          justifyContent: endIcon ? 'space-between' : 'center',
          width: bigButton ? '100%' : undefined,
          borderRadius: bigButton ? '10px' : undefined,
          ...sx,
        }}
        startIcon={startIcon}
        endIcon={isLoading ? <CircularProgress size={20} /> : endIcon}
        {...buttonProps}
      >
        <CustomTypography title={title} variant={titleVariant} isBold align={endIcon ? 'left' : 'center'} />
          {underline && (
            <Divider
              sx={{
                borderBottom: '1px solid',
                minWidth: '63%',
                position: 'absolute',
                left: 25,
              }}
            />
          )}
      </Button>
      )}
      {iconButton && (
      <IconButton
        onClick={handler}
        component="span"
        disabled={disabled}
        {...buttonProps}
        style={disabled ? { color: 'rgba(0, 0, 0, 0.26)' } : {}}
        color={color}
      >
        {!customIcon ? Icon : customIcon}
      </IconButton>
      )}
    </>
  );
};

export default CustomButton;
