import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isScrolled = useScrollTrigger();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };
  
  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };
  
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      handleUserMenuClose();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Main navigation links
  const navLinks = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Venues', path: '/venues', icon: <LocationCityIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
    { text: 'Contact', path: '/contact', icon: <ContactSupportIcon /> },
  ];
  
  // Example notifications
  const notifications = [
    {
      id: 1,
      title: 'Booking Confirmed',
      message: 'Your booking at Grand Ballroom has been confirmed',
      time: '10 min ago'
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'We received your payment of $1,200',
      time: '1 hour ago'
    },
    {
      id: 3,
      title: 'New Venue Available',
      message: 'Check out the new Urban Loft venue in your area',
      time: '1 day ago'
    }
  ];
  
  // Custom scroll trigger hook
  function useScrollTrigger() {
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
      function handleScroll() {
        setTrigger(window.scrollY > 50);
      }
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    return trigger;
  }

  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={isScrolled ? 4 : 0} 
        sx={{ 
          bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 70 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                fontWeight: 'bold',
                color: 'primary.main',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <EventIcon sx={{ mr: 1 }} />
              EventHub
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navLinks.map((link) => (
                <Button
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    mx: 1,
                    color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                    position: 'relative',
                    '&::after': location.pathname === link.path ? {
                      content: '""',
                      position: 'absolute',
                      bottom: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                    } : {},
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: 'primary.main',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                      }
                    },
                  }}
                >
                  {link.text}
                </Button>
              ))}
            </Box>

            {/* Desktop Auth Buttons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {!currentUser ? (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={{ mx: 1 }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    sx={{ mx: 1 }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <IconButton 
                    color="inherit" 
                    sx={{ mr: 2 }}
                    onClick={handleNotificationOpen}
                  >
                    <Badge badgeContent={notifications.length} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  
                  <Button
                    component={RouterLink}
                    to="/dashboard"
                    sx={{ mr: 2 }}
                  >
                    Dashboard
                  </Button>
                  <IconButton
                    onClick={handleUserMenuOpen}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    sx={{ 
                      p: 0,
                      border: `2px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Avatar 
                      src={currentUser?.avatar || "https://randomuser.me/api/portraits/men/88.jpg"}
                      alt={currentUser?.name || "User"}
                      sx={{ width: 36, height: 36 }}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={userMenuAnchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                      elevation: 3,
                      sx: { 
                        mt: 1.5, 
                        minWidth: 180,
                        borderRadius: 2,
                        '& .MuiMenuItem-root': {
                          py: 1.5
                        }
                      }
                    }}
                  >
                    <MenuItem sx={{ pb: 0 }}>
                      <Box sx={{ py: 0.5 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {currentUser?.name || "User"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {currentUser?.email || "user@example.com"}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem 
                      onClick={() => {
                        navigate('/dashboard');
                        handleUserMenuClose();
                      }}
                    >
                      <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                      </ListItemIcon>
                      Dashboard
                    </MenuItem>
                    <MenuItem 
                      onClick={() => {
                        navigate('/profile');
                        handleUserMenuClose();
                      }}
                    >
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                  
                  {/* Notifications Menu */}
                  <Menu
                    anchorEl={notificationAnchor}
                    open={Boolean(notificationAnchor)}
                    onClose={handleNotificationClose}
                    PaperProps={{
                      elevation: 3,
                      sx: { 
                        mt: 1.5, 
                        width: 320,
                        maxHeight: 400,
                        borderRadius: 2,
                      }
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <Box sx={{ p: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" fontWeight="bold">
                        Notifications
                      </Typography>
                      <Button size="small">Mark all as read</Button>
                    </Box>
                    <Divider />
                    
                    {notifications.length > 0 ? (
                      <>
                        {notifications.map((notification) => (
                          <MenuItem key={notification.id} onClick={handleNotificationClose} sx={{ py: 2, px: 2 }}>
                            <Box sx={{ width: '100%' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                  {notification.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {notification.time}
                                </Typography>
                              </Box>
                              <Typography variant="body2">{notification.message}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                        <Divider />
                        <Box sx={{ p: 1, textAlign: 'center' }}>
                          <Button size="small" onClick={() => {
                            navigate('/notifications');
                            handleNotificationClose();
                          }}>
                            View All
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No notifications yet
                        </Typography>
                      </Box>
                    )}
                  </Menu>
                </>
              )}
            </Box>

            {/* Mobile menu toggle */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              {currentUser && (
                <IconButton 
                  color="inherit" 
                  sx={{ mr: 2 }}
                  onClick={handleNotificationOpen}
                >
                  <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile menu drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': { width: '85%', maxWidth: 360 },
          display: { xs: 'block', md: 'none' },
        }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="primary" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              <EventIcon sx={{ mr: 1 }} />
              EventHub
            </Typography>
            <IconButton onClick={handleMobileMenuToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          {currentUser && (
            <Box sx={{ px: 3, pb: 2 }}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                display: 'flex', 
                alignItems: 'center' 
              }}>
                <Avatar
                  src={currentUser?.avatar || "https://randomuser.me/api/portraits/men/88.jpg"}
                  alt={currentUser?.name || "User"}
                  sx={{ width: 50, height: 50, mr: 2, border: `2px solid ${theme.palette.primary.main}` }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {currentUser?.name || "User"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    {currentUser?.email || "user@example.com"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 1 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.text} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={link.path}
                  onClick={handleMobileMenuToggle}
                  selected={location.pathname === link.path}
                  sx={{
                    borderRadius: 3,
                    mx: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: location.pathname === link.path ? 'primary.main' : 'inherit' }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 1 }}>
          {currentUser ? (
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/dashboard"
                  onClick={handleMobileMenuToggle}
                  selected={location.pathname === '/dashboard'}
                  sx={{
                    borderRadius: 3,
                    mx: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/profile"
                  onClick={handleMobileMenuToggle}
                  selected={location.pathname === '/profile'}
                  sx={{
                    borderRadius: 3,
                    mx: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              
              <Divider sx={{ my: 1 }} />
              
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleLogout();
                    handleMobileMenuToggle();
                  }}
                  sx={{
                    borderRadius: 3,
                    mx: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/login"
                  onClick={handleMobileMenuToggle}
                  sx={{
                    borderRadius: 3,
                    mx: 1,
                    mb: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              
              <Box sx={{ px: 2 }}>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  fullWidth
                  onClick={handleMobileMenuToggle}
                  sx={{ py: 1.5 }}
                >
                  Register
                </Button>
              </Box>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
};

// Add this missing function for the useScrollTrigger hook to work
function useScrollTrigger() {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setTrigger(window.scrollY > 50);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return trigger;
}

export default Navbar;