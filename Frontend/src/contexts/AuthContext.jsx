import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../utils/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (via token in localStorage)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // In a real application, you would fetch the user data from an API
          // For now, let's use mock data or fetch from localStorage
          const userInfo = localStorage.getItem('userInfo');
          
          if (userInfo) {
            setCurrentUser(JSON.parse(userInfo));
          } else {
            // Simulate API call to get user info
            // In a real app, you would call your actual API endpoint here
            const mockUser = {
              id: '12345',
              name: 'John Doe',
              email: 'johndoe@example.com',
              avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
              role: 'user'
            };
            
            setCurrentUser(mockUser);
            localStorage.setItem('userInfo', JSON.stringify(mockUser));
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real application, you would make an API call here
      // For demonstration, we'll simulate a successful API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const token = 'mock-jwt-token-for-demonstration';
      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        avatar: null,
        role: userData.role || 'user'
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(mockUser);
      toast.success('Registration successful!');
      return { user: mockUser, token };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real application, you would validate credentials against your API
      // For demonstration, we'll simulate a successful login if email contains "test"
      if (!email.includes('test') && email !== 'johndoe@example.com') {
        throw new Error('Invalid credentials');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const token = 'mock-jwt-token-for-demonstration';
      const mockUser = {
        id: '12345',
        name: 'John Doe',
        email: email,
        avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
        role: 'user'
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(mockUser);
      toast.success('Login successful!');
      return { user: mockUser, token };
    } catch (err) {
      setError(err.message || 'Login failed');
      toast.error(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    toast.info('You have been logged out');
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;