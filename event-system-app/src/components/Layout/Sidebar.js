import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: <GridViewIcon />, path: '/', label: 'Hem' },
    { icon: <ConfirmationNumberIcon />, path: '/my-tickets', label: 'Mina Biljetter' },
    { icon: <EventIcon />, path: '/events', label: 'Evenemang' },
    { icon: <HomeIcon />, path: '/venues', label: 'Lokaler' },
    { icon: <PersonIcon />, path: '/profile', label: 'Profil' },
    { icon: <StarIcon />, path: '/favorites', label: 'Favoriter' },
  ];

  const bottomItems = [
    { icon: <SettingsIcon />, path: '/settings', label: 'Inställningar' },
    { icon: <LogoutIcon />, action: logout, label: 'Logga ut' },
  ];

  const NavButton = ({ item }) => {
    const isActive = location.pathname === item.path;
    
    if (item.action) {
      return (
        <Tooltip title={item.label} placement="right">
          <IconButton
            onClick={item.action}
            sx={{
              color: 'text.secondary',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 20, 147, 0.1)',
                color: 'primary.main',
              },
              borderRadius: 2,
              width: 48,
              height: 48,
              mb: 1,
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
            color: isActive ? 'primary.main' : 'text.secondary',
            backgroundColor: isActive ? 'rgba(255, 20, 147, 0.1)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 20, 147, 0.1)',
              color: 'primary.main',
            },
            borderRadius: 2,
            width: 48,
            height: 48,
            mb: 1,
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
          mb: 4,
          cursor: 'pointer',
        }}
        component={Link}
        to="/"
      >
        <EventIcon sx={{ color: 'white', fontSize: 28 }} />
      </Box>

      {/* Main Navigation */}
      <Box sx={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <NavButton key={index} item={item} />
        ))}
      </Box>

      {/* Bottom Navigation */}
      <Box>
        {user && bottomItems.map((item, index) => (
          <NavButton key={index} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;