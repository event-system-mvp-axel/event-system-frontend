import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService, setAuthToken } from '../services/api';
import { jwtDecode } from 'jwt-decode'; // ✅ Rätt import

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Uppdaterad användning
        setUser(decoded);
        setAuthToken(token);
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { token, user } = response;

      localStorage.setItem('token', token);
      setAuthToken(token);
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token, user } = response;

      localStorage.setItem('token', token);
      setAuthToken(token);
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};