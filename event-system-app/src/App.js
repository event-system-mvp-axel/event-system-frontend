import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeModeProvider } from './contexts/ThemeModeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import MyTickets from './pages/MyTickets';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Layout from './components/Layout/Layout';

// 🔒 Privat route-komponent
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* ❌ Utan Layout: Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ✅ Med Layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/events"
              element={
                <Layout>
                  <Events />
                </Layout>
              }
            />
            <Route
              path="/events/:id"
              element={
                <Layout>
                  <EventDetails />
                </Layout>
              }
            />
            <Route
              path="/my-tickets"
              element={
                <PrivateRoute>
                  <Layout>
                    <MyTickets />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeModeProvider>
  );
}

export default App;
