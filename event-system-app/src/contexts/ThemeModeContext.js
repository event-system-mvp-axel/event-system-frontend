import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('themeMode');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              primary: {
                main: '#FF1493',
                light: '#FF69B4',
                dark: '#C71585',
              },
              background: {
                default: '#F5F5F5',
                paper: '#FFFFFF',
              },
              text: {
                primary: '#1A1A1A',
                secondary: '#666666',
              },
            }
          : {
              primary: {
                main: '#FF69B4',
              },
              background: {
                default: '#121212',
                paper: '#1E1E1E',
              },
              text: {
                primary: '#FFFFFF',
                secondary: '#CCCCCC',
              },
            }),
      },
    }), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};