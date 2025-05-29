import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Divider,
  Chip,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import { motion } from 'framer-motion';
import PageHeader from '../../components/common/PageHeader';

const AddVenue = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [venueData, setVenueData] = useState({
    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
    },
    capacity: '',
    pricePerHour: '',
    amenities: [],
    rules: ['No smoking inside the venue'],
    categories: [],
    openingHours: {
      monday: { open: '09:00', close: '22:00' },
      tuesday: { open: '09:00', close: '22:00' },
      wednesday: { open: '09:00', close: '22:00' },
      thursday: { open: '09:00', close: '23:00' },
      friday: { open: '09:00', close: '00:00' },
      saturday: { open: '10:00', close: '00:00' },
      sunday: { open: '10:00', close: '22:00' },
    },
  });
  
  // Images state
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  
  // Custom amenity and rule inputs
  const [newAmenity, setNewAmenity] = useState('');
  const [newRule, setNewRule] = useState('');
  const [newCategory, setNewCategory] = useState('');
  
  // Available amenities and categories
  const availableAmenities = [
    'WiFi', 'Parking', 'Catering', 'Sound System', 'Projector', 
    'Stage', 'Bar', 'Kitchen', 'Outdoor Area', 'Wheelchair Access',
    'Air Conditioning', 'Heating', 'Tables and Chairs', 'Security',
    'Cleaning Service', 'Dressing Rooms', 'Restrooms'
  ];
  
  const availableCategories = [
    'Wedding', 'Corporate', 'Conference', 'Party', 'Exhibition',
    'Concert', 'Workshop', 'Meetup', 'Retreat', 'Training',
    'Gala', 'Networking', 'Product Launch', 'Social Gathering'
  ];
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like address.street
      const [parent, child] = name.split('.');
      setVenueData({
        ...venueData,
        [parent]: {
          ...venueData[parent],
          [child]: value
        }
      });
    } else {
      setVenueData({
        ...venueData,
        [name]: value
      });
    }
  };
  
  // Handle opening hours changes
  const handleHoursChange = (day, type, value) => {
    setVenueData({
      ...venueData,
      openingHours: {
        ...venueData.openingHours,
        [day]: {
          ...venueData.openingHours[day],
          [type]: value
        }
      }
    });
  };
  
  // Handle amenity toggle
  const handleAmenityToggle = (amenity) => {
    if (venueData.amenities.includes(amenity)) {
      setVenueData({
        ...venueData,
        amenities: venueData.amenities.filter(a => a !== amenity)
      });
    } else {
      setVenueData({
        ...venueData,
        amenities: [...venueData.amenities, amenity]
      });
    }
  };
  
  // Add custom amenity
  const handleAddAmenity = () => {
    if (newAmenity && !venueData.amenities.includes(newAmenity)) {
      setVenueData({
        ...venueData,
        amenities: [...venueData.amenities, newAmenity]
      });
      setNewAmenity('');
    }
  };
  
  // Add custom rule
  const handleAddRule = () => {
    if (newRule && !venueData.rules.includes(newRule)) {
      setVenueData({
        ...venueData,
        rules: [...venueData.rules, newRule]
      });
      setNewRule('');
    }
  };
  
  // Remove rule
  const handleRemoveRule = (rule) => {
    setVenueData({
      ...venueData,
      rules: venueData.rules.filter(r => r !== rule)
    });
  };
  
  // Handle category toggle
  const handleCategoryToggle = (category) => {
    if (venueData.categories.includes(category)) {
      setVenueData({
        ...venueData,
        categories: venueData.categories.filter(c => c !== category)
      });
    } else {
      setVenueData({
        ...venueData,
        categories: [...venueData.categories, category]
      });
    }
  };
  
  // Add custom category
  const handleAddCategory = () => {
    if (newCategory && !venueData.categories.includes(newCategory)) {
      setVenueData({
        ...venueData,
        categories: [...venueData.categories, newCategory]
      });
      setNewCategory('');
    }
  };
  
  // Add image URL to list
  const handleAddImage = () => {
    if (currentImage && !images.includes(currentImage)) {
      setImages([...images, currentImage]);
      setCurrentImage('');
    }
  };
  
  // Remove image from list
  const handleRemoveImage = (image) => {
    setImages(images.filter(img => img !== image));
  };
  
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate form
      if (!venueData.name || !venueData.description || !venueData.address.street || 
          !venueData.address.city || !venueData.address.state || !venueData.address.zipCode ||
          !venueData.capacity || !venueData.pricePerHour || venueData.amenities.length === 0 || 
          images.length === 0) {
        throw new Error('Please fill in all required fields and add at least one image');
      }
      
      // In a real app, you would make an API call to save the venue
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/venues');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <PageHeader 
        title="Add New Venue" 
        subtitle="List your venue on EventHub and start receiving bookings" 
        background="gradient"
        height="small"
      />
      
      <Container maxWidth="lg" sx={{ py: 4, mb: 4 }}>
        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="subtitle1">
                Venue created successfully!
              </Typography>
              <Typography variant="body2">
                Redirecting you to your venues dashboard...
              </Typography>
            </Alert>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <Grid container spacing={4}>
              {/* Basic Information */}
              <Grid item xs={12} lg={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Basic Information
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          label="Venue Name"
                          name="name"
                          value={venueData.name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          label="Description"
                          name="description"
                          value={venueData.description}
                          onChange={handleChange}
                          multiline
                          rows={4}
                          placeholder="Provide a detailed description of your venue..."
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </motion.div>
                
                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Location
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          label="Street Address"
                          name="address.street"
                          value={venueData.address.street}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="City"
                          name="address.city"
                          value={venueData.address.city}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="State"
                          name="address.state"
                          value={venueData.address.state}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Zip Code"
                          name="address.zipCode"
                          value={venueData.address.zipCode}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Country"
                          name="address.country"
                          value={venueData.address.country}
                          onChange={handleChange}
                          select
                        >
                          <MenuItem value="USA">United States</MenuItem>
                          <MenuItem value="CAN">Canada</MenuItem>
                          <MenuItem value="GBR">United Kingdom</MenuItem>
                          <MenuItem value="AUS">Australia</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Paper>
                </motion.div>
                
                {/* Capacity & Pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Capacity & Pricing
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Maximum Capacity"
                          name="capacity"
                          type="number"
                          value={venueData.capacity}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PeopleIcon />
                              </InputAdornment>
                            ),
                            inputProps: { min: 1 }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Price Per Hour (USD)"
                          name="pricePerHour"
                          type="number"
                          value={venueData.pricePerHour}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoneyIcon />
                              </InputAdornment>
                            ),
                            inputProps: { min: 0 }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </motion.div>
                
                {/* Opening Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Opening Hours
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Grid container spacing={3}>
                      {Object.keys(venueData.openingHours).map((day) => (
                        <Grid item xs={12} sm={6} key={day}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <AccessTimeIcon sx={{ mr: 1 }} />
                            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                              {day}
                            </Typography>
                          </Box>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Open"
                                type="time"
                                value={venueData.openingHours[day].open}
                                onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Close"
                                type="time"
                                value={venueData.openingHours[day].close}
                                onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </motion.div>
                
                {/* Images */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Images
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Image URL"
                        value={currentImage}
                        onChange={(e) => setCurrentImage(e.target.value)}
                        placeholder="Enter image URL"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImageIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                variant="contained"
                                size="small"
                                onClick={handleAddImage}
                                disabled={!currentImage}
                                startIcon={<AddIcon />}
                              >
                                Add
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Added Images ({images.length})
                      </Typography>
                      {images.length === 0 && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                          Please add at least one image for your venue
                        </Alert>
                      )}
                      <Grid container spacing={2}>
                        {images.map((image, index) => (
                          <Grid item xs={6} sm={4} key={index}>
                            <Box sx={{ position: 'relative' }}>
                              <Box
                                component="img"
                                src={image}
                                alt={`Venue image ${index + 1}`}
                                sx={{
                                  width: '100%',
                                  height: 120,
                                  objectFit: 'cover',
                                  borderRadius: 2,
                                }}
                              />
                              <IconButton
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 5,
                                  right: 5,
                                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                                  color: 'white',
                                  '&:hover': {
                                    bgcolor: 'rgba(255, 0, 0, 0.7)',
                                  },
                                }}
                                onClick={() => handleRemoveImage(image)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', mt: 2, p: 3, borderRadius: 2, border: '2px dashed #ccc' }}>
                      <CloudUploadIcon sx={{ fontSize: 50, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body1" paragraph>
                        Drag and drop image files here or click to upload
                      </Typography>
                      <Button variant="outlined">
                        Choose Files
                      </Button>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        (Feature not active in this demo)
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              
              {/* Sidebar */}
              <Grid item xs={12} lg={4}>
                {/* Amenities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Amenities
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <FormControl component="fieldset" fullWidth>
                      <FormLabel component="legend">Select available amenities</FormLabel>
                      <FormGroup sx={{ mt: 2, mb: 3 }}>
                        <Grid container>
                          {availableAmenities.map((amenity) => (
                            <Grid item xs={12} sm={6} key={amenity}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={venueData.amenities.includes(amenity)}
                                    onChange={() => handleAmenityToggle(amenity)}
                                    color="primary"
                                  />
                                }
                                label={amenity}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>
                    </FormControl>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Amenities
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {venueData.amenities.map((amenity) => (
                        <Chip
                          key={amenity}
                          label={amenity}
                          onDelete={() => handleAmenityToggle(amenity)}
                        />
                      ))}
                      {venueData.amenities.length === 0 && (
                        <Typography variant="body2" color="text.secondary">
                          No amenities selected
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Add Custom Amenity"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        placeholder="e.g., DJ Equipment"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                variant="contained"
                                size="small"
                                onClick={handleAddAmenity}
                                disabled={!newAmenity}
                              >
                                Add
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Paper>
                </motion.div>
                
                {/* Categories */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Categories
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Select categories that best describe your venue
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {availableCategories.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          onClick={() => handleCategoryToggle(category)}
                          color={venueData.categories.includes(category) ? 'primary' : 'default'}
                          variant={venueData.categories.includes(category) ? 'filled' : 'outlined'}
                        />
                      ))}
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Categories
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {venueData.categories.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          onDelete={() => handleCategoryToggle(category)}
                          color="primary"
                        />
                      ))}
                      {venueData.categories.length === 0 && (
                        <Typography variant="body2" color="text.secondary">
                          No categories selected
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Add Custom Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="e.g., Rooftop"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                variant="contained"
                                size="small"
                                onClick={handleAddCategory}
                                disabled={!newCategory}
                              >
                                Add
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Paper>
                </motion.div>
                
                {/* Rules */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Venue Rules
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Add rules and restrictions for your venue
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      {venueData.rules.map((rule, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            • {rule}
                          </Typography>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleRemoveRule(rule)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Add Rule"
                        value={newRule}
                        onChange={(e) => setNewRule(e.target.value)}
                        placeholder="e.g., No pets allowed"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                variant="contained"
                                size="small"
                                onClick={handleAddRule}
                                disabled={!newRule}
                              >
                                Add
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Paper>
                </motion.div>
                
                {/* Submit Button */}
                <Box sx={{ mt: 4 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    loading={loading}
                    startIcon={<SaveIcon />}
                    sx={{ py: 1.5 }}
                  >
                    Create Venue
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    fullWidth
                    sx={{ mt: 2, py: 1.5 }}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </>
  );
};

export default AddVenue;