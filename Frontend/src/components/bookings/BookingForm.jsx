import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  Breadcrumbs,
  Link,
  useTheme,
  alpha,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import SubjectIcon from '@mui/icons-material/Subject';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion, AnimatePresence } from 'framer-motion';
import DateTimePicker from '../../components/bookings/DateTimePicker';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/common/Loader';

const BookingForm = () => {
  const theme = useTheme();
  const { venueId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [bookingDetails, setBookingDetails] = useState({
    selectedDateTime: null,
    attendees: '',
    purpose: '',
    specialRequests: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  });
  
  const [bookingSuccessful, setBookingSuccessful] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const steps = [
    {
      label: 'Select Date & Time',
      description: 'Choose your preferred date and time for your event.',
      icon: <EventIcon color="primary" />,
    },
    {
      label: 'Event Details',
      description: 'Provide information about your event and requirements.',
      icon: <SubjectIcon color="primary" />,
    },
    {
      label: 'Review & Payment',
      description: 'Review your booking and complete payment.',
      icon: <CreditCardIcon color="primary" />,
    },
  ];

  useEffect(() => {
    // Simulate API call to get venue details and available slots
    const fetchVenueAndSlots = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        // Mock venue data
        const mockVenue = {
          _id: venueId,
          name: 'Grand Ballroom & Conference Center',
          image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
          address: {
            street: '123 Event Plaza',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
          },
          capacity: 500,
          pricePerHour: 1200,
        };
        
        // Mock available slots (next 7 days, various times)
        const today = new Date("2025-05-28");
        const mockSlots = [];
        
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() + i);
          
          // Create 3-4 slots per day
          const slotsPerDay = Math.floor(Math.random() * 2) + 3; // 3-4 slots
          
          for (let j = 0; j < slotsPerDay; j++) {
            const startHour = 10 + Math.floor(Math.random() * 8); // Between 10 AM and 6 PM
            const startTime = new Date(date);
            startTime.setHours(startHour, 0, 0, 0);
            
            const endTime = new Date(startTime);
            endTime.setHours(startTime.getHours() + 4); // 4-hour slots
            
            mockSlots.push({
              id: `slot-${i}-${j}`,
              startTime: startTime.toISOString(),
              endTime: endTime.toISOString(),
              available: true,
            });
          }
        }
        
        setVenue(mockVenue);
        setAvailableSlots(mockSlots);
      } catch (err) {
        console.error('Error fetching venue details:', err);
        setError('Failed to load venue details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVenueAndSlots();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [venueId]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDateTimeSelected = (dateTime) => {
    setBookingDetails({ ...bookingDetails, selectedDateTime: dateTime });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to create the booking
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // Generate a booking reference
      const bookingRef = `EH${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingReference(bookingRef);
      
      setBookingSuccessful(true);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('There was a problem processing your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return bookingDetails.selectedDateTime !== null;
      case 1:
        return (
          bookingDetails.attendees && 
          parseInt(bookingDetails.attendees) > 0 &&
          parseInt(bookingDetails.attendees) <= venue?.capacity &&
          bookingDetails.purpose.trim() !== ''
        );
      case 2:
        if (bookingDetails.paymentMethod === 'credit_card') {
          return (
            bookingDetails.cardNumber.trim() !== '' &&
            bookingDetails.cardExpiry.trim() !== '' &&
            bookingDetails.cardCvv.trim() !== '' &&
            bookingDetails.cardName.trim() !== ''
          );
        }
        return true;
      default:
        return true;
    }
  };

  // Calculate booking cost
  const calculateCost = () => {
    if (!venue || !bookingDetails.selectedDateTime) return 0;
    
    const startTime = new Date(bookingDetails.selectedDateTime.timeSlot.startTime);
    const endTime = new Date(bookingDetails.selectedDateTime.timeSlot.endTime);
    const hours = (endTime - startTime) / (1000 * 60 * 60);
    
    return hours * venue.pricePerHour;
  };
  
  const totalCost = calculateCost();
  const bookingFee = totalCost * 0.05;
  const finalTotal = totalCost + bookingFee;
  
  // Format date for display
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <Loader message="Loading booking form..." />;
  }

  if (error && !venue) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/venues')}
        >
          Back to Venues
        </Button>
      </Container>
    );
  }

  // Success view
  if (bookingSuccessful) {
    return (
      <Box sx={{ py: 6 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 80 }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Booking Confirmed!
              </Typography>
              <Typography variant="h6" paragraph>
                Your booking at {venue.name} has been successfully submitted
              </Typography>
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  p: 2,
                  borderRadius: 2,
                  my: 3,
                  border: `1px dashed ${theme.palette.primary.main}`,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Booking Reference: {bookingReference}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Thank you for your booking. We've sent a confirmation email to your registered email address.
              </Typography>
              <Typography variant="body1" paragraph>
                The venue owner will review your booking and confirm it shortly. You'll receive a notification once it's confirmed.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/dashboard"
                  >
                    Go to My Dashboard
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/venues"
                  >
                    Browse More Venues
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <>
      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ pt: 3, mb: 2 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/venues" underline="hover" color="inherit">
            Venues
          </Link>
          <Link 
            component={RouterLink} 
            to={`/venues/${venueId}`} 
            underline="hover" 
            color="inherit"
          >
            {venue?.name}
          </Link>
          <Typography color="text.primary">Book</Typography>
        </Breadcrumbs>
      </Container>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Book {venue?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Complete the booking process by following these steps
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Main Form */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              variant="outlined"
              sx={{ borderRadius: 3 }}
            >
              {error && (
                <Box sx={{ p: 3, pb: 0 }}>
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                </Box>
              )}
              
              <Stepper 
                activeStep={activeStep} 
                orientation="vertical"
                sx={{ 
                  p: 3,
                  '.MuiStepConnector-line': {
                    minHeight: 20,
                  } 
                }}
              >
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconProps={{
                        icon: step.icon,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {step.label}
                        </Typography>
                      </Box>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {step.description}
                      </Typography>
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Step 1: Date & Time Selection */}
                          {index === 0 && (
                            <Box>
                              <DateTimePicker
                                availableSlots={availableSlots}
                                onDateTimeSelected={handleDateTimeSelected}
                              />
                              
                              {bookingDetails.selectedDateTime && (
                                <Box 
                                  sx={{ 
                                    mt: 3, 
                                    p: 2, 
                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                    borderRadius: 2,
                                    border: `1px dashed ${theme.palette.success.main}`,
                                  }}
                                >
                                  <Typography variant="subtitle2" fontWeight="bold">
                                    Selected Time Slot:
                                  </Typography>
                                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                                    {formatDateTime(bookingDetails.selectedDateTime.timeSlot.startTime)} to {' '}
                                    {new Date(bookingDetails.selectedDateTime.timeSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          )}
                          
                          {/* Step 2: Event Details */}
                          {index === 1 && (
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  label="Number of Attendees"
                                  name="attendees"
                                  type="number"
                                  value={bookingDetails.attendees}
                                  onChange={handleChange}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <GroupIcon />
                                      </InputAdornment>
                                    ),
                                    inputProps: { min: 1, max: venue?.capacity }
                                  }}
                                  error={bookingDetails.attendees && (parseInt(bookingDetails.attendees) <= 0 || parseInt(bookingDetails.attendees) > venue?.capacity)}
                                  helperText={
                                    bookingDetails.attendees && parseInt(bookingDetails.attendees) > venue?.capacity 
                                      ? `Maximum capacity is ${venue?.capacity} people` 
                                      : `Venue capacity: ${venue?.capacity} people`
                                  }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  label="Event Purpose"
                                  name="purpose"
                                  value={bookingDetails.purpose}
                                  onChange={handleChange}
                                  placeholder="e.g., Wedding Reception, Corporate Meeting, Birthday Party"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Special Requests"
                                  name="specialRequests"
                                  value={bookingDetails.specialRequests}
                                  onChange={handleChange}
                                  multiline
                                  rows={4}
                                  placeholder="Any special arrangements or requirements?"
                                />
                              </Grid>
                            </Grid>
                          )}
                          
                          {/* Step 3: Payment */}
                          {index === 2 && (
                            <Box>
                              {/* Booking Summary for Review */}
                              <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                  Booking Summary
                                </Typography>
                                
                                <Grid container spacing={2}>
                                  <Grid item xs={4} sm={3}>
                                    <Typography variant="body2" color="text.secondary">Date:</Typography>
                                  </Grid>
                                  <Grid item xs={8} sm={9}>
                                    <Typography variant="body2">
                                      {bookingDetails.selectedDateTime ? 
                                        new Date(bookingDetails.selectedDateTime.timeSlot.startTime).toLocaleDateString('en-US', {
                                          weekday: 'long',
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric'
                                        }) : '-'}
                                    </Typography>
                                  </Grid>
                                  
                                  <Grid item xs={4} sm={3}>
                                    <Typography variant="body2" color="text.secondary">Time:</Typography>
                                  </Grid>
                                  <Grid item xs={8} sm={9}>
                                    <Typography variant="body2">
                                      {bookingDetails.selectedDateTime ? 
                                        `${new Date(bookingDetails.selectedDateTime.timeSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                                        ${new Date(bookingDetails.selectedDateTime.timeSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '-'}
                                    </Typography>
                                  </Grid>
                                  
                                  <Grid item xs={4} sm={3}>
                                    <Typography variant="body2" color="text.secondary">Attendees:</Typography>
                                  </Grid>
                                  <Grid item xs={8} sm={9}>
                                    <Typography variant="body2">
                                      {bookingDetails.attendees || '-'}
                                    </Typography>
                                  </Grid>
                                  
                                  <Grid item xs={4} sm={3}>
                                    <Typography variant="body2" color="text.secondary">Purpose:</Typography>
                                  </Grid>
                                  <Grid item xs={8} sm={9}>
                                    <Typography variant="body2">
                                      {bookingDetails.purpose || '-'}
                                    </Typography>
                                  </Grid>
                                  
                                  {bookingDetails.specialRequests && (
                                    <>
                                      <Grid item xs={4} sm={3}>
                                        <Typography variant="body2" color="text.secondary">Special Requests:</Typography>
                                      </Grid>
                                      <Grid item xs={8} sm={9}>
                                        <Typography variant="body2">
                                          {bookingDetails.specialRequests}
                                        </Typography>
                                      </Grid>
                                    </>
                                  )}
                                </Grid>
                              </Paper>
                            
                              <FormControl component="fieldset" sx={{ mb: 3 }}>
                                <FormLabel component="legend">Payment Method</FormLabel>
                                <RadioGroup
                                  name="paymentMethod"
                                  value={bookingDetails.paymentMethod}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel 
                                    value="credit_card" 
                                    control={<Radio />} 
                                    label="Credit/Debit Card" 
                                  />
                                  <FormControlLabel 
                                    value="paypal" 
                                    control={<Radio />} 
                                    label="PayPal" 
                                  />
                                  <FormControlLabel 
                                    value="bank_transfer" 
                                    control={<Radio />} 
                                    label="Bank Transfer" 
                                  />
                                </RadioGroup>
                              </FormControl>
                              
                              {bookingDetails.paymentMethod === 'credit_card' && (
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="Card Number"
                                      name="cardNumber"
                                      value={bookingDetails.cardNumber}
                                      onChange={handleChange}
                                      placeholder="1234 5678 9012 3456"
                                      inputProps={{ maxLength: 19 }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="Expiry Date"
                                      name="cardExpiry"
                                      value={bookingDetails.cardExpiry}
                                      onChange={handleChange}
                                      placeholder="MM/YY"
                                      inputProps={{ maxLength: 5 }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="CVV"
                                      name="cardCvv"
                                      value={bookingDetails.cardCvv}
                                      onChange={handleChange}
                                      placeholder="123"
                                      inputProps={{ maxLength: 3 }}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="Cardholder Name"
                                      name="cardName"
                                      value={bookingDetails.cardName}
                                      onChange={handleChange}
                                      placeholder="John Doe"
                                    />
                                  </Grid>
                                </Grid>
                              )}
                              
                              {bookingDetails.paymentMethod === 'paypal' && (
                                <Box sx={{ textAlign: 'center', py: 3 }}>
                                  <Box component="img" src="/img/paypal-logo.png" alt="PayPal" sx={{ height: 60, mb: 2 }} />
                                  <Typography variant="body1">
                                    You will be redirected to PayPal to complete payment after confirming your booking.
                                  </Typography>
                                </Box>
                              )}
                              
                              {bookingDetails.paymentMethod === 'bank_transfer' && (
                                <Box sx={{ py: 2 }}>
                                  <Typography variant="body1" paragraph>
                                    Please make your transfer to the following bank account:
                                  </Typography>
                                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                    <Typography variant="body2">
                                      Bank: National Bank<br />
                                      Account Name: EventHub Inc.<br />
                                      Account Number: 1234567890<br />
                                      Routing Number: 012345678<br />
                                      Reference: Your booking reference will be provided after submission
                                    </Typography>
                                  </Paper>
                                </Box>
                              )}
                              
                              <Box sx={{ mt: 3 }}>
                                <Alert severity="info">
                                  <Typography variant="body2">
                                    Your payment will be processed securely. You will not be charged until the venue owner confirms your booking.
                                  </Typography>
                                </Alert>
                              </Box>
                            </Box>
                          )}
                          
                          {/* Navigation Buttons */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button
                              variant="outlined"
                              onClick={activeStep === 0 ? () => navigate(`/venues/${venueId}`) : handleBack}
                            >
                              {activeStep === 0 ? 'Cancel' : 'Back'}
                            </Button>
                            
                            {activeStep === steps.length - 1 ? (
                              <LoadingButton
                                variant="contained"
                                onClick={handleSubmit}
                                loading={submitting}
                                disabled={!isStepValid(activeStep)}
                              >
                                Confirm Booking
                              </LoadingButton>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={!isStepValid(activeStep)}
                              >
                                Next
                              </Button>
                            )}
                          </Box>
                        </motion.div>
                      </AnimatePresence>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>
          
          {/* Booking Summary */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              variant="outlined"
              sx={{ borderRadius: 3, position: 'sticky', top: 24 }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Booking Summary
                </Typography>
                
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Box
                    component="img"
                    src={venue?.image}
                    alt={venue?.name}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 2,
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {venue?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {venue?.address.city}, {venue?.address.state}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                {bookingDetails.selectedDateTime ? (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Date & Time:
                    </Typography>
                    <Typography variant="body2">
                      {new Date(bookingDetails.selectedDateTime.timeSlot.startTime).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {new Date(bookingDetails.selectedDateTime.timeSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {' '}
                      {new Date(bookingDetails.selectedDateTime.timeSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      No date/time selected
                    </Typography>
                  </Box>
                )}
                
                {bookingDetails.purpose && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Event:
                    </Typography>
                    <Typography variant="body2">
                      {bookingDetails.purpose}
                    </Typography>
                  </Box>
                )}
                
                {bookingDetails.attendees && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Attendees:
                    </Typography>
                    <Typography variant="body2">
                      {bookingDetails.attendees} people
                    </Typography>
                  </Box>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Price Details:
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      Hourly Rate:
                    </Typography>
                    <Typography variant="body2">
                      ${venue?.pricePerHour}
                    </Typography>
                  </Box>
                  
                  {bookingDetails.selectedDateTime && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        Duration:
                      </Typography>
                      <Typography variant="body2">
                        {(new Date(bookingDetails.selectedDateTime.timeSlot.endTime) - 
                          new Date(bookingDetails.selectedDateTime.timeSlot.startTime)) / (1000 * 60 * 60)} hours
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      Subtotal:
                    </Typography>
                    <Typography variant="body2">
                      ${totalCost.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      Booking Fee (5%):
                    </Typography>
                    <Typography variant="body2">
                      ${bookingFee.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Total:
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold">
                      ${finalTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BookingForm;