import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Paper,
  Divider,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  alpha,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import StoreIcon from '@mui/icons-material/Store';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';

const VenueOwnerDashboard = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalVenues: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
  });
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  useEffect(() => {
    // Simulate API call to get venue owner data
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        const currentDate = new Date("2025-05-28 20:36:04");
        
        // Mock venues data
        const mockVenues = [
          {
            id: '1',
            name: 'Grand Ballroom',
            image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
            location: 'New York, NY',
            capacity: 500,
            pricePerHour: 1200,
            totalBookings: 42,
            rating: 4.9,
            status: 'active',
          },
          {
            id: '2',
            name: 'Urban Loft Space',
            image: 'https://images.unsplash.com/photo-1517957754642-2870518e16f8',
            location: 'Chicago, IL',
            capacity: 200,
            pricePerHour: 800,
            totalBookings: 28,
            rating: 4.7,
            status: 'active',
          },
          {
            id: '3',
            name: 'Seaside Pavilion',
            image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
            location: 'Miami, FL',
            capacity: 350,
            pricePerHour: 950,
            totalBookings: 15,
            rating: 4.8,
            status: 'active',
          },
        ];
        
        // Mock bookings data
        const mockBookings = [
          {
            id: '1',
            venueId: '1',
            venueName: 'Grand Ballroom',
            customerName: 'John Smith',
            customerEmail: 'john.smith@example.com',
            startTime: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
            attendees: 250,
            purpose: 'Corporate Conference',
            status: 'pending',
            paymentStatus: 'pending',
            totalAmount: 6000,
            createdAt: new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            venueId: '1',
            venueName: 'Grand Ballroom',
            customerName: 'Emily Johnson',
            customerEmail: 'emily.johnson@example.com',
            startTime: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(),
            attendees: 180,
            purpose: 'Wedding Reception',
            status: 'confirmed',
            paymentStatus: 'paid',
            totalAmount: 7200,
            createdAt: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            venueId: '2',
            venueName: 'Urban Loft Space',
            customerName: 'Michael Brown',
            customerEmail: 'michael.brown@example.com',
            startTime: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
            attendees: 75,
            purpose: 'Product Launch',
            status: 'pending',
            paymentStatus: 'pending',
            totalAmount: 3200,
            createdAt: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '4',
            venueId: '3',
            venueName: 'Seaside Pavilion',
            customerName: 'Sarah Wilson',
            customerEmail: 'sarah.wilson@example.com',
            startTime: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
            attendees: 120,
            purpose: 'Charity Gala',
            status: 'completed',
            paymentStatus: 'paid',
            totalAmount: 4750,
            createdAt: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '5',
            venueId: '2',
            venueName: 'Urban Loft Space',
            customerName: 'David Chen',
            customerEmail: 'david.chen@example.com',
            startTime: new Date(currentDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(currentDate.getTime() + 21 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
            attendees: 50,
            purpose: 'Photography Session',
            status: 'confirmed',
            paymentStatus: 'paid',
            totalAmount: 2400,
            createdAt: new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ];
        
        // Calculate statistics
        const totalVenues = mockVenues.length;
        const totalBookings = mockBookings.length;
        const pendingBookings = mockBookings.filter(b => b.status === 'pending').length;
        const totalRevenue = mockBookings
          .filter(b => b.paymentStatus === 'paid')
          .reduce((sum, booking) => sum + booking.totalAmount, 0);
        const averageRating = mockVenues.reduce((sum, venue) => sum + venue.rating, 0) / totalVenues;
        
        setVenues(mockVenues);
        setBookings(mockBookings);
        setStats({
          totalVenues,
          totalBookings,
          pendingBookings,
          totalRevenue,
          averageRating: averageRating.toFixed(1),
        });
      } catch (err) {
        console.error('Error fetching venue owner data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleOpenActionMenu = (event, id) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedItemId(id);
  };
  
  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
    setSelectedItemId(null);
  };
  
  const handleBookingAction = (action) => {
    console.log(`Booking ${selectedItemId} ${action}`);
    handleCloseActionMenu();
    // In a real app, you would make an API call to update the booking status
  };
  
  const handleVenueAction = (action) => {
    console.log(`Venue ${selectedItemId} ${action}`);
    handleCloseActionMenu();
    // In a real app, you would make an API call to perform the action on the venue
  };
  
  // Get status chip color
  const getStatusChipColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  if (loading) {
    return <Loader message="Loading dashboard..." />;
  }
  
  return (
    <>
      <PageHeader 
        title="Venue Owner Dashboard" 
        subtitle={`Welcome back, Anuj-prajapati-SDE!`}
        background="gradient"
      />
      
      <Container maxWidth="lg" sx={{ py: 5, mb: 3 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={4}>
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
                  <StoreIcon color="primary" sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Venues
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalVenues}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
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
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box 
                  sx={{
                    mr: 3,
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.warning.main, 0.15),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <EventIcon color="warning" sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Pending Bookings
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.pendingBookings}
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
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ${stats.totalRevenue.toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Main Content */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="My Venues" />
              <Tab label="Bookings" />
              <Tab label="Analytics" />
            </Tabs>
          </Box>
          
          {/* My Venues Tab */}
          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight="bold">
                    My Venues
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/add-venue"
                  >
                    Add New Venue
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  {venues.map((venue) => (
                    <Grid item key={venue.id} xs={12} md={4}>
                      <Paper
                        elevation={2}
                        sx={{
                          borderRadius: 3,
                          overflow: 'hidden',
                          height: '100%',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                          },
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <Box
                            component="img"
                            src={venue.image}
                            alt={venue.name}
                            sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              bgcolor: 'background.paper',
                              borderRadius: 5,
                              px: 1.5,
                              py: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <StarIcon sx={{ color: '#FFD700', fontSize: 18, mr: 0.5 }} />
                            <Typography variant="subtitle2" fontWeight="bold">
                              {venue.rating}
                            </Typography>
                          </Box>
                          <IconButton
                            sx={{
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              bgcolor: 'background.paper',
                            }}
                            onClick={(e) => handleOpenActionMenu(e, venue.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                        <Box sx={{ p: 2 }}>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {venue.name}
                          </Typography>
                          
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PlaceIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                                <Typography variant="body2" color="text.secondary">
                                  {venue.location}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PersonIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                                <Typography variant="body2" color="text.secondary">
                                  Up to {venue.capacity}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PaidIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.success.main }} />
                                <Typography variant="body2">
                                  ${venue.pricePerHour}/hr
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EventIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                                <Typography variant="body2">
                                  {venue.totalBookings} bookings
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Button
                                variant="outlined"
                                size="small"
                                fullWidth
                                component={RouterLink}
                                to={`/venues/${venue.id}`}
                              >
                                View
                              </Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                variant="contained"
                                size="small"
                                fullWidth
                                startIcon={<EditIcon />}
                              >
                                Edit
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          )}
          
          {/* Bookings Tab */}
          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight="bold">
                    Booking Requests
                  </Typography>
                  <Box>
                    <Chip 
                      label="All" 
                      color="primary" 
                      sx={{ mr: 1 }} 
                    />
                    <Chip 
                      label="Pending" 
                      variant="outlined" 
                      sx={{ mr: 1 }} 
                    />
                    <Chip 
                      label="Confirmed" 
                      variant="outlined" 
                      sx={{ mr: 1 }} 
                    />
                    <Chip 
                      label="Completed" 
                      variant="outlined" 
                    />
                  </Box>
                </Box>
                
                <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 4 }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        <TableCell><strong>Venue</strong></TableCell>
                        <TableCell><strong>Customer</strong></TableCell>
                        <TableCell><strong>Date & Time</strong></TableCell>
                        <TableCell><strong>Purpose</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell align="right"><strong>Amount</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow
                          key={booking.id}
                          sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            bgcolor: booking.status === 'pending' ? alpha(theme.palette.warning.light, 0.05) : 'inherit',
                          }}
                        >
                          <TableCell>{booking.venueName}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                sx={{ width: 32, height: 32, mr: 1 }} 
                                alt={booking.customerName} 
                              />
                              <Box>
                                <Typography variant="body2" noWrap>
                                  {booking.customerName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {booking.customerEmail}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {formatDate(booking.startTime)}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" noWrap>
                              {booking.purpose}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {booking.attendees} attendees
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} 
                              color={getStatusChipColor(booking.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography 
                              variant="body2" 
                              fontWeight="bold"
                              color={booking.paymentStatus === 'paid' ? 'success.main' : 'text.primary'}
                            >
                              ${booking.totalAmount}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {booking.paymentStatus}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small"
                              onClick={(e) => handleOpenActionMenu(e, booking.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </motion.div>
          )}
          
          {/* Analytics Tab */}
          {activeTab === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ py: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Analytics & Performance
                </Typography>
                <Typography variant="body1" paragraph>
                  Track the performance of your venues and bookings over time.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Paper
                      elevation={0}
                      variant="outlined"
                      sx={{ p: 3, borderRadius: 3, height: '100%' }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Booking Overview
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Total Bookings:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {stats.totalBookings}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Confirmed Bookings:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {bookings.filter(b => b.status === 'confirmed').length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Pending Bookings:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {stats.pendingBookings}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Completed Bookings:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {bookings.filter(b => b.status === 'completed').length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Cancelled Bookings:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {bookings.filter(b => b.status === 'cancelled').length}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Paper
                      elevation={0}
                      variant="outlined"
                      sx={{ p: 3, borderRadius: 3, height: '100%' }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Revenue Overview
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Total Revenue:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" color="success.main">
                          ${stats.totalRevenue.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Pending Revenue:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          ${bookings
                            .filter(b => b.paymentStatus === 'pending')
                            .reduce((sum, booking) => sum + booking.totalAmount, 0)
                            .toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Average Booking Value:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          ${(stats.totalRevenue / stats.totalBookings).toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Most Popular Venue:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          Grand Ballroom
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Paper
                      elevation={0}
                      variant="outlined"
                      sx={{ p: 3, borderRadius: 3, height: '100%' }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Ratings & Reviews
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Average Rating:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StarIcon sx={{ color: '#FFD700', mr: 0.5, fontSize: 20 }} />
                          <Typography variant="body1" fontWeight="bold">
                            {stats.averageRating}/5
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Total Reviews:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          87
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          5-Star Reviews:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          64%
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Highest Rated Venue:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          Grand Ballroom (4.9)
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      variant="outlined"
                      sx={{ p: 3, borderRadius: 3 }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Monthly Bookings (2025)
                      </Typography>
                      <Box sx={{ height: 300, width: '100%', mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                          Chart visualization would appear here
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                          (Feature not implemented in this demo)
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          )}
        </Box>
      </Container>
      
      {/* Booking Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleCloseActionMenu}
      >
        {['1', '3'].includes(selectedItemId) && (
          <MenuItem onClick={() => handleBookingAction('confirm')}>
            <CheckCircleIcon sx={{ mr: 1, color: theme.palette.success.main }} />
            Confirm Booking
          </MenuItem>
        )}
        {['1', '3', '2', '5'].includes(selectedItemId) && (
          <MenuItem onClick={() => handleBookingAction('viewDetails')}>
            View Details
          </MenuItem>
        )}
        {['1', '3', '2', '5'].includes(selectedItemId) && (
          <MenuItem onClick={() => handleBookingAction('message')}>
            Message Customer
          </MenuItem>
        )}
        {['1', '3'].includes(selectedItemId) && (
          <MenuItem onClick={() => handleBookingAction('reject')} sx={{ color: theme.palette.error.main }}>
            <CancelIcon sx={{ mr: 1, color: theme.palette.error.main }} />
            Reject Booking
          </MenuItem>
        )}
      </Menu>
      
      {/* Venue Action Menu */}
      {selectedItemId && ['1', '2', '3'].includes(selectedItemId) && (
        <Menu
          anchorEl={actionMenuAnchor}
          open={Boolean(actionMenuAnchor)}
          onClose={handleCloseActionMenu}
        >
          <MenuItem onClick={() => handleVenueAction('edit')}>
            <EditIcon sx={{ mr: 1 }} />
            Edit Venue
          </MenuItem>
          <MenuItem onClick={() => handleVenueAction('duplicate')}>
            Duplicate Venue
          </MenuItem>
          <MenuItem onClick={() => handleVenueAction('calendar')}>
            Manage Calendar
          </MenuItem>
          <MenuItem onClick={() => handleVenueAction('deactivate')} sx={{ color: theme.palette.error.main }}>
            Deactivate Venue
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default VenueOwnerDashboard;