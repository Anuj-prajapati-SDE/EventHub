import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  alpha,
  Breadcrumbs,
  Link,
  MenuItem,
  Menu,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SubjectIcon from '@mui/icons-material/Subject';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RepeatIcon from '@mui/icons-material/Repeat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/common/Loader';

const BookingDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  
  useEffect(() => {
    // Simulate API call to get booking details
    const fetchBookingDetails = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch booking details from API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        const currentDate = new Date("2025-05-28 20:58:30");
        
        // Mock booking data
        const mockBooking = {
          id,
          venue: {
            id: '1',
            name: 'Grand Ballroom',
            image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
            address: {
              street: '123 Event Plaza',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA'
            }
          },
          startTime: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(),
          attendees: 180,
          purpose: 'Wedding Reception',
          specialRequests: 'We need a stage setup for the wedding band and microphones for speeches.',
          status: 'confirmed',
          paymentStatus: 'paid',
          price: {
            hourlyRate: 1200,
            hours: 6,
            subtotal: 7200,
            serviceFee: 360,
            tax: 640,
            total: 8200,
          },
          reference: 'EH78293445',
          bookedBy: {
            name: 'Anuj Prajapati',
            email: 'anuj.prajapati@example.com',
            phone: '+1 (555) 123-4567'
          },
          createdAt: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
        
        setBooking(mockBooking);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [id]);
  
  const handleCancelBooking = async () => {
    setOpenCancelDialog(false);
    setLoading(true);
    try {
      // In a real app, you would make an API call to cancel the booking
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      // Update local state
      setBooking({
        ...booking,
        status: 'cancelled'
      });
      
      // Show success message
    } catch (error) {
      console.error('Error cancelling booking:', error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return format(date, "EEEE, MMMM d, yyyy");
  };
  
  const formatTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return format(date, "h:mm a");
  };
  
  const handleMenuOpen = (event) => {
    setActionMenuAnchor(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setActionMenuAnchor(null);
  };
  
  if (loading) {
    return <Loader message="Loading booking details..." />;
  }
  
  if (!booking) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6" color="error" textAlign="center">
          Booking not found or error loading details
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="contained"
            component={RouterLink}
            to="/dashboard"
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link component={RouterLink} underline="hover" color="inherit" to="/dashboard">
            Dashboard
          </Link>
          <Link component={RouterLink} underline="hover" color="inherit" to="/dashboard">
            My Bookings
          </Link>
          <Typography color="text.primary">Booking #{booking.reference}</Typography>
        </Breadcrumbs>
      </Box>
      
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Booking Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Reference: {booking.reference}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Chip 
            label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} 
            color={getStatusColor(booking.status)}
            size="medium"
          />
          
          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <IconButton 
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
          )}
          
          <Menu
            anchorEl={actionMenuAnchor}
            open={Boolean(actionMenuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem 
              onClick={() => {
                handleMenuClose();
                // In a real app, navigate to receipt/invoice page
              }}
            >
              <ReceiptIcon fontSize="small" sx={{ mr: 1 }} />
              Download Receipt
            </MenuItem>
            
            {booking.status === 'pending' && (
              <MenuItem 
                onClick={() => {
                  handleMenuClose();
                  // In a real app, navigate to edit page
                }}
              >
                <EditIcon fontSize="small" sx={{ mr: 1 }} />
                Edit Booking
              </MenuItem>
            )}
            
            <MenuItem 
              onClick={() => {
                handleMenuClose();
                // In a real app, navigate to new booking page with pre-filled data
              }}
            >
              <RepeatIcon fontSize="small" sx={{ mr: 1 }} />
              Rebook Venue
            </MenuItem>
            
            {booking.status !== 'cancelled' && (
              <MenuItem 
                onClick={() => {
                  handleMenuClose();
                  setOpenCancelDialog(true);
                }}
              >
                <CancelIcon fontSize="small" sx={{ mr: 1, color: theme.palette.error.main }} />
                <Typography color="error">Cancel Booking</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Box>
      
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Venue Info */}
            <Card sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={booking.venue.image}
                  alt={booking.venue.name}
                />
              </Box>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {booking.venue.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {booking.venue.address.street}, {booking.venue.address.city}, {booking.venue.address.state} {booking.venue.address.zipCode}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button 
                    variant="outlined"
                    component={RouterLink}
                    to={`/venues/${booking.venue.id}`}
                  >
                    View Venue Details
                  </Button>
                  <Button 
                    variant="contained"
                    component={RouterLink}
                    to={`/booking/${booking.venue.id}`}
                  >
                    Book Again
                  </Button>
                </Box>
              </CardContent>
            </Card>
            
            {/* Booking Details */}
            <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, p: 3, mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Event Details
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <EventIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(booking.startTime)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <AccessTimeIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Time
                      </Typography>
                      <Typography variant="body1">
                        {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <PeopleAltIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Attendees
                      </Typography>
                      <Typography variant="body1">
                        {booking.attendees} people
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <SubjectIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Event Type
                      </Typography>
                      <Typography variant="body1">
                        {booking.purpose}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              
              {booking.specialRequests && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Special Requests
                  </Typography>
                  <Typography variant="body1">
                    {booking.specialRequests}
                  </Typography>
                </>
              )}
            </Paper>
            
            {booking.status === 'confirmed' && (
              <Paper 
                elevation={0} 
                variant="outlined" 
                sx={{ 
                  borderRadius: 3, 
                  p: 3, 
                  mb: 4, 
                  bgcolor: alpha(theme.palette.info.main, 0.05),
                  border: `1px dashed ${theme.palette.info.main}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <CheckCircleIcon color="info" sx={{ mr: 2, fontSize: 28 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Your booking is confirmed!
                    </Typography>
                    <Typography variant="body1">
                      You're all set for your event on {formatDate(booking.startTime)}. Please make sure to review the venue's policies before your arrival.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="info"
                      sx={{ mt: 2 }}
                    >
                      Add to Calendar
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}
            
            {booking.status === 'cancelled' && (
              <Paper 
                elevation={0} 
                variant="outlined" 
                sx={{ 
                  borderRadius: 3, 
                  p: 3, 
                  mb: 4, 
                  bgcolor: alpha(theme.palette.error.main, 0.05),
                  border: `1px dashed ${theme.palette.error.main}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <CancelIcon color="error" sx={{ mr: 2, fontSize: 28 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      This booking has been cancelled
                    </Typography>
                    <Typography variant="body1">
                      This booking was cancelled on May 25, 2025. If you have any questions, please contact our support team.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      component={RouterLink}
                      to={`/booking/${booking.venue.id}`}
                      sx={{ mt: 2 }}
                    >
                      Rebook This Venue
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}
            
            {booking.status === 'completed' && (
              <Paper 
                elevation={0} 
                variant="outlined" 
                sx={{ 
                  borderRadius: 3, 
                  p: 3, 
                  mb: 4, 
                  bgcolor: alpha(theme.palette.success.main, 0.05),
                  border: `1px dashed ${theme.palette.success.main}`,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircleIcon color="success" sx={{ mr: 2, fontSize: 28 }} />
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Event completed
                      </Typography>
                      <Typography variant="body1">
                        Thank you for using our services. We hope your event was successful!
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button 
                    variant="outlined" 
                    startIcon={<StarIcon />}
                  >
                    Write Review
                  </Button>
                </Box>
              </Paper>
            )}
            
            {/* Contact Information */}
            <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Booked By
                  </Typography>
                  <Typography variant="body1">
                    {booking.bookedBy.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {booking.bookedBy.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Phone
                  </Typography>
                  <Typography variant="body1">
                    {booking.bookedBy.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Booking Date
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(booking.createdAt)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Sidebar - Payment Summary */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Box sx={{ position: 'sticky', top: 24 }}>
              <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Payment Summary
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {booking.price.hourlyRate} × {booking.price.hours} hours
                    </Typography>
                    <Typography variant="body2">
                      ${booking.price.subtotal}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Service fee
                    </Typography>
                    <Typography variant="body2">
                      ${booking.price.serviceFee}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Taxes
                    </Typography>
                    <Typography variant="body2">
                      ${booking.price.tax}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    ${booking.price.total}
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mt: 2, 
                    p: 1.5, 
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                  }}
                >
                  <PaidIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="success.main" fontWeight="medium">
                    {booking.paymentStatus === 'paid' ? 'Paid in Full' : 'Payment Pending'}
                  </Typography>
                </Box>
                
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<ReceiptIcon />}
                  sx={{ mt: 3 }}
                >
                  Download Receipt
                </Button>
              </Paper>
              
              <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Need Assistance?
                </Typography>
                <Typography variant="body2" paragraph>
                  If you have any questions or need to make changes to your booking, our support team is here to help.
                </Typography>
                <Button 
                  fullWidth 
                  variant="contained"
                  sx={{ mb: 1 }}
                >
                  Contact Support
                </Button>
                <Button 
                  fullWidth 
                  variant="outlined"
                  component={RouterLink}
                  to="/faq"
                >
                  FAQs
                </Button>
              </Paper>
              
              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => setOpenCancelDialog(true)}
                >
                  Cancel Booking
                </Button>
              )}
            </Box>
          </motion.div>
        </Grid>
      </Grid>
      
      {/* Cancel Dialog */}
      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancel this booking?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel your booking at {booking.venue.name} on {formatDate(booking.startTime)}? This action cannot be undone.
            
            {booking.status === 'confirmed' && (
              <Box sx={{ mt: 2 }}>
                Please note: Cancellation may be subject to the venue's cancellation policy. You may be eligible for a partial refund depending on when you cancel.
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)}>
            Keep Booking
          </Button>
          <Button onClick={handleCancelBooking} color="error" autoFocus>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingDetails;