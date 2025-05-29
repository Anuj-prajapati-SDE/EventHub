import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  useTheme,
  alpha,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const theme = useTheme();
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    password: '',
    confirmPassword: '',
  });
  
  // Validate token when page loads
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // In a real app, you would check if token is valid with your API
        // For demonstration, we'll simulate a token validation
        // If the token doesn't contain "valid", we'll treat it as invalid
        if (!token.includes('valid')) {
          setTokenValid(false);
          setError('This password reset link is invalid or has expired');
        }
      } catch (err) {
        setTokenValid(false);
        setError('Failed to verify reset token');
      }
    };
    
    verifyToken();
  }, [token]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // In a real app, you would make an API call here
      // For demonstration, we'll simulate a successful password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      toast.success('Password reset successful! You can now log in with your new password.');
      
      // After 3 seconds, redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch  {
      setError('Failed to reset password. Please try again.');
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.secondary.dark, 0.9)})`,
        position: 'relative',
        py: 4,
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: "url('/img/pattern-dot.svg')",
          zIndex: 0,
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '450px', zIndex: 1 }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: theme.shape.borderRadius * 2,
              textAlign: 'center',
              mt: 4,
            }}
          >
            {!tokenValid ? (
              <Box>
                <Typography variant="h5" color="error" gutterBottom>
                  Invalid or Expired Link
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  This password reset link is invalid or has expired.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/forgot-password"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Request New Link
                </Button>
              </Box>
            ) : success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <CheckCircleOutlineIcon 
                    sx={{ 
                      fontSize: 80, 
                      color: theme.palette.success.main,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h5" gutterBottom>
                    Password Reset Successful!
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Your password has been successfully reset.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    You will be redirected to login page in a moment...
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Go to Login
                  </Button>
                </Box>
              </motion.div>
            ) : (
              <>
                <Box sx={{ mb: 4 }}>
                  <LockIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Reset Your Password
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Please enter your new password below
                  </Typography>
                </Box>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    margin="normal"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    variant="outlined"
                    margin="normal"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                  />

                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    loading={loading}
                  >
                    Reset Password
                  </LoadingButton>
                </form>
              </>
            )}
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Remember your password?{' '}
                <Link component={RouterLink} to="/login" underline="hover">
                  Back to Login
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
};

export default ResetPassword;