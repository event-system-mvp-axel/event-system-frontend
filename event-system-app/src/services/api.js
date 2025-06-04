import axios from 'axios';

// Skapa axios instanser för varje service med Azure URLs
const userAPI = axios.create({
  baseURL: `${process.env.REACT_APP_USER_API}/api`  // User Service
});

const eventAPI = axios.create({
  baseURL: `${process.env.REACT_APP_EVENT_API}/api`  // Event Service
});

const ticketAPI = axios.create({
  baseURL: `${process.env.REACT_APP_TICKET_API}/api`  // Ticket Service
});

// Lägg till JWT token till requests
const setAuthToken = (token) => {
  if (token) {
    userAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    eventAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    ticketAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete userAPI.defaults.headers.common['Authorization'];
    delete eventAPI.defaults.headers.common['Authorization'];
    delete ticketAPI.defaults.headers.common['Authorization'];
  }
};

// User Service
export const authService = {
  login: async (email, password) => {
    const response = await userAPI.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await userAPI.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await userAPI.get('/users/profile');
    return response.data;
  },
  changePassword: async (currentPassword, newPassword) => {
    const response = await userAPI.put('/users/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  }
};

// Event Service
export const eventService = {
  getAllEvents: async () => {
    const response = await eventAPI.get('/events');
    return response.data;
  },
  getEvent: async (id) => {
    const response = await eventAPI.get(`/events/${id}`);
    return response.data;
  },
  searchEvents: async (query) => {
    const response = await eventAPI.get(`/events/search?q=${query}`);
    return response.data;
  }
};

// Ticket Service
export const ticketService = {
  purchaseTicket: async (eventId, price) => {
    const response = await ticketAPI.post('/tickets/purchase', { eventId, price });
    return response.data;
  },
  getMyTickets: async () => {
    const response = await ticketAPI.get('/tickets/my-tickets');
    return response.data;
  },
  getTicket: async (id) => {
    const response = await ticketAPI.get(`/tickets/${id}`);
    return response.data;
  },
  deleteTicket: async (id) => {
    const response = await ticketAPI.delete(`/tickets/${id}`);
    return response.data;
  }
};

export { setAuthToken };