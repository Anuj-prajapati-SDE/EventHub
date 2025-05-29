import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Grid,
  Divider,
  useTheme,
  alpha,
  Tabs,
  Tab,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { motion } from 'framer-motion';

import PageHeader from '../components/common/PageHeader';

const FAQ = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const [expanded, setExpanded] = useState(false);
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };
  
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  // FAQ categories
  const categories = [
    'General Questions',
    'Booking & Payments',
    'Venue Owners',
    'Account & Profile',
    'Technical Support',
  ];
  
  // FAQ entries
  const faqs = [
    {
      category: 0, // General Questions
      question: 'What is EventHub?',
      answer: 'EventHub is a platform that connects event organizers with venue owners, simplifying the process of finding and booking venues for events. Our platform leverages the A* search algorithm to match users with venues that perfectly suit their specific needs and preferences.',
    },
    {
      category: 0,
      question: 'How does EventHub work?',
      answer: 'EventHub works in three simple steps: First, search for venues using our smart filters (location, capacity, amenities, etc.). Second, browse detailed profiles, photos, and availability for each venue. Third, book and pay securely through our platform to confirm your reservation.',
    },
    {
      category: 0,
      question: 'Is EventHub available in my area?',
      answer: 'EventHub is currently available in 30+ major cities across the United States, with plans for international expansion. Check our venue search page and filter by your location to see venues available in your area.',
    },
    {
      category: 1, // Booking & Payments
      question: 'How do I book a venue?',
      answer: 'To book a venue, browse our listings and select a venue that meets your requirements. Check available dates on the venue calendar, then click "Book Now" to initiate the booking process. Follow the prompts to select your date, time, and additional services, then complete payment to confirm your reservation.',
    },
    {
      category: 1,
      question: 'What payment methods do you accept?',
      answer: 'EventHub accepts all major credit and debit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for certain bookings. All payments are securely processed through our platform using industry-standard encryption.',
    },
    {
      category: 1,
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by venue. Each venue listing includes specific cancellation terms, which typically range from full refunds for cancellations made 30+ days before the event to partial or no refunds for last-minute cancellations. Always review the venue\'s cancellation policy before booking.',
    },
    {
      category: 1,
      question: 'Are there any additional fees?',
      answer: 'EventHub charges a service fee of 5% on all bookings, which is included in the total price shown during checkout. Some venues may have additional fees for services like setup, cleanup, or equipment rental, which will be clearly listed on the venue profile.',
    },
    {
      category: 2, // Venue Owners
      question: 'How do I list my venue on EventHub?',
      answer: 'To list your venue, create a venue owner account and click "Add Venue" from your dashboard. Complete the venue profile with details, photos, pricing, and availability. Once submitted, our team will review your listing, and upon approval, it will be published on our platform.',
    },
    {
      category: 2,
      question: 'How much does it cost to list my venue?',
      answer: 'Listing your venue on EventHub is free. We operate on a commission-based model, where we collect a percentage of each booking made through our platform. There are no upfront fees or monthly subscriptions required.',
    },
    {
      category: 2,
      question: 'How do I receive payments for bookings?',
      answer: 'Once a booking is confirmed, EventHub holds the payment until 24 hours after the event concludes successfully. Funds are then transferred to your designated bank account or payment method. You can view your earnings and pending transfers in your venue owner dashboard.',
    },
    {
      category: 3, // Account & Profile
      question: 'How do I create an account?',
      answer: 'To create an account, click "Register" in the top right corner of our website. Fill out the registration form with your name, email, and password. Choose between an "Event Organizer" or "Venue Owner" account type, then verify your email to activate your account.',
    },
    {
      category: 3,
      question: 'How do I reset my password?',
      answer: 'To reset your password, click "Login" in the top right corner, then select "Forgot Password?" Enter the email associated with your account, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
    },
    {
      category: 3,
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account by going to your profile settings and selecting "Delete Account" at the bottom of the page. Note that this action is permanent and will remove all your data from our system, including booking history and saved venues.',
    },
    {
      category: 4, // Technical Support
      question: 'The website is not loading properly. What should I do?',
      answer: 'If the website is not loading properly, try clearing your browser cache and cookies, then reload the page. Also, ensure you\'re using a supported browser (latest versions of Chrome, Firefox, Safari, or Edge). If the issue persists, contact our technical support team.',
    },
    {
      category: 4,
      question: 'I\'m having trouble with the booking calendar. What should I do?',
      answer: 'If you\'re experiencing issues with the booking calendar, try switching browsers or disabling browser extensions that might interfere with JavaScript. If the problem continues, note the specific venue and dates you\'re trying to book, then contact our support team with these details.',
    },
    {
      category: 4,
      question: 'How do I report a technical issue or bug?',
      answer: 'To report a technical issue or bug, go to our Contact page and select "Technical Support" from the inquiry type dropdown. Provide details about the issue, including what device and browser you\'re using, the steps to reproduce the problem, and any error messages you\'re seeing.',
    },
  ];
  
  // Filter FAQs based on search and active category
  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === faq.category || activeCategory === -1) &&
    (searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about EventHub"
        background="gradient"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ maxWidth: 700, mx: 'auto', mb: 8 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
              How can we help you?
            </Typography>
            <TextField
              fullWidth
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={handleSearch}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, py: 0.5 },
              }}
            />
          </Box>
        </motion.div>
        
        {/* FAQ Categories Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={activeCategory} 
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="FAQ categories"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            {categories.map((category, index) => (
              <Tab 
                key={index}
                label={category} 
                value={index}
                sx={{ fontWeight: activeCategory === index ? 'bold' : 'normal' }}
              />
            ))}
            <Tab 
              label="All Categories" 
              value={-1}
              sx={{ fontWeight: activeCategory === -1 ? 'bold' : 'normal' }}
            />
          </Tabs>
        </Box>
        
        {/* FAQ Accordions */}
        <Box sx={{ mb: 8 }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Accordion 
                  expanded={expanded === `panel${index}`} 
                  onChange={handleAccordionChange(`panel${index}`)}
                  sx={{ 
                    mb: 2, 
                    borderRadius: '12px !important',
                    overflow: 'hidden',
                    '&:before': {
                      display: 'none',
                    },
                    boxShadow: expanded === `panel${index}` ? 2 : 0,
                    border: `1px solid ${expanded === `panel${index}` ? theme.palette.primary.main : theme.palette.divider}`,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                    sx={{
                      backgroundColor: expanded === `panel${index}` ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={expanded === `panel${index}` ? 'bold' : 'medium'}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {faq.answer}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Was this answer helpful?
                      </Typography>
                      <Box>
                        <Button size="small">Yes</Button>
                        <Button size="small">No</Button>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))
          ) : (
            <Paper 
              variant="outlined" 
              sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}
            >
              <Typography variant="h6" gutterBottom>
                No FAQs found
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We couldn't find any FAQs matching your search query. Try different keywords or browse all categories.
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(-1);
                }}
              >
                Clear Filters
              </Button>
            </Paper>
          )}
        </Box>
        
        {/* Support Options */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Still Need Help?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph textAlign="center" sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}>
            Can't find what you're looking for? Check our resources or contact our support team for assistance
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={0}
                  variant="outlined"
                  sx={{ 
                    p: 4, 
                    borderRadius: 4, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <BookmarkBorderIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Knowledge Base
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Browse our detailed knowledge base for tutorials, guides, and in-depth articles on using EventHub effectively.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" paragraph>
                    Our knowledge base covers topics including:
                  </Typography>
                  <ul>
                    <li><Typography variant="body2">Getting started guides</Typography></li>
                    <li><Typography variant="body2">Venue booking tips</Typography></li>
                    <li><Typography variant="body2">Payment and refund policies</Typography></li>
                    <li><Typography variant="body2">Platform features overview</Typography></li>
                  </ul>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button 
                    variant="outlined" 
                    component={RouterLink} 
                    to="/knowledge-base"
                    sx={{ mt: 3, alignSelf: 'flex-start' }}
                  >
                    Visit Knowledge Base
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Paper
                  elevation={0}
                  variant="outlined"
                  sx={{ 
                    p: 4, 
                    borderRadius: 4, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ContactSupportIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 2 }} />
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Contact Support
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Get personalized assistance from our support team. We're here to help with any questions or issues.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Email Support
                      </Typography>
                      <Typography variant="body2" paragraph>
                        support@eventhub.com
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Response Time
                      </Typography>
                      <Typography variant="body2">
                        Within 24 hours
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Phone Support
                      </Typography>
                      <Typography variant="body2" paragraph>
                        +1 (800) 555-1234
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Hours
                      </Typography>
                      <Typography variant="body2">
                        Mon-Fri: 9AM-6PM EST
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button 
                    variant="contained" 
                    component={RouterLink} 
                    to="/contact"
                    sx={{ mt: 3, alignSelf: 'flex-start' }}
                  >
                    Contact Us
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
        
        {/* Popular Topics */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            Popular Topics
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph textAlign="center" sx={{ mb: 4 }}>
            Quick links to our most frequently viewed help articles
          </Typography>
          <Grid container spacing={2}>
            {[
              'How to Create an Account',
              'Finding the Perfect Venue',
              'Booking Process Overview',
              'Payment Methods',
              'Cancellation Policies',
              'Venue Owner Guidelines',
              'Technical Requirements',
              'Privacy & Security'
            ].map((topic, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Paper
                    variant="outlined"
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 3,
                      cursor: 'pointer',
                      height: '100%',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      }
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="medium">
                      {topic}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Feedback Section */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Help Us Improve
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              Your feedback helps us improve our support resources. Let us know what other topics you'd like to see covered.
            </Typography>
            <Button variant="contained" component={RouterLink} to="/feedback">
              Submit Feedback
            </Button>
          </motion.div>
        </Box>
      </Container>
    </>
  );
};

export default FAQ;