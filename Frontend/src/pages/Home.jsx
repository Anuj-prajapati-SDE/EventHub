import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  InputAdornment,
  useTheme,
  Paper,
  Avatar,
  Divider,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
  Chip,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PaidIcon from '@mui/icons-material/Paid';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BusinessIcon from '@mui/icons-material/Business';
import CelebrationIcon from '@mui/icons-material/Celebration';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from 'framer-motion';

// Import components
import AnimatedBackground from '../components/common/AnimatedBackground';

// Dummy data for venues
const featuredVenues = [
  {
    id: 1,
    name: 'Grand Ballroom',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
    price: '$1,200/hr',
    capacity: '600 guests',
    rating: 4.9,
    categories: ['Wedding', 'Corporate', 'Gala'],
  },
  {
    id: 2,
    name: 'Seaside Pavilion',
    location: 'Miami Beach, FL',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
    price: '$850/hr',
    capacity: '300 guests',
    rating: 4.8,
    categories: ['Wedding', 'Party', 'Conference'],
  },
  {
    id: 3,
    name: 'Urban Loft',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1517957754642-2870518e16f8',
    price: '$500/hr',
    capacity: '150 guests',
    rating: 4.7,
    categories: ['Corporate', 'Party', 'Exhibition'],
  },
  {
    id: 4,
    name: 'Mountain View Resort',
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329',
    price: '$1,500/hr',
    capacity: '400 guests',
    rating: 4.9,
    categories: ['Wedding', 'Retreat', 'Conference'],
  },
];

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Event Planner',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    content: 'EventHub has transformed how I organize corporate events. The venue filtering and booking system saved me countless hours of work!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Wedding Coordinator',
    avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    content: 'I ve been using EventHub for all my wedding venue bookings. The detailed venue profiles and integrated payment system make everything seamless.',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Conference Organizer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'The A* search algorithm really does find the most convenient venues for our attendees. This platform has become essential for our conference planning.',
  },
];

// Event categories
const eventCategories = [
  { name: 'Corporate', icon: <BusinessIcon sx={{ fontSize: 40 }} /> },
  { name: 'Wedding', icon: <CelebrationIcon sx={{ fontSize: 40 }} /> },
  { name: 'Conference', icon: <GroupsIcon sx={{ fontSize: 40 }} /> },
  { name: 'Education', icon: <SchoolIcon sx={{ fontSize: 40 }} /> },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  
  // Animate on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{
          position: 'relative',
          height: { xs: '90vh', md: '95vh' },
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(to right, ${alpha(theme.palette.primary.dark, 0.9)}, ${alpha(theme.palette.primary.main, 0.8)})`,
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            zIndex: 1,
            background: "url('/img/pattern-dot.svg')",
          }}
        />


        <motion.div 
          className="floating"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ 
            position: 'absolute', 
            right: -100, 
            top: '50%', 
            width: '600px', 
            height: '600px',
            borderRadius: '50%', 
            background: `linear-gradient(135deg, ${theme.palette.secondary.light}44, ${theme.palette.secondary.main}22)`,
            zIndex: 1,
          }}
        />
        
        <motion.div 
          className="floating"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ 
            position: 'absolute', 
            left: -80, 
            bottom: -100, 
            width: '400px', 
            height: '400px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}33, ${theme.palette.primary.main}22)`,
            zIndex: 1,
          }}
        />


        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={2} alignItems="center" style={{ display: 'flex', height: '100%', flexWrap:'nowrap' }}>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Typography 
                  variant="h2" 
                  fontWeight="bold" 
                  sx={{ 
                    color: 'white',
                    mb: 2,
                  
                    fontSize: { xs: '2.5rem', sm: '3.2rem', md: '3.8rem' },
                    lineHeight: 1.1,
                  }}
                >
                  Find Your Perfect <br />
                  Event Venue <span style={{ color: theme.palette.secondary.main }}>Today</span>
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white',
                    mb: 4,
                    opacity: 0.9,
                    maxWidth: 600,
                    fontWeight: 'normal',
                  }}
                >
                  Discover and book amazing venues for your next event with our smart venue search powered by A* algorithm
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Box 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 3,
                    p: { xs: 2, md: 3 },
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <TextField
                        fullWidth
                        placeholder="Event type, venue name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ bgcolor: 'white', borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        placeholder="Location"
                        value={location}
                        onChange={handleLocationChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ bgcolor: 'white', borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Button 
                        variant="contained" 
                        size="large" 
                        fullWidth
                        component={RouterLink}
                        to="/venues"
                        sx={{ 
                          height: '100%', 
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                        }}
                        endIcon={<ArrowForwardIcon />}
                        className="btn-hover-effect"
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                  
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    justifyContent="center"
                    sx={{ mt: 2, flexWrap: 'wrap' }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1, pt: 0.5 }}>
                      Popular:
                    </Typography>
                    {['Wedding Venues', 'Conference Halls', 'Party Space', 'Corporate Events'].map((item, index) => (
                      <Chip 
                        key={index} 
                        label={item} 
                        size="small" 
                        onClick={() => setSearchQuery(item)}
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Stack>
                </Box>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Stack 
                  direction="row" 
                  spacing={2} 
                  alignItems="center" 
                  sx={{ mt: 4, flexWrap: 'wrap' }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<PlayArrowIcon />}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Watch How It Works
                  </Button>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
                    <Box sx={{ display: 'flex' }}>
                      {[...Array(3)].map((_, i) => (
                        <Avatar
                          key={i}
                          src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`}
                          sx={{ 
                            width: 35, 
                            height: 35,
                            border: '2px solid white',
                            marginLeft: i > 0 ? '-10px' : 0,
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ ml: 2, color: 'white' }}>
                      Join 5000+ happy customers
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>
            </Grid>
            
            {!isMobile && (
              <Grid item md={5}>
                <motion.div
                  initial={{ x: 30, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ position: 'relative' }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"
                    alt="Elegant venue"
                    sx={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover',
                      borderRadius: 5,
                      boxShadow: '0 20px 80px rgba(0, 0, 0, 0.3)',
                    }}
                  />
                  
                  <Paper
                    elevation={6}
                    sx={{
                      p: 2,
                      position: 'absolute',
                      bottom: -25,
                      left: -25,
                      borderRadius: 3,
                      width: 180,
                      textAlign: 'center',
                      bgcolor: 'secondary.main',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      4.9/5
                    </Typography>
                    <Typography variant="body2">
                      From 500+ reviews
                    </Typography>
                  </Paper>
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -15,
                      right: -15,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                      animation: 'pulse 2s infinite',
                    }}
                  >
                    <Typography variant="subtitle2">Up to</Typography>
                    <Typography variant="h6" fontWeight="bold">30% OFF</Typography>
                  </Box>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Event Categories */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }} className="animate-on-scroll">
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold', 
              mb: 1,
              textTransform: 'uppercase', 
              letterSpacing: 1,
            }}
          >
            Browse by Category
          </Typography>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Find the Perfect Venue
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Explore venues by event type to find the perfect space that meets your specific needs
          </Typography>
        </Box>
        
        <Grid container spacing={3} justifyContent="center">
          {eventCategories.map((category, index) => (
            <Grid item key={index} xs={6} sm={3}>
              <motion.div
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  variant={activeCategory === index ? 'elevation' : 'outlined'}
                  elevation={activeCategory === index ? 8 : 0}
                  onClick={() => setActiveCategory(index)}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: '100%',
                    borderColor: activeCategory === index ? 'primary.main' : 'divider',
                    bgcolor: activeCategory === index ? 'primary.main' : 'background.paper',
                    color: activeCategory === index ? 'white' : 'text.primary',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Box sx={{ color: activeCategory === index ? 'white' : 'primary.main', mb: 2 }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: activeCategory === index ? 'white' : 'text.secondary' }}>
                    {index * 23 + 50}+ venues
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }} className="animate-on-scroll">
          <Button 
            variant="outlined" 
            component={RouterLink} 
            to="/venues"
            endIcon={<ArrowForwardIcon />}
            size="large"
            sx={{ borderRadius: 6, px: 4 }}
          >
            View All Categories
          </Button>
        </Box>
      </Container>

      {/* Featured Venues */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 5 }} className="animate-on-scroll">
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h6" 
                  component="p" 
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 'bold', 
                    mb: 1,
                    textTransform: 'uppercase', 
                    letterSpacing: 1,
                  }}
                >
                  Top Venues
                </Typography>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  Featured Venues
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Discover our most popular and highly-rated venues for your next event
                </Typography>
              </Grid>
              <Grid item xs={12} md="auto" sx={{ mt: { xs: 2, md: 0 } }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  sx={{ 
                    '.MuiTabs-indicator': {
                      height: 4,
                      borderRadius: 2,
                    },
                  }}
                >
                  <Tab label="All" />
                  <Tab label="Wedding" />
                  <Tab label="Corporate" />
                  <Tab label="Social" />
                </Tabs>
              </Grid>
            </Grid>
          </Box>
          
          <Grid container spacing={4}>
            {featuredVenues.map((venue, index) => (
              <Grid item key={venue.id} xs={12} sm={6} md={6} lg={3}>
                <motion.div
                  className="venue-card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    elevation={3}
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      overflow: 'visible',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="220"
                        image={venue.image}
                        alt={venue.name}
                        sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          backgroundColor: 'primary.main',
                          color: 'white',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: 10,
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                        }}
                      >
                        ★ {venue.rating}
                      </Box>
                      
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 40,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                        }}
                      />
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom noWrap>
                        {venue.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.location}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {venue.categories.slice(0, 3).map((cat, idx) => (
                          <Chip 
                            key={idx} 
                            label={cat} 
                            size="small"
                            color={idx === 0 ? 'primary' : 'default'}
                            variant={idx === 0 ? 'filled' : 'outlined'}
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                          <PaidIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.success.main }} />
                          {venue.price}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventAvailableIcon sx={{ mr: 0.5, fontSize: 18, color: theme.palette.info.main }} />
                          {venue.capacity}
                        </Typography>
                      </Box>
                    </CardContent>
                    
                    <Box 
                      sx={{ 
                        p: 2, 
                        pt: 0, 
                        mx: 'auto', 
                        width: '90%', 
                        transform: 'translateY(50%)', 
                        position: 'relative', 
                        zIndex: 2,
                      }}
                    >
                      <Button 
                        variant="contained" 
                        fullWidth
                        component={RouterLink}
                        to={`/venues/${venue.id}`}
                        sx={{ 
                          borderRadius: 3, 
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                          py: 1.2,
                        }}
                        endIcon={<ArrowForwardIcon />}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }} className="animate-on-scroll">
            <Button 
              variant="outlined" 
              size="large"
              component={RouterLink}
              to="/venues"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 6, px: 4 }}
            >
              Explore All Venues
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <AnimatedBackground variant="gradient">
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }} className="animate-on-scroll">
            <Typography 
              variant="h6" 
              component="p" 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold', 
                mb: 1,
                textTransform: 'uppercase', 
                letterSpacing: 1,
                opacity: 0.9,
              }}
            >
              Simple Process
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
              How It Works
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
              EventHub makes venue booking simple and efficient with our easy three-step process
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                step: 1,
                title: "Search & Filter",
                description: "Use our smart search to find venues that match your requirements. Filter by location, capacity, budget, and amenities.",
                icon: <SearchIcon sx={{ fontSize: 40 }} />,
                color: theme.palette.secondary.main,
              },
              {
                step: 2,
                title: "Book & Pay",
                description: "Select your preferred date and time, then securely book and pay for your venue with our integrated payment system.",
                icon: <PaidIcon sx={{ fontSize: 40 }} />,
                color: alpha(theme.palette.secondary.light, 0.8),
              },
              {
                step: 3,
                title: "Enjoy Your Event",
                description: "Receive your booking confirmation and e-receipt. Arrive at your venue and enjoy your perfectly planned event!",
                icon: <CelebrationIcon sx={{ fontSize: 40 }} />,
                color: theme.palette.secondary.dark,
              }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 6,
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -30,
                        right: -30,
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        backgroundColor: alpha(item.color, 0.15),
                        zIndex: 0,
                      }}
                    />
                    
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: alpha(item.color, 0.2),
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        mb: 3,
                        mx: 'auto',
                        position: 'relative',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        zIndex: 1,
                      }}
                    >
                      {item.step}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AnimatedBackground>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }} className="animate-on-scroll">
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold', 
              mb: 1,
              textTransform: 'uppercase', 
              letterSpacing: 1,
            }}
          >
            Testimonials
          </Typography>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            What Our Users Say
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Hear from event planners and venue owners who have transformed their experience with EventHub
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item key={testimonial.id} xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative quote mark */}
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      position: 'absolute', 
                      top: -20, 
                      left: -10, 
                      opacity: 0.05, 
                      fontSize: '150px',
                      fontFamily: 'serif',
                      fontWeight: 'bold',
                      zIndex: 0,
                    }}
                  >
                    "
                  </Typography>
                  
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                        "{testimonial.content}"
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        sx={{ width: 56, height: 56, mr: 2 }} 
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Decorative elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -20,
                      right: -20,
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.palette.primary.light}22, ${theme.palette.primary.main}11)`,
                      zIndex: 0,
                    }}
                  />
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: 10,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
          color: 'white',
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
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Ready to Find Your Perfect Venue?
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 5, maxWidth: 700, mx: 'auto', fontWeight: 'normal' }}>
                Join thousands of event organizers who have simplified their venue booking process with EventHub
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 2, sm: 3 }}
                justifyContent="center"
              >
                <Button 
                  variant="contained" 
                  size="large"
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: theme.palette.grey[100],
                      boxShadow: '0 8px 25px -8px rgba(255, 255, 255, 0.4)',
                    }
                  }}
                >
                  Get Started For Free
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  component={RouterLink}
                  to="/venues"
                  sx={{ 
                    borderColor: 'white', 
                    borderWidth: 2,
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Browse Venues
                </Button>
              </Stack>
              
              <Typography variant="body2" sx={{ mt: 4, opacity: 0.7 }}>
                No credit card required • Free to get started • Cancel anytime
              </Typography>
            </Box>
          </Container>
        </motion.div>
      </Box>
    </>
  );
};

export default Home;