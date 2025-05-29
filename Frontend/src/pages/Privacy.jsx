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
  Grid,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PrintIcon from '@mui/icons-material/Print';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import { motion } from 'framer-motion';

import PageHeader from '../components/common/PageHeader';

const Privacy = () => {
  const theme = useTheme();
  const currentDate = new Date("2025-05-28 21:56:22");
  
  // Format the date as Month DD, YYYY
  const lastUpdated = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle page printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information"
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
            <Typography color="text.primary">Privacy Policy</Typography>
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
                At EventHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
              </Typography>
              <Typography variant="body1" paragraph>
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
              </Typography>
            </Box>
            
            {/* Table of Contents */}
            <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Table of Contents
              </Typography>
              <List dense>
                <ListItem button component="a" href="#collection">
                  <ListItemText primary="1. Information We Collect" />
                </ListItem>
                <ListItem button component="a" href="#useofinformation">
                  <ListItemText primary="2. Use of Your Information" />
                </ListItem>
                <ListItem button component="a" href="#disclosure">
                  <ListItemText primary="3. Disclosure of Your Information" />
                </ListItem>
                <ListItem button component="a" href="#security">
                  <ListItemText primary="4. Security of Your Information" />
                </ListItem>
                <ListItem button component="a" href="#tracking">
                  <ListItemText primary="5. Tracking Technologies" />
                </ListItem>
                <ListItem button component="a" href="#thirdparty">
                  <ListItemText primary="6. Third-Party Websites" />
                </ListItem>
                <ListItem button component="a" href="#yourrights">
                  <ListItemText primary="7. Your Privacy Rights" />
                </ListItem>
                <ListItem button component="a" href="#contactus">
                  <ListItemText primary="8. Contact Us" />
                </ListItem>
              </List>
            </Paper>
            
            {/* Section 1 */}
            <Box id="collection" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                1. Information We Collect
              </Typography>
              <Typography variant="body1" paragraph>
                We may collect information about you in a variety of ways. The information we collect may include:
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1.1 Personal Data
              </Typography>
              <Typography variant="body1" paragraph>
                Personally identifiable information that you voluntarily provide to us when registering for an account, making a booking, or otherwise interacting with our services, such as:
              </Typography>
              <Typography component="div" variant="body1" paragraph sx={{ pl: 3 }}>
                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Telephone number</li>
                  <li>Postal address</li>
                  <li>Payment information</li>
                  <li>Profile photo (if provided)</li>
                  <li>Company or organization name (for venue owners)</li>
                </ul>
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1.2 Derivative Data
              </Typography>
              <Typography variant="body1" paragraph>
                Information our servers automatically collect when you access our services, such as:
              </Typography>
              <Typography component="div" variant="body1" paragraph sx={{ pl: 3 }}>
                <ul>
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Operating system</li>
                  <li>Access times</li>
                  <li>Pages viewed</li>
                  <li>Links clicked</li>
                  <li>The page you visited before navigating to our services</li>
                </ul>
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1.3 Financial Data
              </Typography>
              <Typography variant="body1" paragraph>
                Financial information, such as data related to your payment method (e.g., credit card number, expiration date, security code) that we collect when you make a booking or register as a venue owner. We store only limited financial information; most payment data is transmitted directly to our payment processors.
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1.4 Location Data
              </Typography>
              <Typography variant="body1" paragraph>
                Information about your location, including:
              </Typography>
              <Typography component="div" variant="body1" paragraph sx={{ pl: 3 }}>
                <ul>
                  <li>Location information based on your IP address</li>
                  <li>Precise location data when you allow our mobile app to access your device's location</li>
                  <li>Location information you provide when searching for venues</li>
                </ul>
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1.5 Mobile Device Data
              </Typography>
              <Typography variant="body1" paragraph>
                Information from your mobile device, including:
              </Typography>
              <Typography component="div" variant="body1" paragraph sx={{ pl: 3 }}>
                <ul>
                  <li>Device type</li>
                  <li>Operating system</li>
                  <li>Unique device ID</li>
                  <li>Mobile network information</li>
                </ul>
              </Typography>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Section 2 */}
            <Box id="useofinformation" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                2. Use of Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
              </Typography>
              <Typography component="div" variant="body1" paragraph sx={{ pl: 3 }}>
                <ul>
                  <li>Create and manage your account</li>
                  <li>Process bookings and payments</li>
                  <li>Send you administrative notifications and service-related messages</li>
                  <li>Respond to your comments, questions, and support requests</li>
                  <li>Enable venue owners and event organizers to communicate regarding bookings</li>
                  <li>Fulfill and manage your bookings and other transactions</li>
                  <li>Send you marketing and promotional communications (with opt-out options)</li>
                  <li>Personalize your experience and deliver content relevant to your interests</li>
                  <li>Develop and improve our services, website, and mobile applications</li>
                  <li>Identify usage trends and analyze the effectiveness of our marketing campaigns</li>
                  <li>Prevent fraudulent transactions and monitor for suspicious activities</li>
                  <li>Comply with our legal obligations</li>
                </ul>
              </Typography>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Section 3 */}
            <Box id="disclosure" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                3. Disclosure of Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                3.1 By Law or to Protect Rights
              </Typography>
              <Typography variant="body1" paragraph>
                We may disclose your information where we are legally required to do so to comply with applicable law, governmental requests, judicial proceedings, court orders, or legal processes. We may also disclose your information to protect the rights, property, or safety of EventHub, our users, or others.
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                3.2 Business Partners
              </Typography>
              <Typography variant="body1" paragraph>
                We may share your information with our business partners to offer you certain products, services, or promotions they provide that may complement our services.
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                3.3 Between Users
              </Typography>
              <Typography variant="body1" paragraph>
                When you book a venue, we share certain information with the venue owner to facilitate the booking. Similarly, venue owners receive information about event organizers who book their venues. The shared information typically includes name, contact details, and booking-related information.
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                3.4 Third-Party Service Providers
              </Typography>
              <Typography variant="body1" paragraph>
                We may share your information with third parties that perform services for us or on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                3.5 Marketing Communications
              </Typography>
              <Typography variant="body1" paragraph>
                With your consent, or with an opportunity to opt out, we may share your information with third parties for marketing purposes.
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                3.6 Business Transfers
              </Typography>
              <Typography variant="body1" paragraph>
                If EventHub is involved in a merger, acquisition, asset sale, or bankruptcy, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our website of any change in ownership or uses of your personal information, as well as any choices you may have regarding your personal information.
              </Typography>
            </Box>
            
            {/* More sections would be included here... */}
            <Divider sx={{ my: 4 }} />
            
            {/* Security Section with Icon */}
            <Box id="security" sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                <Typography variant="h5" fontWeight="bold">
                  4. Security of Your Information
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </Typography>
              <Typography variant="body1" paragraph>
                Some of our security practices include:
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LockIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Encryption
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      All sensitive data transmitted to and from our services is encrypted using industry-standard SSL/TLS protocols.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LockIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Secure Storage
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Your data is stored in secure data centers with multiple layers of physical and electronic security measures.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LockIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Access Controls
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      We implement strict access controls to limit employee access to your personal data on a need-to-know basis.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LockIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Regular Audits
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      We conduct regular security audits and assessments to identify and address potential vulnerabilities.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Typography variant="body1">
                Any security breach that compromises your personal information will be disclosed to you in accordance with applicable laws.
              </Typography>
            </Box>
            
            {/* Contact Information */}
            <Box id="contactus" sx={{ mt: 6 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                8. Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </Typography>
              <Typography variant="body1" paragraph>
                EventHub, Inc.<br />
                Attn: Privacy Officer<br />
                123 Tech Plaza, 10th Floor<br />
                New York, NY 10001<br />
                Email: privacy@eventhub.com<br />
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
                to="/terms"
                sx={{ py: 1.5 }}
              >
                Terms of Service
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

export default Privacy;