import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip, 
  Divider, 
  Button, 
  useTheme,
  alpha,
  IconButton
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { motion } from 'framer-motion';

const VenueCard = ({ venue, onFavoriteToggle = null, featured = false }) => {
  const theme = useTheme();
  const {
    _id,
    name,
    city,
    images,
    capacity,
    pricePerHour,
    rating,
    amenities = [],
    isFavorite = false,
    categories = []
  } = venue;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        elevation={featured ? 3 : 1}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible',
          position: 'relative',
          borderRadius: 4,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height={featured ? 220 : 180}
            image={images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400x200?text=No+Image'}
            alt={name}
            sx={{ 
              borderTopLeftRadius: 16, 
              borderTopRightRadius: 16,
              objectFit: 'cover',
            }}
          />
          
          {/* Rating badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              py: 0.5,
              px: 1.5,
              borderRadius: 10,
              fontWeight: 'bold',
              fontSize: '0.875rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {/* ★ {rating?.toFixed('1') || '4.5'} */}
            ★ { '4.5'}
          </Box>
          
          {/* Favorite button */}
          {onFavoriteToggle && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: 'white',
                '&:hover': {
                  bgcolor: alpha(theme.palette.secondary.light, 0.9),
                  color: 'white',
                },
              }}
              onClick={() => onFavoriteToggle(_id)}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: theme.palette.secondary.main }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          )}
          
          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom noWrap>
            {name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {city}
            </Typography>
          </Box>
          
          {categories?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {categories.slice(0, 3).map((cat, idx) => (
                <Chip 
                  key={idx} 
                  label={cat} 
                  size="small"
                  color={idx === 0 ? 'primary' : 'default'}
                  variant={idx === 0 ? 'filled' : 'outlined'}
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}
          
          {amenities?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Amenities:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {amenities.slice(0, 3).map((amenity, index) => (
                  <Chip 
                    key={index} 
                    label={amenity} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
                {amenities.length > 3 && (
                  <Chip 
                    label={`+${amenities.length - 3} more`} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                )}
              </Box>
            </Box>
          )}
          
          <Divider sx={{ my: 1.5 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              <PaidIcon sx={{ mr: 1, fontSize: 20, color: theme.palette.success.main }} />
              ${pricePerHour}/hr
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleAltIcon sx={{ mr: 0.5, fontSize: 18, color: theme.palette.info.main }} />
              Up to {capacity}
            </Typography>
          </Box>
        </CardContent>
        
        <Box 
          sx={{ 
            p: 2, 
            pt: 0, 
            mx: 'auto', 
            width: '90%', 
            transform: 'translateY(50%)', 
            position: 'relative', 
            zIndex: 2,
          }}
        >
          <Button 
            variant="contained" 
            fullWidth
            component={RouterLink}
            to={`/venues/${_id}`}
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
              py: 1.2,
            }}
            endIcon={<ArrowForwardIcon />}
          >
            View Details
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default VenueCard;