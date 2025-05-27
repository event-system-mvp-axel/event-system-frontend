import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Typography, 
  Button,
  Box,
  TextField,
  InputAdornment,
  Chip,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('active');
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchTerm, events]);

  const loadEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Musik': '#FF6B6B',
      'Sport': '#4ECDC4',
      'Konst & Kultur': '#45B7D1',
      'Mat & Dryck': '#96CEB4',
      'Teknologi': '#9B59B6',
      'Komedi': '#F39C12',
    };
    return colors[category] || '#95A5A6';
  };

  const calculateSoldPercentage = (maxTickets) => {
    // Simulerad data för såld procent
    return Math.floor(Math.random() * 40) + 40;
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            sx={{ mr: 3 }}
          >
            <ToggleButton 
              value="active" 
              sx={{ 
                px: 3,
                borderRadius: '20px',
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              Active ({filteredEvents.length})
            </ToggleButton>
            <ToggleButton 
              value="draft"
              sx={{ 
                px: 3,
                borderRadius: '20px',
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              Draft (22)
            </ToggleButton>
            <ToggleButton 
              value="past"
              sx={{ 
                px: 3,
                borderRadius: '20px',
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              Past (32)
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Sök evenemang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            maxWidth: 600,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Typography>Laddar evenemang...</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => {
            const soldPercentage = calculateSoldPercentage(event.maxTickets);
            
            return (
              <Grid item xs={12} sm={6} lg={6} key={event.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  {/* Category Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 1,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <Chip
                      label={event.category}
                      size="small"
                      sx={{
                        bgcolor: 'background.paper',
                        fontWeight: 500,
                        borderRadius: 2,
                      }}
                    />
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontWeight: 500,
                        borderRadius: 2,
                      }}
                      icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white', ml: 1 }} />}
                    />
                  </Box>

                  <CardMedia
                    component="img"
                    height="240"
                    image={event.imageUrl || 'https://via.placeholder.com/400x300'}
                    alt={event.title}
                    sx={{ bgcolor: '#E0E0E0' }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {formatDate(event.startDate)} — {formatTime(event.startDate)}
                      </Typography>
                      <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                    </Box>

{/* Progress Bar */}
<Box sx={{ mt: 3 }}>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
    <Typography variant="body2" color="text.secondary">
      {soldPercentage}%
    </Typography>
    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
      {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(event.price)}
    </Typography>
  </Box>
  <LinearProgress 
    variant="determinate" 
    value={soldPercentage} 
    sx={{
      height: 8,
      borderRadius: 4,
      bgcolor: 'rgba(255, 20, 147, 0.1)',
      '& .MuiLinearProgress-bar': {
        borderRadius: 4,
        background: 'linear-gradient(90deg, #FF1493 0%, #FF69B4 100%)',
      }
    }}
  />
</Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Events;