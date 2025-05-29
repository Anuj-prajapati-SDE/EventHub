import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar,
  Rating,
  ImageList,
  ImageListItem,
  Tabs,
  Tab,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link,
  alpha,
  CardMedia,
} from '@mui/material';
import  { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import AccessibleIcon from '@mui/icons-material/Accessible';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/common/Loader';

// Map icons to amenities
const amenityIcons = {
  'WiFi': <WifiIcon />,
  'Parking': <LocalParkingIcon />,
  'Catering': <RestaurantIcon />,
  'Sound System': <MicExternalOnIcon />,
  'Wheelchair Access': <AccessibleIcon />,
  'Stage': <EventSeatIcon />,
  'Kitchen': <KitchenIcon />,
  'Air Conditioning': <AcUnitIcon />,
};

const VenueDetail = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const [reviews, setReviews] = useState([]);
  const [similarVenues, setSimilarVenues] = useState([]);

  useEffect(() => {
    // Simulate API call to get venue details
    const fetchVenueDetails = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        // Mock venue data
        const mockVenue = {
          _id: id,
          name: 'Grand Ballroom & Conference Center',
          description: `
            An elegant and versatile event space perfect for weddings, corporate events, and conferences. 
            Our Grand Ballroom features crystal chandeliers, hardwood floors, and state-of-the-art 
            audiovisual equipment. The space can be configured to accommodate various event sizes and types.
            
            The venue includes an outdoor terrace with stunning city views, perfect for cocktail hours or 
            breakout sessions. Our professional staff provides comprehensive event support services, 
            including setup, cleanup, and coordination with vendors.
            
            Natural lighting floods through the floor-to-ceiling windows during daytime events, while 
            our customizable lighting systems create the perfect ambiance for evening gatherings.
          `,
          address: {
            street: '123 Event Plaza',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          },
          capacity: 500,
          pricePerHour: 1200,
          rating: 4.8,
          amenities: ['WiFi', 'Parking', 'Catering', 'Sound System', 'Stage', 'Wheelchair Access', 'Kitchen', 'Air Conditioning'],
          rules: [
            'No smoking inside the venue',
            'Events must end by 1:00 AM',
            'Outside catering requires approval',
            'No confetti or glitter',
            'Sound restrictions after 10:00 PM'
          ],
          images: [
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
            'https://images.unsplash.com/photo-1505236858219-8359eb29e329',
            'https://images.unsplash.com/photo-1517957754642-2870518e16f8',
            'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
          ],
          openingHours: {
            monday: { open: '09:00', close: '22:00' },
            tuesday: { open: '09:00', close: '22:00' },
            wednesday: { open: '09:00', close: '22:00' },
            thursday: { open: '09:00', close: '23:00' },
            friday: { open: '09:00', close: '00:00' },
            saturday: { open: '10:00', close: '00:00' },
            sunday: { open: '10:00', close: '22:00' },
          },
          reviews: [
            {
              user: { name: 'Jennifer S.', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
              rating: 5,
              text: 'Beautiful venue with excellent staff! We held our corporate gala here and everything was perfect. The space was elegant, the lighting was customized exactly as we requested, and the staff was incredibly accommodating to our last-minute changes.',
              createdAt: '2025-02-15T14:22:00Z'
            },
            {
              user: { name: 'Michael T.', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
              rating: 4,
              text: 'Great space for our product launch. The AV system was top-notch and the technical support was very helpful. Only issue was limited parking during busy hours, but the venue is conveniently located near public transportation.',
              createdAt: '2025-01-20T09:15:00Z'
            },
            {
              user: { name: 'Sarah L.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
              rating: 5,
              text: 'We had our wedding reception here and it was magical! The lighting and ambiance were perfect. The staff helped coordinate with our vendors seamlessly, and the outdoor terrace was a huge hit with our guests for cocktail hour.',
              createdAt: '2025-03-05T18:30:00Z'
            },
          ],
          features: [
            'Customizable floor plans',
            'Professional in-house audio-visual equipment',
            'Adjustable lighting system',
            'Dedicated event coordinator',
            'Outdoor terrace with city views',
            'Bridal suite',
            'Full-service kitchen facilities',
            'Complimentary high-speed WiFi',
          ]
        };
        
        // Simulate similar venues
        const mockSimilarVenues = [
          {
            _id: '101',
            name: 'City View Loft',
            image: 'https://images.unsplash.com/photo-1517957754642-2870518e16f8',
            location: 'New York, NY',
            capacity: 300,
            pricePerHour: 950,
            rating: 4.7,
          },
          {
            _id: '102',
            name: 'Harbour Conference Center',
            image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329',
            location: 'New York, NY',
            capacity: 600,
            pricePerHour: 1400,
            rating: 4.9,
          },
          {
            _id: '103',
            name: 'Metropolitan Gardens',
            image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
            location: 'New York, NY',
            capacity: 400,
            pricePerHour: 1100,
            rating: 4.6,
          },
        ];
        
        setVenue(mockVenue);
        setReviews(mockVenue.reviews);
        setSimilarVenues(mockSimilarVenues);
      } catch (err) {
        console.error('Error fetching venue details:', err);
        setError('Failed to load venue details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleBookNow = async () => {
    if (!currentUser) {
      // Redirect to login if user is not authenticated
      navigate('/login', { state: { from: { pathname: `/booking/${id}` } } });
      return;
    }
    
    setBookingLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/booking/${id}`);
    } catch (err) {
      console.error('Booking navigation error:', err);
    } finally {
      setBookingLoading(false);
    }
  };
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would make an API call to save this preference
  };
  
  const handleShareVenue = () => {
    // In a real app, implement sharing functionality
    // For now, just copy the URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };
  
  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsLightboxOpen(true);
  };

  // Format weekday names
  const formatDay = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  
  // Calculate average rating
  const averageRating = reviews?.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  // Get rating distribution
  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]; // 5-star to 1-star counts
    
    if (reviews?.length > 0) {
      reviews.forEach(review => {
        distribution[5 - review.rating] += 1;
      });
    }
    
    return distribution;
  };
  
  const ratingDistribution = getRatingDistribution();

  if (loading) {
    return <Loader message="Loading venue details..." />;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/venues')}
            sx={{ mt: 2 }}
          >
            Back to Venues
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      {/* Lightbox for image gallery */}
      {isLightboxOpen && (
        <Lightbox
          mainSrc={venue.images[photoIndex]}
          nextSrc={venue.images[(photoIndex + 1) % venue.images.length]}
          prevSrc={venue.images[(photoIndex + venue.images.length - 1) % venue.images.length]}
          onCloseRequest={() => setIsLightboxOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + venue.images.length - 1) % venue.images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % venue.images.length)}
        />
      )}
      
      {/* Breadcrumbs and navigation */}
      <Container maxWidth="lg" sx={{ pt: 3, pb: 1 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" component={RouterLink} to="/venues">
            Venues
          </Link>
          <Typography color="text.primary">{venue.name}</Typography>
        </Breadcrumbs>
      </Container>
      
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              {/* Venue Name and Rating */}
              <Box sx={{ mb: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                      {venue.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={venue.rating} precision={0.1} readOnly />
                      <Typography variant="h6">
                        {venue.rating.toFixed(1)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                    <Typography variant="subtitle1">
                      {venue.address.street}, {venue.address.city}, {venue.address.state}, {venue.address.zipCode}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            
              {/* Venue Images */}
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ 
                  borderRadius: 3,
                  overflow: 'hidden',
                  mb: 4,
                  position: 'relative',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Box sx={{ position: 'relative' }}>
                    {/* Main Image */}
                    <Box
                      component="img"
                      src={venue.images[0]}
                      alt={venue.name}
                      onClick={() => openLightbox(0)}
                      sx={{
                        width: '100%',
                        height: { xs: '280px', sm: '350px', md: '450px' },
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                    />
                    
                    {/* Action buttons */}
                    <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
                      <IconButton 
                        onClick={handleShareVenue}
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          '&:hover': {
                            bgcolor: 'white',
                          }
                        }}
                      >
                        <ShareIcon />
                      </IconButton>
                      <IconButton 
                        onClick={handleFavoriteToggle}
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          color: isFavorite ? 'error.main' : 'inherit',
                          '&:hover': {
                            bgcolor: 'white',
                          }
                        }}
                      >
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
                  </Box>
                  
                  {/* Thumbnail images */}
                  <Box sx={{ display: 'flex', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                    {venue.images.slice(1).map((img, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={img}
                        alt={`${venue.name} image ${index + 2}`}
                        onClick={() => openLightbox(index + 1)}
                        sx={{
                          height: '120px',
                          minWidth: '160px',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          mx: 0.5,
                          my: 1,
                          borderRadius: 1,
                          transition: 'all 0.2s',
                          '&:hover': {
                            opacity: 0.9,
                            transform: 'scale(0.98)',
                          }
                        }}
                      />
                    ))}
                  </Box>
                </motion.div>
              </Paper>
              
              {/* Quick Info Cards */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                      <PeopleAltIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Capacity
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {venue.capacity} people
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                      <AttachMoneyIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Price
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${venue.pricePerHour}/hour
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                      <AccessTimeIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Today's Hours
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {venue.openingHours.monday.open} - {venue.openingHours.monday.close}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Paper sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                      <LocationOnIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Location
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {venue.address.city}, {venue.address.state}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              </Grid>
              
              {/* Tabs for venue details */}
              <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                  }}
                >
                  <Tab label="Details" />
                  <Tab label="Amenities" />
                  <Tab label="Reviews" />
                </Tabs>
              
                {/* Tab Panels */}
                <Box sx={{ p: 3 }}>
                  {/* Details Tab */}
                  {activeTab === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        About This Venue
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                        {venue.description}
                      </Typography>
                      
                      <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Features
                          </Typography>
                          <List disablePadding dense>
                            {venue.features.map((feature, index) => (
                              <ListItem key={index} disableGutters>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <CheckCircleIcon color="primary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={feature} />
                              </ListItem>
                            ))}
                          </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Venue Rules
                          </Typography>
                          <List disablePadding dense>
                            {venue.rules.map((rule, index) => (
                              <ListItem key={index} disableGutters>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <CloseIcon color="error" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={rule} />
                              </ListItem>
                            ))}
                          </List>
                        </Grid>
                      </Grid>
                      
                      <Divider sx={{ my: 4 }} />
                      
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Opening Hours
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.keys(venue.openingHours).map((day) => (
                          <Grid item xs={6} sm={4} md={3} key={day}>
                            <Paper 
                              variant="outlined" 
                              sx={{ 
                                p: 1.5, 
                                textAlign: 'center',
                                borderColor: day === 'saturday' || day === 'sunday' ? theme.palette.primary.main : 'divider',
                                bgcolor: (day === 'saturday' || day === 'sunday') ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                              }}
                            >
                              <Typography variant="body1" fontWeight="medium" gutterBottom>
                                {formatDay(day)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {venue.openingHours[day].open} - {venue.openingHours[day].close}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </motion.div>
                  )}
                  
                  {/* Amenities Tab */}
                  {activeTab === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Venue Amenities
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        This venue offers the following amenities and facilities to enhance your event experience.
                      </Typography>
                      
                      <Grid container spacing={3} sx={{ mt: 1 }}>
                        {venue.amenities.map((amenity, index) => (
                          <Grid item xs={6} md={4} key={index}>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <Paper 
                                variant="outlined"
                                sx={{
                                  p: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  height: '100%',
                                  borderRadius: 3,
                                  borderColor: theme.palette.primary.main,
                                  borderWidth: 1,
                                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 2,
                                    borderColor: theme.palette.primary.main,
                                  }
                                }}
                              >
                                <ListItemIcon sx={{ minWidth: 40, color: theme.palette.primary.main }}>
                                  {amenityIcons[amenity] || <CheckCircleIcon />}
                                </ListItemIcon>
                                <Typography variant="body1" fontWeight="medium">{amenity}</Typography>
                              </Paper>
                            </motion.div>
                          </Grid>
                        ))}
                      </Grid>
                    </motion.div>
                  )}
                  
                  {/* Reviews Tab */}
                  {activeTab === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                          <Paper 
                            variant="outlined" 
                            sx={{ 
                              p: 3, 
                              borderRadius: 3,
                              textAlign: 'center',
                              height: '100%',
                            }}
                          >
                            <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                              {venue.rating.toFixed(1)}
                            </Typography>
                            <Rating value={venue.rating} precision={0.1} size="large" readOnly sx={{ mb: 1 }} />
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Based on {reviews.length} reviews
                            </Typography>
                            
                            <Box sx={{ mt: 3 }}>
                              {[5, 4, 3, 2, 1].map((star) => (
                                <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Typography variant="body2" sx={{ mr: 1, minWidth: 20 }}>
                                    {star}
                                  </Typography>
                                  <Box sx={{ 
                                    flexGrow: 1, 
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    borderRadius: 5,
                                    mr: 1,
                                    height: 8
                                  }}>
                                    <Box 
                                      sx={{ 
                                        width: `${reviews.length > 0 ? (ratingDistribution[5 - star] / reviews.length * 100) : 0}%`, 
                                        bgcolor: theme.palette.primary.main,
                                        height: '100%',
                                        borderRadius: 5
                                      }} 
                                    />
                                  </Box>
                                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 25 }}>
                                    {ratingDistribution[5 - star]}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </Paper>
                        </Grid>
                        
                        <Grid item xs={12} md={8}>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Customer Reviews
                          </Typography>
                          
                          {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                              <Paper 
                                key={index}
                                variant="outlined"
                                sx={{ 
                                  p: 3, 
                                  mb: 2, 
                                  borderRadius: 3,
                                }}
                              >
                                <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                  <Box sx={{ display: 'flex' }}>
                                    <Avatar
                                      src={review.user.avatar}
                                      alt={review.user.name}
                                      sx={{ width: 48, height: 48, mr: 2 }}
                                    />
                                    <Box>
                                      <Typography variant="subtitle1" fontWeight="bold">
                                        {review.user.name}
                                      </Typography>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Rating value={review.rating} size="small" readOnly />
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                          {new Date(review.createdAt).toLocaleDateString()}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                                <Typography variant="body1">
                                  {review.text}
                                </Typography>
                              </Paper>
                            ))
                          ) : (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                              <Typography variant="body1" color="text.secondary">
                                No reviews yet. Be the first to review this venue!
                              </Typography>
                            </Box>
                          )}
                          
                          {currentUser ? (
                            <Button
                              fullWidth
                              variant="outlined"
                              sx={{ mt: 2 }}
                            >
                              Write a Review
                            </Button>
                          ) : (
                            <Button
                              fullWidth
                              variant="outlined"
                              component={RouterLink}
                              to="/login"
                              sx={{ mt: 2 }}
                            >
                              Log in to Write a Review
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </motion.div>
                  )}
                </Box>
              </Paper>
              
              {/* Similar Venues Section */}
              <Box sx={{ mt: 6, mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Similar Venues
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  You might also be interested in these venues
                </Typography>
                
                <Grid container spacing={3}>
                  {similarVenues.map((similarVenue) => (
                    <Grid item key={similarVenue._id} xs={12} md={4}>
                      <Card 
                        sx={{ 
                          borderRadius: 3,
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: 4,
                          }
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="180"
                          image={similarVenue.image}
                          alt={similarVenue.name}
                        />
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {similarVenue.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {similarVenue.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                              <PeopleAltIcon fontSize="small" sx={{ mr: 0.5 }} />
                              {similarVenue.capacity} guests
                            </Typography>
                            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                              <AttachMoneyIcon fontSize="small" sx={{ mr: 0.5 }} />
                              ${similarVenue.pricePerHour}/hr
                            </Typography>
                          </Box>
                          <Button
                            fullWidth
                            variant="outlined"
                            component={RouterLink}
                            to={`/venues/${similarVenue._id}`}
                            sx={{ mt: 2 }}
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            
            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                {/* Booking Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card
                    elevation={4}
                    sx={{ 
                      borderRadius: 3,
                      overflow: 'hidden',
                      mb: 3,
                      boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                    }}
                  >
                    <Box sx={{ 
                      p: 3, 
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: 'white'
                    }}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Book this Venue
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Complete your booking in just a few easy steps
                      </Typography>
                    </Box>
                    
                    <CardContent>
                      <List disablePadding>
                        <ListItem disableGutters sx={{ py: 1.5 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <PeopleAltIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Capacity" 
                            secondary={`Up to ${venue.capacity} people`}
                          />
                        </ListItem>
                        
                        <ListItem disableGutters sx={{ py: 1.5 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <AttachMoneyIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Price" 
                            secondary={`$${venue.pricePerHour} per hour`}
                          />
                        </ListItem>
                        
                        <ListItem disableGutters sx={{ py: 1.5 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <AccessTimeIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Availability" 
                            secondary="Check calendar for available slots"
                          />
                        </ListItem>
                      </List>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ mt: 3 }}>
                        <LoadingButton
                          fullWidth
                          size="large"
                          variant="contained"
                          onClick={handleBookNow}
                          loading={bookingLoading}
                          sx={{ py: 1.5 }}
                          endIcon={<ArrowForwardIcon />}
                        >
                          Book Now
                        </LoadingButton>
                        
                        <Button
                          fullWidth
                          size="large"
                          variant="outlined"
                          sx={{ mt: 2 }}
                        >
                          Contact Venue
                        </Button>
                      </Box>
                      
                      <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No payment required until booking is confirmed
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Location Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card
                    elevation={0}
                    variant="outlined"
                    sx={{ borderRadius: 3, overflow: 'hidden' }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <iframe
                        title="Venue Location"
                        width="100%"
                        height="250"
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                          `${venue.address.street}, ${venue.address.city}, ${venue.address.state} ${venue.address.zipCode}`
                        )}`}
                        allowFullScreen
                      ></iframe>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Location
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <LocationOnIcon fontSize="small" color="action" sx={{ mt: 0.5, mr: 1 }} />
                        <Typography variant="body2">
                          {venue.address.street}, {venue.address.city}, {venue.address.state}, {venue.address.zipCode}, {venue.address.country}
                        </Typography>
                      </Box>
                      <Button
                        variant="text"
                        fullWidth
                        sx={{ mt: 1 }}
                        component="a"
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          `${venue.address.street}, ${venue.address.city}, ${venue.address.state} ${venue.address.zipCode}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default VenueDetail;