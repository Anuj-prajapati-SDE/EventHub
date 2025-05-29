import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Rating,
  Divider,
  Chip,
  Checkbox,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SendIcon from '@mui/icons-material/Send';
import FeedbackIcon from '@mui/icons-material/Feedback';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { motion } from 'framer-motion';

import { useAuth } from '../contexts/AuthContext';
import PageHeader from '../components/common/PageHeader';

// Custom rating component with emojis
function CustomRating({ value, onChange }) {
  const theme = useTheme();
  
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 40 }} />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon sx={{ fontSize: 40 }} />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentNeutralIcon sx={{ fontSize: 40 }} />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedIcon sx={{ fontSize: 40 }} />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon sx={{ fontSize: 40 }} />,
      label: 'Very Satisfied',
    },
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Rating
        name="user-satisfaction"
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        getLabelText={(value) => customIcons[value].label}
        IconContainerComponent={({ value: ratingValue, ...props }) => {
          const isActive = ratingValue <= value;
          return (
            <Box
              {...props}
              sx={{
                px: 1.5,
                color: isActive ? 
                  (ratingValue < 3 ? 
                    theme.palette.error.main : 
                    ratingValue === 3 ? 
                      theme.palette.warning.main : 
                      theme.palette.success.main
                  ) : 
                  'text.disabled',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.2)',
                }
              }}
            >
              {customIcons[ratingValue].icon}
            </Box>
          );
        }}
      />
      <Typography variant="body2" color="text.secondary" mt={1}>
        {value ? customIcons[value].label : 'Select your rating'}
      </Typography>
    </Box>
  );
}

const Feedback = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Anuj Prajapati',
    email: currentUser?.email || 'anuj.prajapati@example.com',
    feedback: '',
    feedbackType: 'general',
    source: 'website',
    ratingGeneral: 0,
    ratingEase: 0,
    ratingSupport: 0,
    specificFeatures: [],
    contactConsent: currentUser ? true : false,
  });
  
  const feedbackTypes = [
    { value: 'general', label: 'General Feedback' },
    { value: 'suggestion', label: 'Feature Suggestion' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'testimonial', label: 'Testimonial' },
    { value: 'other', label: 'Other' },
  ];
  
  const sources = [
    { value: 'website', label: 'Website' },
    { value: 'mobile_app', label: 'Mobile App' },
    { value: 'customer_support', label: 'Customer Support' },
    { value: 'email', label: 'Email Communication' },
    { value: 'social_media', label: 'Social Media' },
  ];
  
  const features = [
    { value: 'search', label: 'Venue Search' },
    { value: 'booking', label: 'Booking Process' },
    { value: 'payment', label: 'Payment System' },
    { value: 'dashboard', label: 'Dashboard & Account' },
    { value: 'communication', label: 'Communication Tools' },
    { value: 'mobile', label: 'Mobile Experience' },
    { value: 'recommendations', label: 'Venue Recommendations' },
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleRatingChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFeatureToggle = (feature) => {
    const updatedFeatures = formData.specificFeatures.includes(feature)
      ? formData.specificFeatures.filter(f => f !== feature)
      : [...formData.specificFeatures, feature];
    
    setFormData({
      ...formData,
      specificFeatures: updatedFeatures,
    });
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In a real app, you would make an API call to submit feedback
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      setFeedbackSent(true);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        ...formData,
        feedback: '',
        feedbackType: 'general',
        source: 'website',
        ratingGeneral: 0,
        ratingEase: 0,
        ratingSupport: 0,
        specificFeatures: [],
      });
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Failed to submit feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSuccess(false);
  };
  
  return (
    <>
      <PageHeader
        title="Share Your Feedback"
        subtitle="Help us improve your EventHub experience"
        background="gradient"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {feedbackSent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 4,
                maxWidth: 700,
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <VolunteerActivismIcon sx={{ fontSize: 48 }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Thank You for Your Feedback!
              </Typography>
              <Typography variant="body1" paragraph>
                Your input is invaluable to us. We carefully review all feedback to improve EventHub and make it better for everyone.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                {formData.contactConsent ? 'A member of our team may reach out to you for more details if needed.' : 'If you have more to share, please don\'t hesitate to reach out again.'}
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/"
                  >
                    Return to Home
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => setFeedbackSent(false)}
                  >
                    Submit Another Feedback
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        ) : (
          <Grid container spacing={4}>
            {/* Feedback Form */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={0}
                  variant="outlined"
                  sx={{ p: 4, borderRadius: 3 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FeedbackIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                    <Typography variant="h5" fontWeight="bold">
                      Your Feedback Matters
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" paragraph>
                    We're committed to making EventHub the best platform for venue discovery and booking. Your feedback is essential to help us understand what we're doing well and where we can improve.
                  </Typography>
                  
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* User Info */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          type="email"
                          label="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      
                      {/* Feedback Type */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          select
                          label="Feedback Type"
                          name="feedbackType"
                          value={formData.feedbackType}
                          onChange={handleChange}
                        >
                          {feedbackTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      
                      {/* Source */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          select
                          label="Which part of EventHub are you giving feedback on?"
                          name="source"
                          value={formData.source}
                          onChange={handleChange}
                        >
                          {sources.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      
                      {/* Overall Satisfaction Rating */}
                      <Grid item xs={12}>
                        <Divider sx={{ mb: 2 }}>
                          <Chip label="Ratings" />
                        </Divider>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Paper 
                          variant="outlined" 
                          sx={{ 
                            p: 3, 
                            borderRadius: 3, 
                            bgcolor: alpha(theme.palette.primary.main, 0.02),
                            mb: 2
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
                            How would you rate your overall experience with EventHub?
                          </Typography>
                          <CustomRating 
                            value={formData.ratingGeneral} 
                            onChange={(value) => handleRatingChange('ratingGeneral', value)}
                          />
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                          <Typography variant="subtitle1" align="center" gutterBottom>
                            Ease of Use
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Rating
                              value={formData.ratingEase}
                              onChange={(event, value) => handleRatingChange('ratingEase', value)}
                              size="large"
                            />
                          </Box>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                          <Typography variant="subtitle1" align="center" gutterBottom>
                            Customer Support
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Rating
                              value={formData.ratingSupport}
                              onChange={(event, value) => handleRatingChange('ratingSupport', value)}
                              size="large"
                            />
                          </Box>
                        </Paper>
                      </Grid>
                      
                      {/* Specific Features */}
                      <Grid item xs={12}>
                        <Divider sx={{ mb: 2 }}>
                          <Chip label="Features" />
                        </Divider>
                        <Typography variant="subtitle1" gutterBottom>
                          Which specific features are you providing feedback about? (Optional)
                        </Typography>
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                          {features.map((feature) => (
                            <Grid item key={feature.value}>
                              <Chip
                                label={feature.label}
                                onClick={() => handleFeatureToggle(feature.value)}
                                variant={formData.specificFeatures.includes(feature.value) ? 'filled' : 'outlined'}
                                color={formData.specificFeatures.includes(feature.value) ? 'primary' : 'default'}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                      
                      {/* Feedback Text */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          label="Your Feedback"
                          name="feedback"
                          value={formData.feedback}
                          onChange={handleChange}
                          multiline
                          rows={6}
                          placeholder="Please share your thoughts, ideas, suggestions, or report issues you've encountered..."
                        />
                      </Grid>
                      
                      {/* Contact Permission */}
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.contactConsent}
                              onChange={handleCheckboxChange}
                              name="contactConsent"
                            />
                          }
                          label="EventHub may contact me regarding this feedback if needed"
                        />
                      </Grid>
                      
                      {/* Submit Button */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <LoadingButton
                            type="submit"
                            variant="contained"
                            size="large"
                            loading={loading}
                            startIcon={<SendIcon />}
                          >
                            Submit Feedback
                          </LoadingButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </motion.div>
            </Grid>
            
            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box sx={{ position: 'sticky', top: 24 }}>
                  {/* Why Feedback Matters */}
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Why Your Feedback Matters
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Your feedback directly influences our product development roadmap and helps us prioritize features that matter most to our users.
                    </Typography>
                    <Box 
                      component="img" 
                      src="/img/feedback-illustration.svg" 
                      alt="Feedback" 
                      sx={{ 
                        width: '100%', 
                        height: 'auto',
                        mb: 2
                      }} 
                    />
                    <Typography variant="body2">
                      Last year, we implemented 73% of user-suggested features and fixed 94% of reported issues within 30 days.
                    </Typography>
                  </Paper>
                  
                  {/* Recent Improvements */}
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3, mb: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Recent Improvements from User Feedback
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          {/* <Check */}
                        </ListItemIcon>
                        <ListItemText 
                          primary="Enhanced Search Filtering" 
                          secondary="Added more granular filters for venue amenities and features" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {/* <CheckCircleIcon color="success" /> */}
                        </ListItemIcon>
                        <ListItemText 
                          primary="Streamlined Booking Process" 
                          secondary="Reduced the booking steps from 5 to 3" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {/* <CheckCircleIcon color="success" /> */}
                        </ListItemIcon>
                        <ListItemText 
                          primary="Mobile App Improvements" 
                          secondary="Redesigned calendar interface for better usability" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {/* <CheckCircleIcon color="success" /> */}
                        </ListItemIcon>
                        <ListItemText 
                          primary="Communication Tools" 
                          secondary="Added in-app messaging between venue owners and event organizers" 
                        />
                      </ListItem>
                    </List>
                  </Paper>
                  
                  {/* Contact Support */}
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 3 }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Need Immediate Assistance?
                    </Typography>
                    <Typography variant="body2" paragraph>
                      For urgent matters or technical support, please contact our support team directly:
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Email
                      </Typography>
                      <Typography variant="body2">
                        support@eventhub.com
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Phone
                      </Typography>
                      <Typography variant="body2">
                        +1 (800) 555-1234
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="outlined"
                      component={RouterLink}
                      to="/contact"
                      sx={{ mt: 3 }}
                    >
                      Contact Support
                    </Button>
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        )}
      </Container>
      
      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your feedback has been submitted successfully. Thank you!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Feedback;