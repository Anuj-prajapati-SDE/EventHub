import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Theme
import theme from './theme';

// Layout Components
import MainLayout from './components/layout/MainLayout';
import MinimalLayout from './components/layout/MinimalLayout';

// Page Components
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VenueList from './components/venues/VenueList';
import VenueDetail from './components/venues/VenueDetail';
import BookingForm from './components/bookings/BookingForm';
import UserDashboard from './pages/dashboard/UserDashboard';
import UserProfile from './pages/profile/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import VenueOwnerDashboard from './pages/dashboard/VenueOwnerDashboard';
// Route Guards
import PrivateRoute from './components/routing/PrivateRoute';

// Global CSS
import './assets/styles/global.css';

import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Feedback from './pages/Feedback';

function App() {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes with minimal layout */}
            <Route element={<MinimalLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/dashboard/admin" element={<VenueOwnerDashboard/>} />
            </Route>

            {/* Main routes with full layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/venues" element={<VenueList />} />
              <Route path="/venues/:id" element={<VenueDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          
              <Route path="/terms" element={<Terms/>} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/feedback" element={<Feedback />} />
              
              {/* Protected routes */}
              <Route 
                path="/booking/:venueId" 
                element={
                  <PrivateRoute>
                   <BookingForm />
                 </PrivateRoute>
                } 
              />
               <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                } 
              /> 
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                } 
              />
              
              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer 
          position="bottom-right"  
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;