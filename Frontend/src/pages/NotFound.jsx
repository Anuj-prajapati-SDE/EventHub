import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { motion } from 'framer-motion';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{
        py: 10,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)}, ${alpha(theme.palette.background.default, 0.8)}),
                    url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha('#ffffff', 0.95)}, ${alpha('#ffffff', 0.9)})`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ErrorOutlineIcon 
              sx={{ fontSize: 120, color: theme.palette.error.main, mb: 2 }} 
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h1" fontWeight="bold" sx={{ fontSize: { xs: '4rem', md: '6rem' } }}>
              404
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
              Page Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                component={RouterLink}
                to="/"
                startIcon={<HomeIcon />}
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Back to Home
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/venues"
                startIcon={<SearchIcon />}
                size="large"
                sx={{ px: 3, py: 1.5 }}
              >
                Browse Venues
              </Button>
            </Box>
          </motion.div>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;