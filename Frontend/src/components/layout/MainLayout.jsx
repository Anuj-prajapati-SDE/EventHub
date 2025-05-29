import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 64px - 300px)' }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;