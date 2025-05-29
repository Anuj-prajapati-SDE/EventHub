import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    try {
      // In a real app, you would make an API call here
      // For demonstration, we'll simulate a successful API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      toast.success('Password reset instructions sent to your email');
    } catch  {
      setError('Failed to send password reset email. Please try again.');
      toast.error('Failed to send password reset email');
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
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.primary.main, 0.9)})`,
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
            <Button
              component={RouterLink}
              to="/login"
              startIcon={<ArrowBackIcon />}
              sx={{ alignSelf: 'flex-start', mb: 2 }}
            >
              Back to Login
            </Button>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Forgot Password
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {success 
                  ? 'Check your email for password reset instructions'
                  : 'Enter your email and we ll send you instructions to reset your password'
                }
              </Typography>
            </Box>

            {!success ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  loading={loading}
                >
                  Send Reset Link
                </LoadingButton>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    border: `1px dashed ${theme.palette.success.main}`,
                    mb: 3,
                  }}
                >
                  <Box
                    component="img"
                    src="/img/email-sent.svg"
                    alt="Email Sent"
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Email Sent!
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    We've sent a password reset link to:
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Please check your email inbox and click the link to reset your password.
                  </Typography>
                </Box>
                
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setEmail('');
                    setSuccess(false);
                  }}
                  sx={{ mt: 1 }}
                >
                  Try a different email
                </Button>
              </motion.div>
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Remember your password?{' '}
                <Link component={RouterLink} to="/login" underline="hover">
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
};

export default ForgotPassword;