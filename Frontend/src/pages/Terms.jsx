import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Link,
  Breadcrumbs,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Grid,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PrintIcon from '@mui/icons-material/Print';
import { motion } from 'framer-motion';

import PageHeader from '../components/common/PageHeader';

const Terms = () => {
  const theme = useTheme();
  const currentDate = new Date("2025-05-28 21:56:22");
  
  // Format the date as Month DD, YYYY
  const lastUpdated = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Function to handle page printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <PageHeader
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our platform"
        background="light"
        height="small"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs and document info */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link component={RouterLink} underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Link component={RouterLink} underline="hover" color="inherit" to="/legal">
              Legal
            </Link>
            <Typography color="text.primary">Terms of Service</Typography>
          </Breadcrumbs>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Last Updated: {lastUpdated}
            </Typography>
            <Button
              startIcon={<PrintIcon />}
              size="small"
              onClick={handlePrint}
              sx={{ ml: 2 }}
            >
              Print
            </Button>
          </Box>
        </Box>
        
        {/* Document Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={0} variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
            {/* Introduction */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" paragraph>
                These Terms of Service ("Terms") govern your access to and use of the EventHub platform, including our website, mobile applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              </Typography>
              <Typography variant="body1" paragraph>
                Please read these Terms carefully. If you do not agree with these Terms, you may not access or use our Services. EventHub reserves the right to modify these Terms at any time. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
              </Typography>
            </Box>
            
            {/* Table of Contents */}
            <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Table of Contents
              </Typography>
              <List dense>
                <ListItem button component="a" href="#definitions">
                  <ListItemText primary="1. Definitions" />
                </ListItem>
                <ListItem button component="a" href="#accountregistration">
                  <ListItemText primary="2. Account Registration and Requirements" />
                </ListItem>
                <ListItem button component="a" href="#userconduct">
                  <ListItemText primary="3. User Conduct and Prohibited Activities" />
                </ListItem>
                <ListItem button component="a" href="#bookingprocess">
                  <ListItemText primary="4. Booking Process and Payments" />
                </ListItem>
                <ListItem button component="a" href="#cancellationpolicy">
                  <ListItemText primary="5. Cancellation and Refund Policy" />
                </ListItem>
                <ListItem button component="a" href="#venueowners">
                  <ListItemText primary="6. Venue Owner Obligations" />
                </ListItem>
                <ListItem button component="a" href="#intellectualproperty">
                  <ListItemText primary="7. Intellectual Property Rights" />
                </ListItem>
                <ListItem button component="a" href="#limitation">
                  <ListItemText primary="8. Limitation of Liability" />
                </ListItem>
                <ListItem button component="a" href="#indemnification">
                  <ListItemText primary="9. Indemnification" />
                </ListItem>
                <ListItem button component="a" href="#termination">
                  <ListItemText primary="10. Termination of Services" />
                </ListItem>
                <ListItem button component="a" href="#disputes">
                  <ListItemText primary="11. Dispute Resolution" />
                </ListItem>
                <ListItem button component="a" href="#general">
                  <ListItemText primary="12. General Provisions" />
                </ListItem>
              </List>
            </Paper>
            
            {/* Section 1 */}
            <Box id="definitions" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                1. Definitions
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>"EventHub"</strong> refers to EventHub, Inc., the company that operates the EventHub platform.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>"User"</strong> refers to any individual who accesses or uses the EventHub Services, including Event Organizers and Venue Owners.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>"Event Organizer"</strong> refers to a User who books or seeks to book a venue through the Services.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>"Venue Owner"</strong> refers to a User who lists their venue on the Services for booking.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>"Venue"</strong> refers to any space listed on the Services that is available for booking by Event Organizers.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>"Booking"</strong> refers to the reservation of a Venue by an Event Organizer through the Services.
              </Typography>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Section 2 */}
            <Box id="accountregistration" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                2. Account Registration and Requirements
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>2.1 Account Creation:</strong> To access certain features of the Services, you must create an account. When registering, you agree to provide accurate, current, and complete information about yourself.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>2.2 Account Types:</strong> EventHub offers different types of accounts, including Event Organizer accounts and Venue Owner accounts. Each account type has specific features, capabilities, and requirements.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>2.3 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify EventHub immediately of any unauthorized use of your account or any other breach of security.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>2.4 Age Requirement:</strong> You must be at least 18 years old to create an account and use the Services. By creating an account, you represent and warrant that you are 18 years of age or older.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>2.5 Account Verification:</strong> EventHub may require additional verification of your identity or business information, particularly for Venue Owner accounts. You agree to provide any requested documentation to verify your identity or business information.
              </Typography>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Section 3 */}
            <Box id="userconduct" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                3. User Conduct and Prohibited Activities
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>3.1 General Conduct:</strong> You agree to use the Services in compliance with all applicable laws, regulations, and these Terms. You are solely responsible for your conduct while using the Services.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>3.2 Prohibited Activities:</strong> You may not use the Services to:
              </Typography>
              <Typography component="div" variant="body1" paragraph sx={{ pl: 3 }}>
                <ul>
                  <li>Violate any applicable law, regulation, or third-party rights</li>
                  <li>Post false, misleading, or deceptive content</li>
                  <li>Engage in fraudulent activities</li>
                  <li>Collect or harvest personal information about other users</li>
                  <li>Use the Services for any illegal purpose or to plan or promote illegal activities</li>
                  <li>Transmit viruses, malware, or other harmful computer code</li>
                  <li>Attempt to gain unauthorized access to EventHub systems or user accounts</li>
                  <li>Interfere with or disrupt the Services or servers connected to the Services</li>
                  <li>Circumvent any technological measures implemented to protect the Services</li>
                </ul>
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>3.3 Content Standards:</strong> Any content you post or submit through the Services must not:
              </Typography>
              <Typography component="div" variant="body1" paragraph sx={{ pl: 3 }}>
                <ul>
                  <li>Infringe on intellectual property rights</li>
                  <li>Contain defamatory, obscene, or offensive material</li>
                  <li>Promote discrimination, bigotry, racism, hatred, or violence</li>
                  <li>Contain sexually explicit material or promote sexually explicit services</li>
                  <li>Promote illegal activities or substances</li>
                </ul>
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>3.4 Monitoring and Enforcement:</strong> EventHub has the right (but not the obligation) to monitor the Services for violations of these Terms. EventHub may take appropriate action against any user who violates these Terms, including removing content, suspending or terminating accounts, and reporting violations to law enforcement authorities.
              </Typography>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Section 4 */}
            <Box id="bookingprocess" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                4. Booking Process and Payments
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>4.1 Booking Creation:</strong> Event Organizers may create bookings for venues through the Services. By creating a booking, the Event Organizer agrees to pay all applicable fees associated with the booking.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>4.2 Booking Confirmation:</strong> A booking is not final until confirmed by the Venue Owner and payment is processed through the Services. EventHub will provide confirmation of confirmed bookings to both the Event Organizer and the Venue Owner.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>4.3 Payments:</strong> All payments must be made through the Services using the payment methods accepted by EventHub. Event Organizers agree to pay all fees and applicable taxes associated with bookings.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>4.4 Service Fees:</strong> EventHub charges service fees for using the Services. These fees are included in the total amount shown during the booking process and will be clearly disclosed before payment is made.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>4.5 Payment Processing:</strong> EventHub uses third-party payment processors to process payments. By using the Services, you agree to the terms and privacy policies of these payment processors.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>4.6 Payment to Venue Owners:</strong> EventHub will remit payment to Venue Owners in accordance with the payment schedule and terms agreed upon when the Venue Owner registered for the Services, less any applicable fees.
              </Typography>
            </Box>
            
            {/* More sections would be included here... */}
            <Divider sx={{ my: 4 }} />
            
            <Box id="cancellationpolicy" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                5. Cancellation and Refund Policy
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>5.1 Venue Owner Cancellation Policies:</strong> Each Venue Owner may set their own cancellation policy, which will be displayed on the venue listing. Event Organizers are responsible for reviewing and understanding the cancellation policy before making a booking.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>5.2 Event Organizer Cancellations:</strong> If an Event Organizer cancels a booking, the refund amount will be determined by the Venue Owner's cancellation policy. EventHub will process refunds in accordance with these policies.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>5.3 Venue Owner Cancellations:</strong> If a Venue Owner cancels a confirmed booking, the Event Organizer will receive a full refund of all fees paid. EventHub may also impose penalties on Venue Owners who cancel confirmed bookings without reasonable cause.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>5.4 Force Majeure:</strong> In the event of cancellations due to circumstances beyond reasonable control (such as natural disasters, government actions, or public emergencies), EventHub will work with both parties to reach a fair resolution, which may include full or partial refunds.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>5.5 Refund Processing:</strong> Refunds will be processed using the same payment method used for the original transaction. Processing times for refunds depend on the payment method and may take up to 10 business days.
              </Typography>
            </Box>
            
            {/* Contact Information */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about these Terms, please contact us at:
              </Typography>
              <Typography variant="body1" paragraph>
                EventHub, Inc.<br />
                123 Tech Plaza, 10th Floor<br />
                New York, NY 10001<br />
                Email: legal@eventhub.com<br />
                Phone: +1 (800) 555-1234
              </Typography>
            </Box>
          </Paper>
        </motion.div>
        
        {/* Related Documents */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Related Legal Documents
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/privacy"
                sx={{ py: 1.5 }}
              >
                Privacy Policy
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/cookies"
                sx={{ py: 1.5 }}
              >
                Cookie Policy
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/refund-policy"
                sx={{ py: 1.5 }}
              >
                Refund Policy
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Terms;