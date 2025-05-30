import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent,
  Typography, 
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DeleteIcon from '@mui/icons-material/Delete';
import { ticketService } from '../services/api';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await ticketService.getMyTickets();
      setTickets(data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowQR = (ticket) => {
    setSelectedTicket(ticket);
    setQrDialogOpen(true);
  };

  const handleDeleteClick = (e, ticket) => {
    e.stopPropagation();
    setTicketToDelete(ticket);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!ticketToDelete) return;

    try {
      await ticketService.deleteTicket(ticketToDelete.id);
      setTickets(tickets.filter(t => t.id !== ticketToDelete.id));
      setSnackbar({ 
        open: true, 
        message: 'Biljetten har tagits bort', 
        severity: 'success' 
      });
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error.response?.data || 'Kunde inte ta bort biljetten', 
        severity: 'error' 
      });
    } finally {
      setDeleteDialogOpen(false);
      setTicketToDelete(null);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Used':
        return 'default';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Laddar biljetter...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1C2346' }}>
        Mina Biljetter
      </Typography>
      
      {tickets.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Du har inga biljetter än. Utforska evenemang och köp din första biljett!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {tickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  position: 'relative',
                  '&:hover': { 
                    boxShadow: 6,
                    '& .delete-button': {
                      opacity: 1
                    }
                  }
                }}
                onClick={() => handleShowQR(ticket)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      Biljett-ID
                    </Typography>

                    {ticket.status === 'Active' ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          className="delete-button"
                          onClick={(e) => handleDeleteClick(e, ticket)}
                          size="small"
                          sx={{
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            backgroundColor: 'rgba(255, 20, 147, 0.1)',
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 20, 147, 0.2)',
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Chip 
                          label={ticket.status} 
                          color={getStatusColor(ticket.status)}
                          size="small"
                        />
                      </Box>
                    ) : (
                      <Chip 
                        label={ticket.status} 
                        color={getStatusColor(ticket.status)}
                        size="small"
                      />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {ticket.id.substring(0, 8)}...
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Köpdatum:
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(ticket.purchaseDate)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Pris:
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {ticket.price} kr
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, color: 'primary.main' }}>
                    <QrCodeIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Klicka för att visa QR-kod
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)}>
        <DialogTitle>Biljett QR-kod</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <img 
                src={`data:image/png;base64,${selectedTicket.qrCode}`} 
                alt="QR Code" 
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Biljett-ID: {selectedTicket.id}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Ta bort biljett</DialogTitle>
        <DialogContent>
          <Typography>
            Är du säker på att du vill ta bort denna biljett? Denna åtgärd kan inte ångras.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Avbryt
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Ta bort
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyTickets;