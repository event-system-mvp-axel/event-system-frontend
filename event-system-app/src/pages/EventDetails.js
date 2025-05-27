import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box,
  Grid,
  Chip,
  Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService, ticketService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      const data = await eventService.getEvent(id);
      setEvent(data);
    } catch (error) {
      console.error('Error loading event:', error);
      setMessage({ type: 'error', text: 'Kunde inte ladda evenemanget' });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setPurchasing(true);
    setMessage({ type: '', text: '' });

    try {
      await ticketService.purchaseTicket(event.id, event.price);
      setMessage({ type: 'success', text: 'Biljett köpt! Du hittar den under "Mina Biljetter"' });
      setTimeout(() => {
        navigate('/my-tickets');
      }, 2000);
    } catch (error) {
      console.error('Error purchasing ticket:', error);
      setMessage({ type: 'error', text: 'Kunde inte köpa biljett. Försök igen.' });
    } finally {
      setPurchasing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Laddar evenemang...</Typography>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Evenemanget hittades inte</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 2
              }}
              src={event.imageUrl || 'https://via.placeholder.com/400x300'}
              alt={event.title}
            />
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h1" gutterBottom>
              {event.title}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip 
                icon={<CategoryIcon />} 
                label={event.category} 
                color="primary" 
                sx={{ mr: 1 }}
              />
            </Box>
            
            <Typography variant="body1" paragraph>
              {event.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                {event.location}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                {formatDate(event.startDate)} - {formatDate(event.endDate)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" color="primary">
                {event.price} kr
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Max antal biljetter: {event.maxTickets}
              </Typography>
            </Box>
            
            {message.text && (
              <Alert severity={message.type} sx={{ mb: 2 }}>
                {message.text}
              </Alert>
            )}
            
            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              onClick={handlePurchase}
              disabled={purchasing}
            >
              {purchasing ? 'Köper biljett...' : 'Köp biljett'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EventDetails;