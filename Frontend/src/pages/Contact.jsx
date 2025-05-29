import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BusinessIcon from '@mui/icons-material/Business';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { motion } from 'framer-motion';

import PageHeader from '../components/common/PageHeader';

const Contact = () => {
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In a real app, you would make an API call to send the form
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general',
      });
      
      // Reset success message after 8 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 8000);
    } catch (err) {
      setError('Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'billing', label: 'Billing Question' },
  ];
  
  const officeLocations = [
    {
      city: 'New York',
      address: '123 Tech Plaza, 10th Floor, New York, NY 10001',
      phone: '+1 (212) 555-7890',
      email: 'newyork@eventhub.com',
    },
    {
      city: 'San Francisco',
      address: '456 Innovation Drive, Suite 300, San Francisco, CA 94105',
      phone: '+1 (415) 555-1234',
      email: 'sanfrancisco@eventhub.com',
    },
    {
      city: 'Chicago',
      address: '789 Lakeside Tower, 15th Floor, Chicago, IL 60611',
      phone: '+1 (312) 555-4321',
      email: 'chicago@eventhub.com',
    },
  ];
  
  const supportCategories = [
    {
      title: 'Customer Support',
      icon: <SupportAgentIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      description: 'Questions about your booking or account',
      email: 'support@eventhub.com',
      phone: '+1 (800) 555-9876',
      hours: '24/7',
    },
    {
      title: 'Venue Partners',
      icon: <BusinessIcon fontSize="large" sx={{ color: theme.palette.secondary.main }} />,
      description: 'Support for venue owners and managers',
      email: 'venues@eventhub.com',
      phone: '+1 (800) 555-5678',
      hours: 'Mon-Fri: 9am-6pm EST',
    },
    {
      title: 'Technical Help',
      icon: <HelpCenterIcon fontSize="large" sx={{ color: theme.palette.info.main }} />,
      description: 'Website or app technical difficulties',
      email: 'tech@eventhub.com',
      phone: '+1 (800) 555-1234',
      hours: 'Mon-Fri: 8am-8pm EST',
    },
  ];

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team for support, feedback, or partnership inquiries"
        background="gradient"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Contact Form and Info */}
        <Grid container spacing={5}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper 
                elevation={0}
                variant="outlined"
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Send Us a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Fill out the form below and our team will get back to you within 24 hours.
                </Typography>
                
                {success && (
                  <Alert severity="success" sx={{ mb: 4 }}>
                    Your message has been sent successfully! We'll get back to you shortly.
                  </Alert>
                )}
                
                {error && (
                  <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        select
                        label="Inquiry Type"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        variant="outlined"
                      >
                        {inquiryTypes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={6}
                        variant="outlined"
                        placeholder="How can we help you?"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        loading={loading}
                        endIcon={<SendIcon />}
                        sx={{ py: 1.5, px: 4 }}
                      >
                        Send Message
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12} md={5} minWidth={'100%'}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper 
                elevation={0}
                variant="outlined"
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  backgroundColor: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Contact Information
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <EmailIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          info@eventhub.com
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <PhoneIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Phone
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          +1 (800) 555-1234
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <LocationOnIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Headquarters
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          123 Tech Plaza, 10th Floor<br />
                          New York, NY 10001<br />
                          United States
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                
                
                
                
                
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Support Categories */}
        <Box sx={{ mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
              How Can We Help You?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph textAlign="center" sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}>
              Our team is here to help! Reach out to the appropriate department for faster assistance.
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {supportCategories.map((category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    elevation={0}
                    variant="outlined"
                    sx={{ 
                      p: 3,
                      borderRadius: 4,
                      height: '100%',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Box 
                          sx={{ 
                            mb: 2, 
                            p: 2, 
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            borderRadius: '50%',
                          }}
                        >
                          {category.icon}
                        </Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {category.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {category.description}
                        </Typography>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">Email:</Typography>
                            <Typography variant="body2" fontWeight="medium">{category.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">Phone:</Typography>
                            <Typography variant="body2" fontWeight="medium">{category.phone}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Hours:</Typography>
                            <Typography variant="body2" fontWeight="medium">{category.hours}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
    
        {/* Map */}
        <Box sx={{ mt: 8 }}>
          <Paper 
            elevation={0}
            variant="outlined"
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden',
              height: 500,
            }}
          >
            <iframe 
              title="EventHub Locations"
              width="100%" 
              height="100%" 
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1590285051335!5m2!1sen!2sca"
              allowFullScreen
            ></iframe>
          </Paper>
        </Box>
        
        {/* FAQ Teaser */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Have More Questions?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}>
              Check out our frequently asked questions for quick answers to common inquiries
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              href="/contact"
              sx={{ py: 1.5, px: 4 }}
            >
              Contact Us
            </Button>
          </motion.div>
        </Box>
      </Container>
    </>
  );
};

export default Contact;