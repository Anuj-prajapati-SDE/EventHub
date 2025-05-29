import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EventIcon from '@mui/icons-material/Event';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        pt: { xs: 6, md: 8 },
        pb: 4,
        mt: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          opacity: 0.03,
          zIndex: 0,
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
          backgroundColor: theme.palette.secondary.main,
          opacity: 0.03,
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Logo and description */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 30 }} />
                <Typography variant="h5" fontWeight="bold" color="primary">
                  EventHub
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                EventHub simplifies venue booking with our smart search algorithm and secure platform.
                Find and book the perfect venue for any occasion, anytime, anywhere.
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <IconButton 
                  aria-label="Facebook" 
                  sx={{ 
                    mr: 1,
                    color: '#1877F2',
                    backgroundColor: 'rgba(24, 119, 242, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(24, 119, 242, 0.2)',
                    }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  aria-label="Twitter" 
                  sx={{ 
                    mr: 1,
                    color: '#1DA1F2',
                    backgroundColor: 'rgba(29, 161, 242, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(29, 161, 242, 0.2)',
                    }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  aria-label="Instagram" 
                  sx={{ 
                    mr: 1,
                    color: '#E4405F',
                    backgroundColor: 'rgba(228, 64, 95, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(228, 64, 95, 0.2)',
                    }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  aria-label="LinkedIn" 
                  sx={{ 
                    color: '#0A66C2',
                    backgroundColor: 'rgba(10, 102, 194, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(10, 102, 194, 0.2)',
                    }
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Quick links */}
          <Grid item xs={6} sm={3} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.primary">
                Quick Links
              </Typography>
              <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Browse Venues', path: '/venues' },
                  { label: 'Dashboard', path: '/dashboard' },
                  { label: 'Contact Us', path: '/contact' },
                ].map((link, index) => (
                  <Box component="li" key={index} sx={{ mb: 1.5 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      variant="body2"
                      color="text.secondary"
                      underline="hover"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                          pl: 0.5,
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
          
          {/* Company */}
          <Grid item xs={6} sm={3} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.primary">
                Company
              </Typography>
              <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
                {[
                  { label: 'About Us', path: '/about' },
                  { label: 'Careers', path: '/careers' },
                  { label: 'Blog', path: '/blog' },
                  { label: 'Partners', path: '/partners' },
                ].map((link, index) => (
                  <Box component="li" key={index} sx={{ mb: 1.5 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      variant="body2"
                      color="text.secondary"
                      underline="hover"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                          pl: 0.5,
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
          
          {/* Contact */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.primary">
                Subscribe to Our Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Get the latest updates, news and special offers sent directly to your inbox.
              </Typography>
              
              <Paper
                elevation={0}
                sx={{ 
                  display: 'flex',
                  p: 0.5,
                  mb: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Your email address"
                  size="small"
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button 
                  variant="contained" 
                  endIcon={<SendIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Subscribe
                </Button>
              </Paper>
            </motion.div>
          </Grid>
          {/* Contact Info */}
          <Grid item xs={6} sm={3} md={2}>
  <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.primary">
                Contact Us
              </Typography>
              <Box sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <PhoneIcon fontSize="small" sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <EmailIcon fontSize="small" sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    contact@eventhub.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <LocationOnIcon fontSize="small" sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    123 Main St, New York, NY 10001
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} EventHub, Inc. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', mt: { xs: 2, sm: 0 } }}>
            {['Privacy', 'Terms'].map((item, index) => (
              <Link 
                key={index} 
                href={`/${item.toLowerCase()}`} 
                variant="body2" 
                color="text.secondary" 
                sx={{ mx: 1 }} 
                underline="hover"
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;