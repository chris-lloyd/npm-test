import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const CustomLoader = ({ isBackDrop = false }:{isBackDrop:boolean}) => {
  if (!isBackDrop) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50vh' }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CustomLoader;
