import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Paper,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
  useTheme,
  alpha,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import EastIcon from '@mui/icons-material/East';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaidIcon from '@mui/icons-material/Paid';
import SubjectIcon from '@mui/icons-material/Subject';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';

const UserDashboard = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [stats, setStats] = useState({
    upcoming: 0,
    past: 0,
    totalSpent: 0,
  });
  
  // Show success message if redirected from booking
  const bookingSuccess = location.state?.bookingSuccess || false;
  const bookingId = location.state?.bookingId || '';
  const venueName = location.state?.venueName || '';

  useEffect(() => {
    // Simulate API call to get user bookings
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        const currentDate = new Date("2025-05-28 20:12:59");
        
        // Mock booking data
        const mockBookings = [
          {
            id: '123456',
            venue: {
              name: 'Grand Ballroom',
              image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
              address: {
                city: 'New York',
                state: 'NY'
              }
            },
            startTime: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            endTime: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
            attendees: 200,
            purpose: 'Wedding Reception',
            status: 'confirmed',
            paymentStatus: 'paid',
            totalPrice: 4800,
            createdAt: new Date(currentDate.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '789012',
            venue: {
              name: 'Urban Loft Space',
              image: 'https://images.unsplash.com/photo-1517957754642-2870518e16f8',
              address: {
                city: 'Chicago',
                state: 'IL'
              }
            },
            startTime: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
            endTime: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
            attendees: 80,
            purpose: 'Corporate Presentation',
            status: 'pending',
            paymentStatus: 'unpaid',
            totalPrice: 1500,
            createdAt: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '345678',
            venue: {
              name: 'Seaside Pavilion',
              image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
              address: {
                city: 'Miami',
                state: 'FL'
              }
            },
            startTime: new Date(currentDate.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
            endTime: new Date(currentDate.getTime() - 45 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
            attendees: 150,
            purpose: 'Company Retreat',
            status: 'completed',
            paymentStatus: 'paid',
            totalPrice: 3200,
            createdAt: new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          }
        ];
        
        // If we have a new booking from the state, add it to the top
        if (bookingSuccess && bookingId) {
          mockBookings.unshift({
            id: bookingId,
            venue: {
              name: venueName || 'Grand Ballroom & Conference Center',
              image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329',
              address: {
                city: 'New York',
                state: 'NY'
              }
            },
            startTime: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            endTime: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
            attendees: 100,
            purpose: 'Conference',
            status: 'pending',
            paymentStatus: 'processing',
            totalPrice: 2400,
            createdAt: new Date().toISOString(),
          });
        }
        
        // Calculate stats
        const upcoming = mockBookings.filter(b => 
          ['pending', 'confirmed'].includes(b.status) && 
          new Date(b.startTime) > currentDate
        ).length;
        
        const past = mockBookings.filter(b => 
          b.status === 'completed' || 
          new Date(b.startTime) < currentDate
        ).length;
        
        const totalSpent = mockBookings
          .filter(b => b.paymentStatus === 'paid')
          .reduce((sum, booking) => sum + booking.totalPrice, 0);
        
        setBookings(mockBookings);
        setStats({
          upcoming,
          past,
          totalSpent,
        });
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    
    // Clear location state after showing success message
    if (bookingSuccess) {
      const timer = setTimeout(() => {
        window.history.replaceState({}, document.title);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [bookingSuccess, bookingId, venueName]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDownloadReceipt = (bookingId) => {
    console.log('Downloading receipt for booking:', bookingId);
    // In a real app, this would initiate a download of the receipt
    handleCloseActionMenu();
  };

  const handleCancelBooking = (bookingId) => {
    console.log('Cancelling booking:', bookingId);
    // In a real app, this would send a request to cancel the booking
    handleCloseActionMenu();
  };
  
  const handleViewBookingDetails = (bookingId) => {
    console.log('Viewing booking details:', bookingId);
    // In a real app, this would navigate to the booking details page
    handleCloseActionMenu();
  };
  
  const handleWriteReview = (bookingId) => {
    console.log('Writing review for booking:', bookingId);
    // In a real app, this would open a review form
    handleCloseActionMenu();
  };
  
  const handleRebookVenue = (bookingId) => {
    console.log('Rebooking venue from booking:', bookingId);
    // In a real app, this would navigate to booking form with prefilled data
    handleCloseActionMenu();
  };
  
  const handleOpenActionMenu = (event, bookingId) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedBookingId(bookingId);
  };
  
  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
    setSelectedBookingId(null);
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    const currentDate = new Date("2025-05-28 20:12:59"); // Use the current date
    const bookingDate = new Date(booking.startTime);
    
    switch (activeTab) {
      case 0: // All bookings
        return true;
      case 1: // Upcoming bookings
        return ['pending', 'confirmed'].includes(booking.status) && bookingDate > currentDate;
      case 2: // Past bookings
        return booking.status === 'completed' || bookingDate < currentDate;
      default:
        return true;
    }
  });

  // Get status chip color based on status
  const getStatusChipColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return format(date, "EEE, MMM d, yyyy • h:mm aaa");
  };

  if (loading) {
    return <Loader message="Loading your dashboard..." />;
  }

  return (
    <>
      <PageHeader 
        title="My Dashboard" 
        subtitle={`Welcome back, ${currentUser?.name || 'Anuj-prajapati-SDE'}!`}
        background="gradient"
      />
      
      <Container maxWidth="lg" sx={{ py: 5, mb: 3 }}>
        {/* Success message for new booking */}
        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert severity="success" sx={{ mb: 4 }}>
              <Typography variant="subtitle1">
                Your booking has been successfully submitted!
              </Typography>
              <Typography variant="body2">
                Booking ID: {bookingId}. The venue owner will confirm your booking shortly.
              </Typography>
            </Alert>
          </motion.div>
        )}
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Paper 
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box 
                  sx={{
                    mr: 3,
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <EventAvailableIcon color="primary" sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Upcoming Events
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.upcoming}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Paper 
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box 
                  sx={{
                    mr: 3,
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.secondary.main, 0.15),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AccessTimeIcon color="secondary" sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Past Events
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.past}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Paper 
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box 
                  sx={{
                    mr: 3,
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.success.main, 0.15),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PaidIcon color="success" sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Spent
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ${stats.totalSpent.toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        <Grid container spacing={4}>
          {/* User Profile Card */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      src={currentUser?.avatar || ""} 
                      alt="Anuj-prajapati-SDE" 
                      sx={{ width: 100, height: 100, mb: 2, border: `3px solid ${theme.palette.primary.main}` }}
                    />
                    <Typography variant="h5" fontWeight="bold">
                      Anuj Prajapati
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      anuj.prajapati@example.com
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Member Since
                    </Typography>
                    <Typography variant="body1">
                      January 15, 2025
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Account Type
                    </Typography>
                    <Chip 
                      label="Event Organizer" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<EditIcon />}
                    component={RouterLink}
                    to="/profile"
                    sx={{ mt: 2 }}
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          {/* Bookings */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      My Bookings
                    </Typography>
                  </Box>
                  
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                      value={activeTab} 
                      onChange={handleTabChange}
                      variant="fullWidth"
                      sx={{ mt: 1 }}
                    >
                      <Tab label="All Bookings" />
                      <Tab label="Upcoming" />
                      <Tab label="Past" />
                    </Tabs>
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    {error ? (
                      <Alert severity="error">{error}</Alert>
                    ) : filteredBookings.length === 0 ? (
                      <Box sx={{ py: 4, textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                          No bookings found
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => navigate('/venues')}
                          sx={{ mt: 2 }}
                        >
                          Book a Venue
                        </Button>
                      </Box>
                    ) : (
                      <List disablePadding>
                        {filteredBookings.map((booking, index) => (
                          <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Paper
                              elevation={1}
                              sx={{ 
                                p: 2, 
                                mb: 2,
                                borderRadius: 3,
                              }}
                            >
                              <Grid container spacing={2}>
                                {/* Venue Image */}
                                <Grid item xs={12} sm={3}>
                                  <Box 
                                    component="img"
                                    src={booking.venue.image}
                                    alt={booking.venue.name}
                                    sx={{
                                      width: '100%',
                                      height: 120,
                                      objectFit: 'cover',
                                      borderRadius: 2,
                                    }}
                                  />
                                </Grid>
                                
                                {/* Booking Details */}
                                <Grid item xs={12} sm={9}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box>
                                      <Typography variant="h6" fontWeight="bold">
                                        {booking.venue.name}
                                      </Typography>
                                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">
                                          {booking.venue.address.city}, {booking.venue.address.state}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <Chip
                                        label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        color={getStatusChipColor(booking.status)}
                                        size="small"
                                        sx={{ mr: 1 }}
                                      />
                                      <IconButton 
                                        size="small" 
                                        onClick={(e) => handleOpenActionMenu(e, booking.id)}
                                      >
                                        <MoreVertIcon />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                  
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8}>
                                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EventIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                        <Typography variant="body2">
                                          {formatDate(booking.startTime)}
                                        </Typography>
                                      </Box>
                                      
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <PeopleIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                          <Typography variant="body2">
                                            {booking.attendees} guests
                                          </Typography>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <SubjectIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                          <Typography variant="body2">
                                            {booking.purpose}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={4}>
                                      <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                        <Typography variant="body2" color="text.secondary">
                                          Total Amount:
                                        </Typography>
                                        <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                          ${booking.totalPrice.toFixed(2)}
                                        </Typography>
                                        <Chip
                                          label={booking.paymentStatus}
                                          size="small"
                                          color={booking.paymentStatus === 'paid' ? 'success' : booking.paymentStatus === 'processing' ? 'info' : 'default'}
                                          variant="outlined"
                                          sx={{ mt: 0.5 }}
                                        />
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </motion.div>
                        ))}
                      </List>
                    )}
                    
                    {/* Action Menu */}
                    <Menu
                      anchorEl={actionMenuAnchor}
                      open={Boolean(actionMenuAnchor)}
                      onClose={handleCloseActionMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={() => handleViewBookingDetails(selectedBookingId)}>
                        View Details
                      </MenuItem>
                      <MenuItem onClick={() => handleDownloadReceipt(selectedBookingId)}>
                        Download Receipt
                      </MenuItem>
                      <MenuItem onClick={() => handleWriteReview(selectedBookingId)}>
                        Write Review
                      </MenuItem>
                      <MenuItem onClick={() => handleRebookVenue(selectedBookingId)}>
                        Book Again
                      </MenuItem>
                      <MenuItem onClick={() => handleCancelBooking(selectedBookingId)}>
                        <Typography color="error">Cancel Booking</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Recommended Venues */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Paper 
                elevation={0}
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, mt: 3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Recommended Venues
                  </Typography>
                  <Button 
                    variant="text" 
                    endIcon={<EastIcon />}
                    onClick={() => navigate('/venues')}
                  >
                    View All
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {[
                    {
                      id: '1',
                      name: 'Skyline Terrace',
                      location: 'Manhattan, NY',
                      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
                      rating: 4.9,
                    },
                    {
                      id: '2',
                      name: 'Harbor View Center',
                      location: 'San Francisco, CA',
                      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
                      rating: 4.8,
                    },
                    {
                      id: '3',
                      name: 'Modern Studio Loft',
                      location: 'Chicago, IL',
                      image: 'https://images.unsplash.com/photo-1517957754642-2870518e16f8',
                      rating: 4.7,
                    }
                  ].map((venue, index) => (
                    <Grid item xs={12} sm={4} key={venue.id}>
                      <Box 
                        sx={{ 
                          position: 'relative',
                          borderRadius: 2,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          height: 120,
                          '&:hover img': {
                            transform: 'scale(1.05)',
                          },
                        }}
                        onClick={() => navigate(`/venues/${venue.id}`)}
                      >
                        <Box
                          component="img"
                          src={venue.image}
                          alt={venue.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                            color: 'white',
                          }}
                        >
                          <Typography variant="subtitle2" fontWeight="bold">
                            {venue.name}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">
                              {venue.location}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                              <StarIcon sx={{ fontSize: 16, color: '#FFD700', mr: 0.5 }} />
                              {venue.rating}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserDashboard;