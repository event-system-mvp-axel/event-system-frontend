import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Home = () => {
  const cards = [
    {
      icon: <EventIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Upptäck Evenemang',
      text: 'Bläddra bland hundratals evenemang i olika kategorier',
      bg: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
      borderColor: 'rgba(255, 20, 147, 0.1)',
      bgColor: 'rgba(255, 20, 147, 0.05)',
      hoverShadow: '0 8px 24px rgba(255, 20, 147, 0.15)',
    },
    {
      icon: <ConfirmationNumberIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Enkel Bokning',
      text: 'Boka biljetter snabbt och säkert med några få klick',
      bg: 'linear-gradient(135deg, #4B0082 0%, #6A5ACD 100%)',
      borderColor: 'rgba(75, 0, 130, 0.1)',
      bgColor: 'rgba(75, 0, 130, 0.05)',
      hoverShadow: '0 8px 24px rgba(75, 0, 130, 0.15)',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Dela Upplevelser',
      text: 'Gå på evenemang tillsammans med vänner och familj',
      bg: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)',
      borderColor: 'rgba(255, 105, 180, 0.1)',
      bgColor: 'rgba(255, 105, 180, 0.05)',
      hoverShadow: '0 8px 24px rgba(255, 105, 180, 0.15)',
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Säkra Transaktioner',
      text: 'Din betalning hanteras tryggt och säkert med pålitlig teknik',
      bg: 'linear-gradient(135deg, #6A5ACD 0%, #8A2BE2 100%)',
      borderColor: 'rgba(106, 90, 205, 0.1)',
      bgColor: 'rgba(106, 90, 205, 0.05)',
      hoverShadow: '0 8px 24px rgba(106, 90, 205, 0.15)',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FF1493 0%, #4B0082 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Välkommen till Event System
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Upptäck och boka biljetter till fantastiska evenemang
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/events"
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
          }}
        >
          Utforska Evenemang
        </Button>
      </Box>

      {/* Flex layout istället för Grid */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'space-between',
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: { xs: '100%', sm: '48%', md: '48%' },
              display: 'flex',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: 'center',
                width: '100%',
                bgcolor: card.bgColor,
                border: '1px solid',
                borderColor: card.borderColor,
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                minHeight: 280,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: card.hoverShadow,
                },
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: card.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                {card.icon}
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {card.title}
              </Typography>
              <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                {card.text}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
