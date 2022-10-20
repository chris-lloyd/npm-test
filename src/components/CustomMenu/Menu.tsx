import React, { useState } from 'react';
import {
  Menu, MenuItem, ListItemIcon, IconButton, ListItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import CustomTypography from '../CustomTypography';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 0,
  },
}));

interface optionObject {
  id:string,
  icon?:ReactJSXElement
  title?:string,
  customItem:ReactJSXElement
}

interface optionsProps {
  options:optionObject[]
  disabledButton?:boolean
}

const CustomMenu: React.FC<optionsProps> = ({ options, disabledButton = false }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = ({ option = [] }:any) => {
    if (option.handler) {
      option.handler();
    }
    handleClose();
  };
  return (
    <div>
      <IconButton
        disabled={disabledButton}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color="inherit" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={handleClose}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option:any) => (
          <div
            key={option.id}
          >
            {!option.customItem && (
              <MenuItem
                onClick={() => handleItemClick({ option })}
              >
                <ListItem>
                  {option.icon && (
                    <ListItemIcon classes={{ root: classes.root }}>
                      {option.icon && (<option.icon color="inherit" />) }
                    </ListItemIcon>
                  )}

                  <CustomTypography
                    variant="subtitle1"
                    color="textSecondary"
                    isBold
                    title={option.title}
                  />
                </ListItem>
              </MenuItem>
            )}
            {option.customItem && (
              option.customItem
            )}
          </div>
        ))}
      </Menu>
    </div>
  );
};

export default CustomMenu;
