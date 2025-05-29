import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Custom color palette
const primaryColor = {
  main: '#3a36e0',
  light: '#6d6ff8',
  dark: '#2826a6',
  contrastText: '#ffffff',
};

const secondaryColor = {
  main: '#ff5757',
  light: '#ff8a84',
  dark: '#c62828',
  contrastText: '#ffffff',
};

// Create theme
let theme = createTheme({
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    background: {
      default: '#f8f9fc',
      paper: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.25px',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.05)',
    '0 4px 8px rgba(0,0,0,0.08)',
    '0 8px 16px rgba(0,0,0,0.08)',
    '0 12px 24px rgba(0,0,0,0.08)',
    '0 16px 32px rgba(0,0,0,0.08)',
    '0 20px 40px rgba(0,0,0,0.1)',
    '0 24px 48px rgba(0,0,0,0.1)',
    '0 28px 56px rgba(0,0,0,0.12)',
    '0 32px 64px rgba(0,0,0,0.12)',
    '0 36px 72px rgba(0,0,0,0.12)',
    '0 40px 80px rgba(0,0,0,0.14)',
    '0 44px 88px rgba(0,0,0,0.14)',
    '0 48px 96px rgba(0,0,0,0.14)',
    '0 52px 104px rgba(0,0,0,0.16)',
    '0 56px 112px rgba(0,0,0,0.16)',
    '0 60px 120px rgba(0,0,0,0.16)',
    '0 64px 128px rgba(0,0,0,0.18)',
    '0 68px 136px rgba(0,0,0,0.18)',
    '0 72px 144px rgba(0,0,0,0.18)',
    '0 76px 152px rgba(0,0,0,0.2)',
    '0 80px 160px rgba(0,0,0,0.2)',
    '0 84px 168px rgba(0,0,0,0.2)',
    '0 88px 176px rgba(0,0,0,0.22)',
  ],
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingTop: 10,
          paddingBottom: 10,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
        },
        sizeLarge: {
          height: 52,
          fontSize: '1rem',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 8px 25px -8px rgba(58, 54, 224, 0.6)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 8px 25px -8px rgba(255, 87, 87, 0.6)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 20,
        },
        outlined: {
          borderWidth: 1,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          overflow: 'hidden',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: `2px solid ${primaryColor.light}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 4,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

export default theme;