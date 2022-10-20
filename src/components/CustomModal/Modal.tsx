import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Modal, Fade, Backdrop, IconButton, CardActionArea, Card, CardContent,
} from '@mui/material';
import CustomTypography from '../CustomTypography';
import CustomButton from '../CustomButton';

interface modalProps {
  component: React.FunctionComponent <any> | React.ElementType<any>
  icon?:any
  openHandler?:Function
  closeHandler?:Function
  rest?:Object
  isStoppingPropagation?:boolean
  variant?:'text' | 'outlined' | 'contained' | undefined
  isOpen?:boolean
}

interface buttonProps {
  startIcon?:any
  endIcon?:React.ComponentType<any>
  buttonType?:string
  disabledButton?:boolean
  colorText?:'error' | 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined
  color?:'error' | 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined
  fullWidth?:boolean
  iconProps?:Object
  buttonSx?:any
}

interface typographyProps {
  addButtonText?:string,
}

const useStyles = makeStyles((theme:any) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    maxWidth: '90vw',
    minWidth: '60vw',
    margin: 'auto',
  },
  button: {
    margin: theme.spacing(0, 'auto'),
  },
  text: {
    height: '100%',
    width: '100%',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardItem: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: 'auto',
    height: '100%',
  },
  hidden: {
    display: 'none',
  },
}));

const CustomModal: React.FC<modalProps & buttonProps & typographyProps> = ({
  component: Component,
  icon: Icon = undefined,
  startIcon: StartIcon = undefined,
  endIcon: EndIcon = undefined,
  addButtonText = '',
  buttonType = 'button',
  openHandler = null,
  disabledButton = false,
  colorText = 'inherit',
  closeHandler = null,
  color = 'primary',
  rest = {},
  fullWidth = false,
  isStoppingPropagation = false,
  variant = 'text',
  iconProps = {},
  isOpen = false,
  buttonSx = {},
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleOpen = (evt:any) => {
    if (openHandler) {
      openHandler();
    }
    setOpen(true);
    if (isStoppingPropagation) {
      evt.stopPropagation();
    }
  };

  const handleClose = (evt:any) => {
    if (isStoppingPropagation) {
      evt.stopPropagation();
    }
    if (closeHandler) {
      closeHandler();
    }
    setOpen(false);
  };
  return (
    <>
      {buttonType === 'tile' && (
        <Card
          className={classes.cardItem}
          onClick={handleOpen}
        >
          <CardActionArea>
            <CardContent className={classes.cardContent}>
              <div>
                <Icon style={{ fontSize: 50 }} />
              </div>
              <CustomTypography
                variant="h5"
                title={addButtonText}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      )}
      {buttonType === 'button' && (
        <CustomButton
          variant={variant}
          title={addButtonText}
          color={color}
          disabled={disabledButton}
          handler={handleOpen}
          startIcon={(
            (StartIcon && (<StartIcon {...iconProps} />))
            || (Icon && (<Icon {...iconProps} />))
          )}
          endIcon={EndIcon && (<EndIcon />)}
          fullWidth={fullWidth}
          sx={{ ...buttonSx }}
        />
      )}
      {buttonType === 'icon' && (
        <IconButton
          color={color}
          component="span"
          onClick={handleOpen}
        >
          <Icon {...iconProps} />
        </IconButton>
      )}
      {buttonType === 'link' && (
        <CustomButton
          title={`${addButtonText}`}
          variant="text"
          handler={handleOpen}
          size="medium"
          color={color}
          sx={{ ...buttonSx }}
        />
      )}
      {buttonType === 'text' && (
        <CustomButton
          title={`${addButtonText}`}
          variant="text"
          handler={handleOpen}
          size="medium"
          color={colorText}
          sx={{ ...buttonSx }}
        />
      )}

      <Modal
        aria-labelledby="modale"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <Component
              handleModalClose={handleClose}
              handleModalOpen={handleOpen}
              open={open}
              {...rest}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default CustomModal;
