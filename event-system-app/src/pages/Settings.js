import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { useThemeMode } from '../contexts/ThemeModeContext';

const Settings = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box p={4}>
      {/* Rubrik med anpassad färg */}
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
        sx={{ color: '#37437D' }} // Din designfärg
      >
        Inställningar
      </Typography>

      {/* Dark mode-raden */}
      <FormControlLabel
        control={
          <Switch
            checked={mode === 'dark'}
            onChange={toggleMode}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#FF1493',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#FF69B4',
              },
            }}
          />
        }
        label={
          <Typography
            fontWeight={600}
            sx={{
              color: '#37437D', // Matchar din sidebar
              fontSize: '1rem',
            }}
          >
            Dark Mode
          </Typography>
        }
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default Settings;