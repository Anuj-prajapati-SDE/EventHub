import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LoginIcon from '@mui/icons-material/Login';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Alert from '@mui/material/Alert';
import { motion } from 'framer-motion';

import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Check if user was redirected from registration
  useEffect(() => {
    if (location.state?.registered) {
      setSuccessMessage('Registration successful! Please log in with your new account.');
    } else if (location.state?.passwordReset) {
      setSuccessMessage('Password has been successfully reset! Please log in with your new password.');
    }
  }, [location]);
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!re.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };
  
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await login({ email, password });
      
      // Get the intended destination or default to dashboard
      const destination = location.state?.from?.pathname || '/dashboard';
      navigate(destination, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to sign in. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    console.log('Google login clicked');
  };
  
  const handleFacebookLogin = () => {
    // Implement Facebook OAuth login
    console.log('Facebook login clicked');
  };
  
  const handleLinkedInLogin = () => {
    // Implement LinkedIn OAuth login
    console.log('LinkedIn login clicked');
  };
  
  return (
    <>
    <Navbar/>
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
            height: { md: '700px' },
          }}
        >
          {/* Left Side - Login Form */}
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
              initial={{ opacity: 0, x: -20 }}
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
                  Welcome Back!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Log in to access your account and manage your venue bookings
                </Typography>
              </Box>

              {successMessage && (
                <Alert
                  severity="success"
                  icon={<CheckCircleIcon fontSize="inherit" />}
                  sx={{ mb: 3 }}
                >
                  {successMessage}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                  {/* Email Field */}
                  <FormControl variant="outlined" error={!!emailError} fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => validateEmail(email)}
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
                    {emailError && <FormHelperText error>{emailError}</FormHelperText>}
                  </FormControl>

                  {/* Password Field */}
                  <FormControl variant="outlined" error={!!passwordError} fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => validatePassword(password)}
                      placeholder="Enter your password"
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
                    {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
                  </FormControl>

                  {/* Remember and Forgot */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="primary"
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Remember me</Typography>}
                    />
                    <Link
                      component={RouterLink}
                      to="/forgot-password"
                      variant="body2"
                      color="primary.main"
                      fontWeight="medium"
                      underline="hover"
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  {/* Login Button */}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
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
                    Sign in
                  </LoadingButton>

                  {/* Divider */}
                  <Divider>
                    <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                      OR
                    </Typography>
                  </Divider>
                  
                  {/* Social Logins */}
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      onClick={handleGoogleLogin}
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
                      onClick={handleFacebookLogin}
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
                      onClick={handleLinkedInLogin}
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
                  
                  {/* Registration Link */}
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 3 }}
                  >
                    Don't have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="body2"
                      color="primary.main"
                      fontWeight="medium"
                      underline="hover"
                    >
                      Sign up
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
                Last sync: 2025-05-28 22:28:21 UTC
              </Typography>
            </motion.div>
          </Grid>
          
          {/* Right Side - Illustration */}
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
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
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
                {/* Animation or illustration */}
                <Box sx={{ width: '100%', height: 300, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src="/img/login-illustration.svg"
                    alt="Login"
                    sx={{ 
                      width: '80%',
                      maxWidth: '400px', 
                      height: 'auto',
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                    }}
                  />
                </Box>
                
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Discover & Book Amazing Venues
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal', opacity: 0.9 }}>
                  Log in to access your personalized dashboard
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2} justifyContent="center">
                    {['Search', 'Book', 'Experience'].map((step, index) => (
                      <Grid item key={index}>
                        <Paper
                          sx={{
                            px: 3,
                            py: 1.5,
                            borderRadius: 10,
                            backgroundColor: alpha('#fff', 0.15),
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="medium">
                            {index + 1}. {step}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
<Footer/>
    </>
  );
};

export default Login;