import React from 'react';
import { Box, keyframes, useTheme } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(5deg); }
  75% { transform: translateY(15px) rotate(-5deg); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AnimatedBackground = ({ children, variant = 'default' }) => {
  const theme = useTheme();
  
  // Define background styles based on variant
  const getBgStyle = () => {
    switch (variant) {
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        };
      case 'animated-gradient':
        return {
          background: `linear-gradient(-45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
          backgroundSize: '400% 400%',
          animation: `gradient 15s ease infinite`,
          '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        };
      case 'pattern':
        return {
          backgroundColor: theme.palette.background.default,
          backgroundImage: `radial-gradient(${theme.palette.primary.light}22 2px, transparent 2px)`,
          backgroundSize: '30px 30px',
        };
      case 'wave':
        return {
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '150px',
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='${encodeURIComponent(theme.palette.primary.main)}'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='${encodeURIComponent(theme.palette.primary.main)}'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='${encodeURIComponent(theme.palette.primary.main)}'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom center`,
            backgroundSize: '100% 150px',
          },
        };
      case 'circles':
      default:
        return {
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
        };
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...getBgStyle(),
      }}
    >
      {variant === 'circles' && (
        <>
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: ['80px', '100px', '150px', '200px'][i % 4],
                height: ['80px', '100px', '150px', '200px'][i % 4],
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.light}33 0%, ${theme.palette.primary.main}33 100%)`,
                top: `${10 + (i * 15)}%`,
                left: `${5 + (i * 18)}%`,
                animation: `${float} ${4 + i}s ease-in-out infinite`,
                zIndex: 0,
              }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <Box
              key={i + 6}
              sx={{
                position: 'absolute',
                width: ['60px', '90px', '120px', '180px'][i % 4],
                height: ['60px', '90px', '120px', '180px'][i % 4],
                borderRadius: '50%',
                border: `2px solid ${theme.palette.secondary.main}33`,
                top: `${20 + (i * 12)}%`,
                right: `${2 + (i * 15)}%`,
                animation: `${rotate} ${15 + i * 2}s linear infinite`,
                zIndex: 0,
              }}
            />
          ))}
        </>
      )}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AnimatedBackground;