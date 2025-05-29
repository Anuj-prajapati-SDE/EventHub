import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

import PageHeader from '../components/common/PageHeader';
import AnimatedBackground from '../components/common/AnimatedBackground';

const About = () => {
  const theme = useTheme();

  // Team member data
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Former event planner with 15+ years of experience who recognized the need for better venue discovery tools.',
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'AI specialist who developed our proprietary venue matching algorithm using A* search principles.',
    },
    {
      name: 'Marcus Williams',
      role: 'Head of Operations',
      image: 'https://randomuser.me/api/portraits/men/68.jpg',
      bio: 'Hospitality industry veteran who manages venue onboarding and quality control processes.',
    },
    {
      name: 'Priya Sharma',
      role: 'UX Director',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Dedicated to creating seamless user experiences for both event organizers and venue owners.',
    },
  ];

  return (
    <>
      <PageHeader
        title="About EventHub"
        subtitle="Discover the story behind the platform connecting people with perfect venues"
        background="gradient"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Our Mission */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  mb: 1,
                  textTransform: 'uppercase', 
                  letterSpacing: 1,
                }}
              >
                Our Mission
              </Typography>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Revolutionizing Event Venue Discovery
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2022, EventHub was created with a simple yet powerful mission: to revolutionize how people discover and book event venues. We understand that finding the perfect venue is crucial to any event's success, yet the traditional process was often time-consuming and frustrating.
              </Typography>
              <Typography variant="body1" paragraph>
                Our platform leverages advanced technology to connect event organizers with venue owners seamlessly, eliminating the hassle of endless phone calls, emails, and site visits. We employ the A* search algorithm to match users with venues that perfectly align with their specific needs and preferences.
              </Typography>
              <Typography variant="body1">
                Today, EventHub hosts over 10,000 venues across the United States and has facilitated more than 50,000 successful events. We continue to grow and evolve, driven by our commitment to making venue discovery and booking as efficient and enjoyable as possible.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Team collaboration"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Why Choose Us */}
        <Box sx={{ py: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  mb: 1,
                  textTransform: 'uppercase', 
                  letterSpacing: 1,
                }}
              >
                Why Choose Us
              </Typography>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                What Sets Us Apart
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
                At EventHub, we combine cutting-edge technology with deep industry expertise to deliver an unmatched venue discovery experience.
              </Typography>
            </motion.div>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <SearchIcon sx={{ fontSize: 40 }} />,
                title: "Smart Search Algorithm",
                description: "Our A* search algorithm finds venues that perfectly match your specific requirements, saving you hours of research.",
                color: theme.palette.primary.main
              },
              {
                icon: <SpeedIcon sx={{ fontSize: 40 }} />,
                title: "Efficiency",
                description: "Book venues in minutes instead of days with our streamlined platform and instant availability checking.",
                color: theme.palette.secondary.main
              },
              {
                icon: <SecurityIcon sx={{ fontSize: 40 }} />,
                title: "Secure Transactions",
                description: "State-of-the-art payment processing and data protection ensure your information remains safe.",
                color: theme.palette.success.main
              },
              {
                icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
                title: "Dedicated Support",
                description: "Our customer support team is available 24/7 to assist with any questions or issues that may arise.",
                color: theme.palette.info.main
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={6} lg={3} key={index} minWidth={"100%"}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        width: 70,
                        height: 70,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        color: 'white',
                        bgcolor: feature.color,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Our Story */}
        <AnimatedBackground variant="gradient">
          <Box sx={{ py: 10, color: 'white', textAlign: 'center' }}>
            <Container maxWidth="md">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h6" 
                  component="p" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 1,
                    textTransform: 'uppercase', 
                    letterSpacing: 1,
                    opacity: 0.9
                  }}
                >
                  Our Story
                </Typography>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  From Concept to Reality
                </Typography>
                <Typography variant="body1" paragraph sx={{ opacity: 0.9, mb: 4 }}>
                  EventHub began as a solution to a common problem. Our founder, Alex Johnson, experienced firsthand the challenges of finding suitable venues while working as an event planner. The idea for a platform that would streamline this process took shape during a particularly frustrating venue hunt for a corporate client in 2021.
                </Typography>
                
                <Grid container spacing={4} justifyContent="center">
                  {[
                    {
                      year: '2021',
                      title: 'The Concept',
                      description: 'EventHub is conceived after our founder experiences venue-hunting frustrations',
                    },
                    {
                      year: '2022',
                      title: 'Launch',
                      description: 'Platform launches with 500 venues across 5 major cities',
                    },
                    {
                      year: '2023',
                      title: 'Expansion',
                      description: 'National expansion to 30 cities and 5,000 venues',
                    },
                    {
                      year: '2024',
                      title: 'AI Integration',
                      description: 'A* search algorithm integration for smart venue matching',
                    },
                    {
                      year: '2025',
                      title: 'Global Vision',
                      description: 'Beginning international expansion with 10,000+ venues',
                    },
                  ].map((milestone, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        <Box 
                          sx={{ 
                            p: 3, 
                            borderRadius: 3, 
                            bgcolor: 'rgba(255,255,255,0.1)', 
                            height: '100%',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              mb: 1, 
                              color: alpha(theme.palette.secondary.light, 0.9),
                              fontWeight: 'bold',
                            }}
                          >
                            {milestone.year}
                          </Typography>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {milestone.title}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {milestone.description}
                          </Typography>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Container>
          </Box>
        </AnimatedBackground>
        
        {/* Meet Our Team */}
        <Box sx={{ py: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  mb: 1,
                  textTransform: 'uppercase', 
                  letterSpacing: 1,
                }}
              >
                Meet Our Team
              </Typography>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                The People Behind EventHub
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
                Our diverse team brings together expertise from event planning, technology, and customer service to create the best venue discovery platform possible.
              </Typography>
            </motion.div>
          </Box>
          
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} minWidth={"100%"}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <Card 
                    elevation={0}
                    variant="outlined"
                    sx={{ 
                      borderRadius: 4, 
                      overflow: 'hidden',
                      height: '100%',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: 3
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 180, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{
                          position: 'absolute',
                          left: '50%',
                          bottom: 0,
                          transform: 'translate(-50%, 50%)',
                          width: 120,
                          height: 120,
                          border: `5px solid white`,
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        }}
                      />
                    </Box>
                    <CardContent sx={{ pt: 10, textAlign: 'center' }}>
                      <Typography variant="h6" fontWeight="bold">
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        {member.role}
                      </Typography>
                      <Divider sx={{ my: 2, width: 60, mx: 'auto' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Stats */}
        <Box 
          sx={{ 
            py: 10,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 4,
            mt: 4
          }}
        >
          <Container>
            <Grid container spacing={2} justifyContent="center">
              {[
                { value: '10,000+', label: 'Venues' },
                { value: '50,000+', label: 'Events Hosted' },
                { value: '100,000+', label: 'Happy Users' },
                { value: '90%', label: 'Satisfaction Rate' },
              ].map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography 
                        variant="h3" 
                        fontWeight="bold"
                        sx={{
                          background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 1
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        {/* CTA Section */}
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Ready to Find Your Perfect Venue?
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', mb: 4, fontWeight: 'normal' }}>
              Join thousands of event organizers who have simplified their venue booking process with EventHub
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/venues"
              endIcon={<ArrowForwardIcon />}
              sx={{ py: 1.5, px: 4, borderRadius: 3 }}
            >
              Explore Venues
            </Button>
          </motion.div>
        </Box>
      </Container>
    </>
  );
};

export default About;