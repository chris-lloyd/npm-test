import React, { useState, useEffect } from 'react';
import {
  Modal, Fade, Paper, IconButton, MenuItem, ListItemIcon,
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import {makeStyles} from '@mui/styles'
import CustomButton from '../CustomButton';
import CustomTypography from '../CustomTypography';

const useStyles = makeStyles((theme:any) => ({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '500px',
    margin: 'auto',
  },
  alternativeButton: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2, 'auto'),
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'inherit',
    margin: theme.spacing(2, 0, 0, 0),
  },
  paper: {
    padding: theme.spacing(4, 6),
    outline: 'none',
    boxShadow: theme.shadows[5],
  },
  buttonCancel: {
    margin: theme.spacing(0, 8, 0, 2),
  },
  buttonValidate: {
    margin: theme.spacing(0, 2, 0, 8),
  },
}));

interface buttonProps {
  buttonType?: any
  icon?:any
  fullWidth?:boolean
  buttonText?:string
  handler:Function
  buttonColor?:'error' | 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined
  disabled?:boolean
  variant?:any
  buttonSx?:any
  iconSize?:'medium' | 'small' | 'large' | undefined
  iconAriaLabel?:string
  isMargin?:boolean
}

interface typographyProp
{
  variant?:any
  alertTitle:string
  alertText?:string
}

interface generalProps {
  closeHandler?:Function
}

const CustomConfirmModal: React.FC<buttonProps & typographyProp & generalProps> = ({
  icon: Icon = undefined,
  buttonText = '',
  handler,
  buttonColor = 'secondary',
  buttonType = 'button',
  variant = 'contained',
  fullWidth = false,
  alertTitle,
  alertText = '',
  closeHandler = null,
  disabled = false,
  buttonSx = {},
  iconSize = 'medium',
  iconAriaLabel = 'confimer',
  isMargin = false,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    if (buttonType === 'handler') {
      setOpen(true);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (closeHandler) {
      closeHandler();
    }
    setOpen(false);
  };

  const handleConfirm = () => {
    handler();
    handleClose();
  };
  const boxStyles = {
    padding: theme.spacing(4, 6),
    outline: 'none',
    boxShadow: theme.shadows[5],
  };
  return (
    <>
      {buttonType === 'button' && (
      <CustomButton
        variant={variant}
        disabled={disabled}
        startIcon={(<Icon />)}
        color={buttonColor}
        fullWidth={fullWidth}
        handler={handleOpen}
        title={buttonText}
        type={buttonType}
        sx={{ ...buttonSx }}
      />
      )}

      {buttonType === 'icon' && (
      <IconButton
        onClick={handleOpen}
        color={buttonColor}
        size={iconSize}
        aria-label={iconAriaLabel}
        disabled={disabled}
      >
        <Icon />
      </IconButton>
      )}

      {buttonType === 'link' && (
      <CustomButton
        variant={variant}
        aria-label="add"
        color={buttonColor}
        isMargin={isMargin}
        handler={handleOpen}
        title={buttonText}
        startIcon={Icon}
        type={buttonType}
        disabled={disabled}
      />
      )}

      {buttonType === 'menuItem' && (
      <MenuItem
        key={buttonText}
        onClick={handleOpen}
      >
        {Icon && (
        <ListItemIcon>
          <Icon color={buttonColor} />
        </ListItemIcon>
        )}
        <CustomTypography
          variant="subtitle1"
          isBold
          title={buttonText}
          color={buttonColor}
          noVerticalMargin
          align="left"
        />
      </MenuItem>
      )}

      <Modal
        aria-labelledby="modale"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <Paper
            sx={{
              ...boxStyles,
            }}
          >
            <div>
              <CustomTypography
                variant="h4"
                align="center"
                title={alertTitle}
                botGutter={4}
              />
              <CustomTypography
                variant="body1"
                align="center"
                title={alertText}
                botGutter={4}
              />
            </div>
            <div className={classes.controls}>
              <div className={classes.buttonCancel}>
                <CustomButton
                  sx={{ ...buttonSx }}
                  title="annuler"
                  size="medium"
                  mediumButton
                  variant="text"
                  startIcon={<ChevronLeftIcon />}
                  handler={handleClose}
                />
              </div>
              <div className={classes.buttonValidate}>
                <CustomButton
                  sx={{ ...buttonSx }}
                  title="valider"
                  size="medium"
                  mediumButton
                  variant="contained"
                  endIcon={<ChevronRightIcon />}
                  handler={handleConfirm}
                />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default CustomConfirmModal;
