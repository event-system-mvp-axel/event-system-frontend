import { authService } from '../services/api';
import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  Divider 
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  setMessage({ type: '', text: '' });

  // Validering
  if (passwords.newPassword !== passwords.confirmPassword) {
    setMessage({ type: 'error', text: 'Nya lösenorden matchar inte' });
    return;
  }

  if (passwords.newPassword.length < 6) {
    setMessage({ type: 'error', text: 'Lösenordet måste vara minst 6 tecken' });
    return;
  }

  setLoading(true);

  try {
    await authService.changePassword(passwords.currentPassword, passwords.newPassword);
    setMessage({ type: 'success', text: 'Lösenordet har uppdaterats!' });
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  } catch (error) {
    if (error.response?.data) {
      setMessage({ type: 'error', text: error.response.data });
    } else {
      setMessage({ type: 'error', text: 'Något gick fel. Försök igen.' });
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1C2346', mb: 4 }}>
        Min Profil
      </Typography>

      {/* Användarinformation */}
      <Paper elevation={0} sx={{ p: 4, mb: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 3,
            }}
          >
            <PersonIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Byt lösenord */}
      <Paper elevation={0} sx={{ p: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LockIcon sx={{ color: 'primary.main', mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Byt lösenord
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handlePasswordSubmit}>
          <TextField
            fullWidth
            type="password"
            name="currentPassword"
            label="Nuvarande lösenord"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            required
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            type="password"
            name="newPassword"
            label="Nytt lösenord"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            required
            helperText="Minst 6 tecken"
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            type="password"
            name="confirmPassword"
            label="Bekräfta nytt lösenord"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Uppdaterar...' : 'Uppdatera lösenord'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;