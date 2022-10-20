import React from 'react';
import {
  Typography, TypographyProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IProps extends TypographyProps {
  noHorizontalMargin?:boolean,
  noVerticalMargin?:boolean,
  isItalic?:boolean,
  isBold?:boolean,
  sortid?:string | number,
  marginRight?:boolean | any
  botGutter?:number
  hidden?:boolean
}

const CustomTypography: React.FC<IProps > = ({
  title = '',
  variant = 'subtitle1',
  color = 'inherit',
  align = 'center',
  noWrap = false,
  marginRight = false,
  noHorizontalMargin = false,
  noVerticalMargin = false,
  isItalic = false,
  isBold = false,
  display = '',
  sx = {},
  botGutter = undefined,
  hidden = false,
  // eslint-disable-next-line no-unused-vars
  sortid = '',
}: any) => {
  const theme = useTheme();

  return (
    <Typography
      variant={variant}
      color={color}
      align={align}
      noWrap={noWrap}
      display={display}
      sx={{
        fontWeight: isBold ? 'bold' : undefined,
        fontStyle: isItalic ? 'italic' : undefined,
        width: noVerticalMargin ? 'auto' : '100%',
        margin: (noVerticalMargin && theme.spacing(1))
          || (noHorizontalMargin && theme.spacing(0, 'auto'))
          || theme.spacing(1, 'auto'),
        mr: marginRight ? '6px' : undefined,
        mb: botGutter || undefined,
        display: hidden ? 'none' : undefined,
        ...sx,
      }}
    >
      {variant !== 'h5' && variant !== 'h6'
        ? `${title.charAt(0).toUpperCase()}${title.slice(1)}`
        : ` ${title.toUpperCase()}`}
    </Typography>
  );
};
export default CustomTypography;
