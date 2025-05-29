import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  IconButton,
  Divider,
  Chip,
  Pagination,
  useTheme,
  alpha,
  Drawer,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

import PageHeader from '../../components/common/PageHeader';
import VenueCard from '../../components/venues/VenueCard';
import Loader from '../../components/common/Loader';
import AnimatedBackground from '../../components/common/AnimatedBackground';

const VenueList = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [totalVenues, setTotalVenues] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const venuesPerPage = 9;
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [capacityRange, setCapacityRange] = useState([0, 1000]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter options
  const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL', 'San Francisco, CA'];
  const amenities = ['WiFi', 'Parking', 'Catering', 'Sound System', 'Projector', 'Stage', 'Bar', 'Kitchen', 'Outdoor Area', 'Wheelchair Access'];
  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'capacity', label: 'Capacity' },
  ];
  
  // Initialize venues data
  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const currentDate = new Date("2025-05-28 20:58:30");
        
        // In a real app, you would fetch data from API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        // Generate 20 mock venues
        const mockVenues = Array.from({ length: 20 }, (_, index) => ({
          _id: String(index + 1),
          name: [
            'Grand Ballroom',
            'Skyline Loft',
            'Urban Event Center',
            'Harbor View Pavilion',
            'Metropolitan Hall',
            'Sunset Terrace',
            'Downtown Conference Center',
            'Seaside Venue',
            'Midtown Events',
            'Art Gallery Space',
            'Garden Venue',
            'Historic Mansion',
            'Modern Studio',
            'Waterfront Hall',
            'Industrial Loft',
            'Rooftop Lounge',
            'Theater Space',
            'Country Estate',
            'Luxury Hotel Ballroom',
            'Museum Event Hall'
          ][index % 20],
          description: 'A beautiful venue perfect for your next event.',
          city: [
            'New York, NY',
            'Los Angeles, CA',
            'Chicago, IL',
            'Houston, TX',
            'Miami, FL',
            'San Francisco, CA',
            'Boston, MA',
            'Seattle, WA',
            'Dallas, TX',
            'Denver, CO'
          ][index % 10],
          capacity: Math.floor(Math.random() * 900) + 100, // 100 to 1000
          pricePerHour: Math.floor(Math.random() * 2000) + 500, // $500 to $2500
          rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // 3.5 to 5.0
          amenities: amenities.filter(() => Math.random() > 0.5), // Random amenities
          categories: [
            'Wedding', 'Corporate', 'Conference', 'Party', 'Exhibition',
            'Concert', 'Workshop', 'Meetup', 'Retreat'
          ].filter(() => Math.random() > 0.6), // Random categories
          images: [
            `https://source.unsplash.com/800x600/?venue,event,${index + 1}`,
            `https://source.unsplash.com/800x600/?venue,interior,${index + 1}`,
            `https://source.unsplash.com/800x600/?venue,hall,${index + 1}`
          ],
          isFavorite: false,
        }));
        
        setVenues(mockVenues);
        setFilteredVenues(mockVenues);
        setTotalVenues(mockVenues.length);
        
        // Parse any query params for initial filters
        const params = new URLSearchParams(location.search);
        if (params.has('search')) setSearchQuery(params.get('search'));
        if (params.has('location')) setSelectedLocation(params.get('location'));
        
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVenues();
  }, [location.search]);
  
  // Apply filters when filter state changes
  useEffect(() => {
    const applyFilters = () => {
      let results = venues;
      
      // Search query filter
      if (searchQuery) {
        results = results.filter(venue => 
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.categories?.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      // Location filter
      if (selectedLocation) {
        results = results.filter(venue => venue.city === selectedLocation);
      }
      
      // Capacity filter
      results = results.filter(venue => 
        venue.capacity >= capacityRange[0] && 
        venue.capacity <= capacityRange[1]
      );
      
      // Price filter
      results = results.filter(venue => 
        venue.pricePerHour >= priceRange[0] && 
        venue.pricePerHour <= priceRange[1]
      );
      
      // Amenities filter
      if (selectedAmenities.length > 0) {
        results = results.filter(venue => 
          selectedAmenities.every(amenity => venue.amenities?.includes(amenity))
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'price_low':
          results.sort((a, b) => a.pricePerHour - b.pricePerHour);
          break;
        case 'price_high':
          results.sort((a, b) => b.pricePerHour - a.pricePerHour);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'capacity':
          results.sort((a, b) => b.capacity - a.capacity);
          break;
        default:
          // Recommended - sort by a combination of rating and price
          results.sort((a, b) => b.rating - a.rating || a.pricePerHour - b.pricePerHour);
      }
      
      setFilteredVenues(results);
      setTotalVenues(results.length);
      setPage(1); // Reset to first page when filters change
    };
    
    applyFilters();
  }, [searchQuery, selectedLocation, capacityRange, priceRange, selectedAmenities, sortBy, venues]);
  
  // Handle pagination
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Toggle favorites
  const handleFavoriteToggle = (venueId) => {
    const updatedVenues = venues.map(venue => 
      venue._id === venueId ? { ...venue, isFavorite: !venue.isFavorite } : venue
    );
    setVenues(updatedVenues);
    
    // Update filtered venues as well
    setFilteredVenues(prevFiltered => 
      prevFiltered.map(venue => 
        venue._id === venueId ? { ...venue, isFavorite: !venue.isFavorite } : venue
      )
    );
    
    // Update favorites list
    if (favorites.includes(venueId)) {
      setFavorites(favorites.filter(id => id !== venueId));
    } else {
      setFavorites([...favorites, venueId]);
    }
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setCapacityRange([0, 1000]);
    setPriceRange([0, 5000]);
    setSelectedAmenities([]);
    setSortBy('recommended');
  };
  
  // Handle amenity toggle
  const handleAmenityToggle = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  // Calculate current page venues
  const currentVenues = filteredVenues.slice(
    (page - 1) * venuesPerPage,
    page * venuesPerPage
  );
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);
  
  // Check if any filters are applied
  const hasActiveFilters = 
    searchQuery || 
    selectedLocation || 
    capacityRange[0] > 0 || 
    capacityRange[1] < 1000 || 
    priceRange[0] > 0 || 
    priceRange[1] < 5000 || 
    selectedAmenities.length > 0 ||
    sortBy !== 'recommended';
  
  if (loading) {
    return <Loader message="Loading venues..." />;
  }
  
  return (
    <>
      <PageHeader 
        title="Discover Venues" 
        subtitle="Find the perfect venue for your next event" 
        background="gradient"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filters - Desktop */}
          <Grid 
            item 
            xs={12} 
            md={3} 
            sx={{ 
              display: { xs: 'none', md: 'block' } 
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ position: 'sticky', top: 24 }}>
                <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Filters
                    </Typography>
                    {hasActiveFilters && (
                      <Button 
                        size="small" 
                        onClick={handleResetFilters}
                        startIcon={<ClearIcon />}
                      >
                        Clear All
                      </Button>
                    )}
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  {/* Location Filter */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Location
                    </Typography>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Select Location</InputLabel>
                      <Select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        label="Select Location"
                        startAdornment={
                          <InputAdornment position="start">
                            <LocationOnIcon fontSize="small" />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">Any Location</MenuItem>
                        {locations.map((location, index) => (
                          <MenuItem key={index} value={location}>{location}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  {/* Capacity Filter */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Capacity
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleAltIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {capacityRange[0]} - {capacityRange[1]} guests
                      </Typography>
                    </Box>
                    <Slider
                      value={capacityRange}
                      onChange={(e, newValue) => setCapacityRange(newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000}
                      step={50}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Min"
                          type="number"
                          size="small"
                          value={capacityRange[0]}
                          onChange={(e) => setCapacityRange([
                            Math.max(0, Math.min(parseInt(e.target.value) || 0, capacityRange[1])),
                            capacityRange[1]
                          ])}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Max"
                          type="number"
                          size="small"
                          value={capacityRange[1]}
                          onChange={(e) => setCapacityRange([
                            capacityRange[0],
                            Math.max(capacityRange[0], parseInt(e.target.value) || 0)
                          ])}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  
                  {/* Price Filter */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Price per Hour
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        ${priceRange[0]} - ${priceRange[1]}
                      </Typography>
                    </Box>
                    <Slider
                      value={priceRange}
                      onChange={(e, newValue) => setPriceRange(newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={5000}
                      step={100}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Min ($)"
                          type="number"
                          size="small"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([
                            Math.max(0, Math.min(parseInt(e.target.value) || 0, priceRange[1])),
                            priceRange[1]
                          ])}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Max ($)"
                          type="number"
                          size="small"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([
                            priceRange[0],
                            Math.max(priceRange[0], parseInt(e.target.value) || 0)
                          ])}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  
                  {/* Amenities Filter */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Amenities
                    </Typography>
                    <FormGroup>
                      {amenities.map((amenity, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={selectedAmenities.includes(amenity)}
                              onChange={() => handleAmenityToggle(amenity)}
                              size="small"
                            />
                          }
                          label={<Typography variant="body2">{amenity}</Typography>}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                </Paper>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Main Content */}
          <Grid item xs={12} md={9}>
            {/* Search and Sort Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper 
                elevation={0} 
                variant="outlined" 
                sx={{ p: 2, borderRadius: 3, mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}
              >
                <TextField
                  placeholder="Search venues..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery ? (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchQuery('')}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ) : null
                  }}
                />
                
                <Box sx={{ display: 'flex', gap: 1, minWidth: { sm: '240px' } }}>
                  <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Sort By"
                      startAdornment={
                        <InputAdornment position="start">
                          <SortIcon fontSize="small" />
                        </InputAdornment>
                      }
                    >
                      {sortOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <Button
                    variant="outlined"
                    startIcon={<TuneIcon />}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                    onClick={() => setShowMobileFilters(true)}
                  >
                    Filters
                  </Button>
                </Box>
              </Paper>
            </motion.div>
            
            {/* Active Filters */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {selectedLocation && (
                    <Chip 
                      label={`Location: ${selectedLocation}`} 
                      onDelete={() => setSelectedLocation('')}
                      sx={{ '& .MuiChip-deleteIcon': { color: 'inherit' } }}
                    />
                  )}
                  
                  {(capacityRange[0] > 0 || capacityRange[1] < 1000) && (
                    <Chip 
                      label={`Capacity: ${capacityRange[0]}-${capacityRange[1]}`}
                      onDelete={() => setCapacityRange([0, 1000])}
                      sx={{ '& .MuiChip-deleteIcon': { color: 'inherit' } }}
                    />
                  )}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                    <Chip 
                      label={`Price: $${priceRange[0]}-$${priceRange[1]}`}
                      onDelete={() => setPriceRange([0, 5000])}
                      sx={{ '& .MuiChip-deleteIcon': { color: 'inherit' } }}
                    />
                  )}
                  
                  {selectedAmenities.map(amenity => (
                    <Chip 
                      key={amenity}
                      label={amenity}
                      onDelete={() => handleAmenityToggle(amenity)}
                      sx={{ '& .MuiChip-deleteIcon': { color: 'inherit' } }}
                    />
                  ))}
                  
                  {sortBy !== 'recommended' && (
                    <Chip 
                      label={`Sort: ${sortOptions.find(o => o.value === sortBy).label}`}
                      onDelete={() => setSortBy('recommended')}
                      sx={{ '& .MuiChip-deleteIcon': { color: 'inherit' } }}
                    />
                  )}
                </Box>
              </motion.div>
            )}
            
            {/* Results count */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary">
                Showing {filteredVenues.length === 0 ? 0 : (page - 1) * venuesPerPage + 1}-
                {Math.min(page * venuesPerPage, filteredVenues.length)} of {filteredVenues.length} venues
              </Typography>
            </Box>
            
            {/* Venues Grid */}
            <Grid container spacing={3} alignItems="stretch">
              {currentVenues.length > 0 ? (
                currentVenues.map((venue, index) => (
                  <Grid item xs={12} sm={6} md={4} key={venue._id} sx={{ display: 'flex' }}>
                    <Box sx={{ width: '100%' }}>
                      <VenueCard 
                        venue={venue} 
                        onFavoriteToggle={handleFavoriteToggle} 
                        featured={index < 2}
                      />
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper 
                    variant="outlined" 
                    sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}
                  >
                    <Typography variant="h6" gutterBottom>
                      No venues found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Try adjusting your filters or search terms
                    </Typography>
                    <Button 
                      variant="outlined" 
                      onClick={handleResetFilters}
                      startIcon={<ClearIcon />}
                    >
                      Clear All Filters
                    </Button>
                  </Paper>
                </Grid>
              )}
            </Grid>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                  size="large"
                  shape="rounded"
                />
              </Box>
            )}
          </Grid>
        </Grid>
        
        {/* Mobile Filters Drawer */}
        <Drawer
          anchor="bottom"
          open={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: '90vh',
            },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Filters
            </Typography>
            <Box>
              {hasActiveFilters && (
                <Button 
                  size="small" 
                  onClick={handleResetFilters}
                  sx={{ mr: 1 }}
                >
                  Clear All
                </Button>
              )}
              <IconButton onClick={() => setShowMobileFilters(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Divider />
          
          <Box sx={{ p: 3, overflow: 'auto' }}>
            {/* Location Filter */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Location
              </Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Select Location</InputLabel>
                <Select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  label="Select Location"
                >
                  <MenuItem value="">Any Location</MenuItem>
                  {locations.map((location, index) => (
                    <MenuItem key={index} value={location}>{location}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            {/* Capacity Filter */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Capacity
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={capacityRange}
                  onChange={(e, newValue) => setCapacityRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={50}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Min"
                    type="number"
                    size="small"
                    value={capacityRange[0]}
                    onChange={(e) => setCapacityRange([
                      Math.max(0, Math.min(parseInt(e.target.value) || 0, capacityRange[1])),
                      capacityRange[1]
                    ])}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Max"
                    type="number"
                    size="small"
                    value={capacityRange[1]}
                    onChange={(e) => setCapacityRange([
                      capacityRange[0],
                      Math.max(capacityRange[0], parseInt(e.target.value) || 0)
                    ])}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            
            {/* Price Filter */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Price per Hour
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={100}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Min ($)"
                    type="number"
                    size="small"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([
                      Math.max(0, Math.min(parseInt(e.target.value) || 0, priceRange[1])),
                      priceRange[1]
                    ])}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Max ($)"
                    type="number"
                    size="small"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([
                      priceRange[0],
                      Math.max(priceRange[0], parseInt(e.target.value) || 0)
                    ])}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            
            {/* Amenities Filter */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Amenities
              </Typography>
              <Grid container>
                {amenities.map((amenity, index) => (
                  <Grid item xs={6} key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{amenity}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            {/* Sort */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Sort By
              </Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  {sortOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </Button>
          </Box>
        </Drawer>
      </Container>
    </>
  );
};

export default VenueList;