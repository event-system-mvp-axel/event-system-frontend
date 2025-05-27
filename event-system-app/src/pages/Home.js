import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import GroupIcon from '@mui/icons-material/Group';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Välkommen till Event System
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Upptäck och boka biljetter till fantastiska evenemang
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/events"
          sx={{ mt: 2 }}
        >
          Utforska Evenemang
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
            <EventIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Upptäck Evenemang
            </Typography>
            <Typography color="text.secondary">
              Bläddra bland hundratals evenemang i olika kategorier
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
            <ConfirmationNumberIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Enkel Bokning
            </Typography>
            <Typography color="text.secondary">
              Boka biljetter snabbt och säkert med några få klick
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
            <GroupIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Dela Upplevelser
            </Typography>
            <Typography color="text.secondary">
              Gå på evenemang tillsammans med vänner och familj
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
