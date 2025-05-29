import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  Divider,
  Alert,
  Badge,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  alpha,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const UserProfile = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  // Profile info form state
  const [profileForm, setProfileForm] = useState({
    name: 'Anuj Prajapati',
    email: 'anuj.prajapati@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY, 10001',
  });
  
  // Password change form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bookingReminders: true,
    promotionalEmails: false,
    smsNotifications: true,
  });
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Reset form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (err) {
      console.error('Failed to change password', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update notification settings', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteAccount = () => {
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  const confirmDeleteAccount = async () => {
    // In a real app, you would make an API call to delete the account
    handleCloseDeleteDialog();
  };
  
  return (
    <>
      <PageHeader 
        title="User Profile" 
        subtitle="Manage your account settings and preferences" 
        background="gradient"
        height="small"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Sidebar - User Info */}
          <Grid item xs={12} md={4} lg={3}>
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          '&:hover': {
                            bgcolor: theme.palette.primary.dark,
                          },
                        }}
                      >
                        <CameraAltIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <Avatar
                      src=""
                      alt="Anuj Prajapati"
                      sx={{ width: 100, height: 100, border: `3px solid ${theme.palette.primary.main}` }}
                    />
                  </Badge>
                  <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                    {profileForm.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Event Organizer
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <EmailIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        Email
                      </Typography>
                      <Typography variant="body2">
                        {profileForm.email}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <PhoneIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        Phone
                      </Typography>
                      <Typography variant="body2">
                        {profileForm.phone}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        Address
                      </Typography>
                      <Typography variant="body2">
                        {profileForm.address}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Member since: January 15, 2025
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last login: May 28, 2025, 20:12:59 UTC
                  </Typography>
                </Box>
                
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  sx={{ mt: 3 }}
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </Paper>
            </motion.div>
          </Grid>
          
          {/* Main Content - Settings Tabs */}
          <Grid item xs={12} md={8} lg={9}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ borderRadius: 3 }}
              >
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ 
                    borderBottom: 1,
                    borderColor: 'divider',
                    px: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                  }}
                >
                  <Tab label="Profile Information" />
                  <Tab label="Change Password" />
                  <Tab label="Notification Settings" />
                </Tabs>
                
                <Box sx={{ p: 3 }}>
                  {/* Success message */}
                  {saveSuccess && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Changes saved successfully!
                    </Alert>
                  )}
                  
                  {/* Profile Information Tab */}
                  {activeTab === 0 && (
                    <Box component="form" onSubmit={handleProfileSubmit}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Edit Profile Information
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Update your personal information and contact details
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EditIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={profileForm.address}
                            onChange={handleProfileChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocationOnIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          component={RouterLink}
                          to="/dashboard"
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          loading={loading}
                          startIcon={<SaveIcon />}
                        >
                          Save Changes
                        </LoadingButton>
                      </Box>
                    </Box>
                  )}
                  
                  {/* Change Password Tab */}
                  {activeTab === 1 && (
                    <Box component="form" onSubmit={handlePasswordSubmit}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Change Password
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Update your password to keep your account secure
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Current Password"
                            name="currentPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="New Password"
                            name="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    edge="end"
                                  >
                                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordForm.confirmNewPassword}
                            onChange={handlePasswordChange}
                            error={passwordForm.newPassword !== passwordForm.confirmNewPassword && passwordForm.confirmNewPassword !== ''}
                            helperText={passwordForm.newPassword !== passwordForm.confirmNewPassword && passwordForm.confirmNewPassword !== '' ? 'Passwords do not match' : ''}
                          />
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          component={RouterLink}
                          to="/dashboard"
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          loading={loading}
                          startIcon={<SaveIcon />}
                          disabled={
                            !passwordForm.currentPassword ||
                            !passwordForm.newPassword ||
                            !passwordForm.confirmNewPassword ||
                            passwordForm.newPassword !== passwordForm.confirmNewPassword
                          }
                        >
                          Update Password
                        </LoadingButton>
                      </Box>
                    </Box>
                  )}
                  
                  {/* Notification Settings Tab */}
                  {activeTab === 2 && (
                    <Box component="form" onSubmit={handleNotificationSubmit}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Notification Preferences
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Manage your notification settings and preferences
                      </Typography>
                      
                      <Paper variant="outlined" sx={{ p: 3, mt: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                          Email Notifications
                        </Typography>
                        <Box sx={{ ml: 1 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={notificationSettings.emailNotifications}
                                onChange={handleNotificationChange}
                                name="emailNotifications"
                              />
                            }
                            label="Receive email notifications"
                          />
                          
                          <Box sx={{ ml: 3 }}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={notificationSettings.bookingReminders}
                                  onChange={handleNotificationChange}
                                  name="bookingReminders"
                                  disabled={!notificationSettings.emailNotifications}
                                />
                              }
                              label="Booking reminders"
                            />
                            
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={notificationSettings.promotionalEmails}
                                  onChange={handleNotificationChange}
                                  name="promotionalEmails"
                                  disabled={!notificationSettings.emailNotifications}
                                />
                              }
                              label="Promotional offers and updates"
                            />
                          </Box>
                        </Box>
                      </Paper>
                      
                      <Paper variant="outlined" sx={{ p: 3, mt: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                          SMS Notifications
                        </Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notificationSettings.smsNotifications}
                              onChange={handleNotificationChange}
                              name="smsNotifications"
                            />
                          }
                          label="Receive SMS notifications for bookings and reminders"
                        />
                      </Paper>
                      
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          component={RouterLink}
                          to="/dashboard"
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          loading={loading}
                          startIcon={<SaveIcon />}
                        >
                          Save Preferences
                        </LoadingButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Delete Account Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete your account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone. All of your data, including bookings and payment information, will be permanently deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={confirmDeleteAccount} color="error" autoFocus>
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default UserProfile;