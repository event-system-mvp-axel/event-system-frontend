import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Event System
          </Link>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/events">
            Events
          </Button>
          
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/my-tickets">
                Mina Biljetter
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logga ut
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Logga in
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Registrera
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;