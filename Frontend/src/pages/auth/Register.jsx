import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  useTheme,
  alpha,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import BusinessIcon from '@mui/icons-material/Business';
import Alert from '@mui/material/Alert';
import { motion } from 'framer-motion';

import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'event-organizer',
  });
  
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleCheckboxChange = (e) => {
    setAcceptTerms(e.target.checked);
    if (e.target.checked) {
      setFormErrors({
        ...formErrors,
        terms: '',
      });
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    };
    
    // First Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    // Terms validation
    if (!acceptTerms) {
      errors.terms = 'You must agree to the terms and conditions';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        accountType: formData.accountType,
      });
      
      // Redirect to login with success message
      navigate('/login', { 
        replace: true, 
        state: { registered: true }
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignup = () => {
    // Implement Google OAuth signup
    console.log('Google signup clicked');
  };
  
  const handleFacebookSignup = () => {
    // Implement Facebook OAuth signup
    console.log('Facebook signup clicked');
  };
  
  const handleLinkedInSignup = () => {
    // Implement LinkedIn OAuth signup
    console.log('LinkedIn signup clicked');
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha('#0b090a', 0.8)}, ${alpha('#161a1d', 0.9)}), url('/img/event-bg-dark.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            borderRadius: { xs: 3, md: 6 },
            overflow: 'hidden',
            boxShadow: '0 25px 75px rgba(16, 30, 54, 0.25)',
            backgroundColor: '#fff',
            height: { md: '800px' },
          }}
          style={{display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
        >
          {/* Left Side - Illustration */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
                zIndex: -1,
                overflow: 'hidden',
              }}
            >
              {/* Animated Gradient Background */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  width: '120%',
                  height: '120%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                  animation: 'pulse 15s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.6, transform: 'scale(1)' },
                    '50%': { opacity: 1, transform: 'scale(1.2)' },
                    '100%': { opacity: 0.6, transform: 'scale(1)' },
                  },
                }}
              />
              
              {/* Decorative Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 500,
                  height: 500,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              
              {/* More decorative elements */}
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    width: 20 + index * 15,
                    height: 20 + index * 15,
                    borderRadius: '50%',
                    background: alpha('#fff', 0.1 - index * 0.015),
                    top: `${20 + index * 15}%`,
                    left: `${10 + index * 10}%`,
                  }}
                />
              ))}
            </Box>

            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6,
                color: 'white',
                textAlign: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ width: '100%' }}
              >
                {/* Illustration */}
                <Box sx={{ width: '100%', height: 300, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src="/img/register-illustration.svg"
                    alt="Registration"
                    sx={{ 
                      width: '80%',
                      maxWidth: '400px', 
                      height: 'auto',
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                    }}
                  />
                </Box>
                
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Join EventHub Today
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal', opacity: 0.9 }}>
                  Create an account to get started
                </Typography>
 
           
              </motion.div>
            </Box>
          </Grid>
          
          {/* Right Side - Registration Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: 'relative',
              p: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#fff',
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ mb: 4, textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="700"
                  gutterBottom
                  sx={{
                    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Create Account
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Sign up to start exploring and booking venues
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>   
                  {/* Name Fields */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" error={!!formErrors.firstName} fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <OutlinedInput
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          startAdornment={
                            <InputAdornment position="start">
                              <PersonOutlineIcon color="action" />
                            </InputAdornment>
                          }
                          label="First Name"
                          sx={{
                            borderRadius: 2,
                            '&.Mui-focused': {
                              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                            },
                          }}
                        />
                        {formErrors.firstName && <FormHelperText error>{formErrors.firstName}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" error={!!formErrors.lastName} fullWidth>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <OutlinedInput
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          label="Last Name"
                          sx={{
                            borderRadius: 2,
                            '&.Mui-focused': {
                              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                            },
                          }}
                        />
                        {formErrors.lastName && <FormHelperText error>{formErrors.lastName}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Email Field */}
                  <FormControl variant="outlined" error={!!formErrors.email} fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      startAdornment={
                        <InputAdornment position="start">
                          <EmailOutlinedIcon color="action" />
                        </InputAdornment>
                      }
                      label="Email Address"
                      sx={{
                        borderRadius: 2,
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                        },
                      }}
                    />
                    {formErrors.email && <FormHelperText error>{formErrors.email}</FormHelperText>}
                  </FormControl>

                  {/* Password Field */}
                  <FormControl variant="outlined" error={!!formErrors.password} fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a secure password"
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="action" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      sx={{
                        borderRadius: 2,
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                        },
                      }}
                    />
                    {formErrors.password && <FormHelperText error>{formErrors.password}</FormHelperText>}
                  </FormControl>
                  
                  {/* Confirm Password Field */}
                  <FormControl variant="outlined" error={!!formErrors.confirmPassword} fullWidth>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="action" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      sx={{
                        borderRadius: 2,
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                        },
                      }}
                    />
                    {formErrors.confirmPassword && <FormHelperText error>{formErrors.confirmPassword}</FormHelperText>}
                  </FormControl>
                  
                  {/* Terms and Conditions */}
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptTerms}
                          onChange={handleCheckboxChange}
                          color="primary"
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          I agree to the {' '}
                          <Link component={RouterLink} to="/terms" color="primary" underline="hover">
                            Terms of Service
                          </Link>
                          {' '} and {' '}
                          <Link component={RouterLink} to="/privacy" color="primary" underline="hover">
                            Privacy Policy
                          </Link>
                        </Typography>
                      }
                    />
                    {formErrors.terms && (
                      <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                        {formErrors.terms}
                      </Typography>
                    )}
                  </Box>

                  {/* Register Button */}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<HowToRegIcon />}
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      mt: 2,
                      mb: 2,
                      borderRadius: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: '#fff',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                      },
                    }}
                  >
                    Create Account
                  </LoadingButton>

                  {/* Divider */}
                  <Divider>
                    <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                      OR
                    </Typography>
                  </Divider>
                  
                  {/* Social Registrations */}
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      onClick={handleGoogleSignup}
                      fullWidth
                      startIcon={<GoogleIcon />}
                      sx={{
                        py: 1.5,
                        borderColor: alpha('#DB4437', 0.3),
                        color: '#DB4437',
                        '&:hover': {
                          borderColor: '#DB4437',
                          bgcolor: alpha('#DB4437', 0.05),
                        },
                      }}
                    >
                      Google
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleFacebookSignup}
                      fullWidth
                      startIcon={<FacebookIcon />}
                      sx={{
                        py: 1.5,
                        borderColor: alpha('#4267B2', 0.3),
                        color: '#4267B2',
                        '&:hover': {
                          borderColor: '#4267B2',
                          bgcolor: alpha('#4267B2', 0.05),
                        },
                      }}
                    >
                      Facebook
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleLinkedInSignup}
                      fullWidth
                      startIcon={<LinkedInIcon />}
                      sx={{
                        py: 1.5,
                        borderColor: alpha('#0077B5', 0.3),
                        color: '#0077B5',
                        '&:hover': {
                          borderColor: '#0077B5',
                          bgcolor: alpha('#0077B5', 0.05),
                        },
                      }}
                    >
                      LinkedIn
                    </Button>
                  </Stack>
                  
                  {/* Login Link */}
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 3 }}
                  >
                    Already have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="body2"
                      color="primary.main"
                      fontWeight="medium"
                      underline="hover"
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Stack>
              </Box>
              
              {/* Timestamp */}
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ mt: 6, display: 'block', textAlign: 'center' }}
              >
                Last sync: 2025-05-28 22:33:52 UTC
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;