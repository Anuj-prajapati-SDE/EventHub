import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { motion } from 'framer-motion';

const PageHeader = ({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  background = 'gradient',
  align = 'center',
  height = 'medium'
}) => {
  const theme = useTheme();
  
  // Define background styles based on the background prop
  const getBackgroundStyle = () => {
    switch (background) {
      case 'primary':
        return {
          bgcolor: theme.palette.primary.main,
        };
      case 'secondary':
        return {
          bgcolor: theme.palette.secondary.main,
        };
      case 'light':
        return {
          bgcolor: theme.palette.grey[100],
        };
      case 'dark':
        return {
          bgcolor: theme.palette.grey[900],
          color: 'white',
        };
      case 'image':
        return {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/1600x900/?event,venue)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        };
      case 'gradient':
      default:
        return {
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
        };
    }
  };
  
  // Define height styles
  const getHeightStyle = () => {
    switch (height) {
      case 'small':
        return { py: 4 };
      case 'large':
        return { py: 10 };
      case 'medium':
      default:
        return { py: 6 };
    }
  };
  
  return (
    <Box 
      sx={{
        ...getBackgroundStyle(),
        ...getHeightStyle(),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          zIndex: 1,
        }}
      />
      
      {/* Background shapes */}
      {background === 'gradient' && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -80,
              left: -80,
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
        </>
      )}
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: align }}>
          {breadcrumbs.length > 0 && (
            <Breadcrumbs 
              separator={<NavigateNextIcon fontSize="small" />} 
              sx={{ 
                mb: 2,
                '& .MuiBreadcrumbs-ol': {
                  justifyContent: align === 'center' ? 'center' : 'flex-start',
                },
                color: background === 'light' ? 'text.primary' : 'inherit',
                opacity: 0.8,
              }}
            >
              {breadcrumbs.map((crumb, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={crumb.href}
                  underline="hover"
                  color="inherit"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {crumb.icon && <Box component="span" sx={{ mr: 0.5, display: 'flex' }}>{crumb.icon}</Box>}
                  {crumb.label}
                </Link>
              ))}
            </Breadcrumbs>
          )}
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' } 
              }}
            >
              {title}
            </Typography>
          </motion.div>
          
          {subtitle && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.9, 
                  maxWidth: 800, 
                  mx: align === 'center' ? 'auto' : 0,
                  fontWeight: 'normal',
                }}
              >
                {subtitle}
              </Typography>
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PageHeader;