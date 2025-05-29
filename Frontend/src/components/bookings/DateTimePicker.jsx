import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  useTheme,
  styled,
  alpha
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { format, isSameDay } from 'date-fns';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';

// Styled time slot component
const TimeSlot = styled(Button)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius * 2,
  fontWeight: 600,
  color: selected ? theme.palette.common.white : theme.palette.text.primary,
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.paper,
  border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : alpha(theme.palette.primary.light, 0.1),
    borderColor: selected ? theme.palette.primary.dark : theme.palette.primary.light,
  },
  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: 200,
  }),
  '&:hover:not(:active)': {
    transform: 'translateY(-2px)',
    boxShadow: selected ? '0 6px 12px rgba(0,0,0,0.15)' : '0 4px 8px rgba(0,0,0,0.1)',
  },
}));

const DateTimePicker = ({ availableSlots, onDateTimeSelected }) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  
  // Extract all available dates from slots
  useEffect(() => {
    if (availableSlots && availableSlots.length > 0) {
      const dates = [...new Set(
        availableSlots.map(slot => format(new Date(slot.startTime), 'yyyy-MM-dd'))
      )];
      setAvailableDates(dates);
    }
  }, [availableSlots]);
  
  // Get available time slots for the selected date
  const getAvailableTimesForDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return availableSlots.filter(slot => 
      format(new Date(slot.startTime), 'yyyy-MM-dd') === formattedDate
    );
  };
  
  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when date changes
  };
  
  // Handle time selection
  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);
    onDateTimeSelected({
      date: selectedDate,
      timeSlot: timeSlot
    });
  };
  
  // Format time for display (e.g., "14:00" to "2:00 PM")
  const formatTimeForDisplay = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Check if a date should be disabled (no available slots)
  const isDateDisabled = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return !availableDates.includes(formattedDate);
  };
  
  // Get available times for the selected date
  const availableTimesForDate = getAvailableTimesForDate(selectedDate);
  
  // Morning and afternoon slots
  const morningSlots = availableTimesForDate.filter(
    slot => new Date(slot.startTime).getHours() < 12
  );
  
  const afternoonSlots = availableTimesForDate.filter(
    slot => {
      const hours = new Date(slot.startTime).getHours();
      return hours >= 12 && hours < 17;
    }
  );
  
  const eveningSlots = availableTimesForDate.filter(
    slot => new Date(slot.startTime).getHours() >= 17
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventAvailableIcon sx={{ mr: 1 }} />
                  Select Date
                </Typography>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={selectedDate}
                  onChange={handleDateChange}
                  shouldDisableDate={isDateDisabled}
                  disablePast
                  sx={{
                    '& .MuiPickersDay-root.Mui-selected': {
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                    },
                  }}
                  renderDay={(day, _value, DayComponentProps) => {
                    const formattedDate = format(day, 'yyyy-MM-dd');
                    const isAvailable = availableDates.includes(formattedDate);
                    const isSelected = isSameDay(day, selectedDate);
                    
                    return (
                      <Box
                        sx={{
                          position: 'relative',
                          '&::after': isAvailable && !isSelected ? {
                            content: '""',
                            position: 'absolute',
                            bottom: '2px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                          } : {},
                        }}
                      >
                        <Button {...DayComponentProps} />
                      </Box>
                    );
                  }}
                />
              </LocalizationProvider>
            </Paper>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                height: '100%',
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  Available Time Slots
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </Typography>
              </Box>

              {availableTimesForDate.length > 0 ? (
                <Box>
                  {morningSlots.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
                        Morning
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {morningSlots.map((slot, index) => (
                          <TimeSlot
                            key={index}
                            selected={selectedTime && selectedTime.id === slot.id}
                            onClick={() => handleTimeSelect(slot)}
                            size="small"
                          >
                            {formatTimeForDisplay(slot.startTime)}
                          </TimeSlot>
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {afternoonSlots.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
                        Afternoon
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {afternoonSlots.map((slot, index) => (
                          <TimeSlot
                            key={index}
                            selected={selectedTime && selectedTime.id === slot.id}
                            onClick={() => handleTimeSelect(slot)}
                            size="small"
                          >
                            {formatTimeForDisplay(slot.startTime)}
                          </TimeSlot>
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {eveningSlots.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
                        Evening
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {eveningSlots.map((slot, index) => (
                          <TimeSlot
                            key={index}
                            selected={selectedTime && selectedTime.id === slot.id}
                            onClick={() => handleTimeSelect(slot)}
                            size="small"
                          >
                            {formatTimeForDisplay(slot.startTime)}
                          </TimeSlot>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box 
                  sx={{ 
                    height: '70%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    p: 3,
                  }}
                >
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
                    No available slots for this date
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Please select another date from the calendar
                  </Typography>
                </Box>
              )}
              
              {selectedTime && (
                <Box 
                  sx={{ 
                    mt: 3, 
                    p: 2, 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 2,
                    border: `1px dashed ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Selected Time Slot:
                  </Typography>
                  <Typography variant="body1">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')} • {formatTimeForDisplay(selectedTime.startTime)} - {formatTimeForDisplay(selectedTime.endTime)}
                  </Typography>
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DateTimePicker;