import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: <GridViewIcon />, path: '/', label: 'Hem' },
    { icon: <ConfirmationNumberIcon />, path: '/my-tickets', label: 'Mina Biljetter' },
    { icon: <EventIcon />, path: '/events', label: 'Evenemang' },
    { icon: <PersonIcon />, path: '/profile', label: 'Profil' },
    { icon: <StarIcon />, path: '/favorites', label: 'Favoriter' },
  ];

  const bottomItems = user ? [
    { icon: <SettingsIcon />, path: '/settings', label: 'Inställningar' },
    { icon: <LogoutIcon />, action: () => { logout(); navigate('/'); }, label: 'Logga ut' },
  ] : [
    { icon: <LoginIcon />, path: '/login', label: 'Logga in' },
  ];

  const NavButton = ({ item }) => {
    const isActive = location.pathname === item.path;
    
    if (item.action) {
      return (
        <Tooltip title={item.label} placement="right">
          <IconButton
            onClick={item.action}
            sx={{
              color: '#37437D',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 20, 147, 0.1)',
                color: 'primary.main',
              },
              borderRadius: 2,
              width: 48,
              height: 48,
              mb: 2,
            }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      );
    }

    return (
      <Tooltip title={item.label} placement="right">
        <IconButton
          component={Link}
          to={item.path}
          sx={{
            color: isActive ? 'primary.main' : '#37437D',
            backgroundColor: isActive ? 'rgba(255, 20, 147, 0.1)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 20, 147, 0.1)',
              color: 'primary.main',
            },
            borderRadius: 2,
            width: 48,
            height: 48,
            mb: 2,
          }}
        >
          {item.icon}
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: 80,
        backgroundColor: 'background.paper',
        borderRight: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
        zIndex: 1200,
      }}
    >
      {/* Logo Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        mb: 5,
      }}>
        {/* Project Name */}
        <Typography
          variant="h6"
          sx={{
            color: '#1C2346',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '-0.5px',
            mb: 2,
          }}
        >
          Eventsky
        </Typography>

        {/* Logo */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          component={Link}
          to="/"
        >
          <EventIcon sx={{ color: 'white', fontSize: 28 }} />
        </Box>
      </Box>

      {/* Main Navigation */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>
        {menuItems.map((item, index) => (
          <NavButton key={index} item={item} />
        ))}
      </Box>

      {/* Bottom Navigation */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>
        {bottomItems.map((item, index) => (
          <NavButton key={index} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;