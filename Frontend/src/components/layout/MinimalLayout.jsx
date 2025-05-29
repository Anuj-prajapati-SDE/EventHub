import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ScrollToTop from '../common/ScrollToTop';

const MinimalLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Box component="main" sx={{ minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MinimalLayout;