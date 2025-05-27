import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Skapa axios instanser för varje service
const userAPI = axios.create({
  baseURL: 'http://localhost:5181/api'  // User Service
});

const eventAPI = axios.create({
  baseURL: 'http://localhost:5098/api'  // Event Service
});

const ticketAPI = axios.create({
  baseURL: 'http://localhost:5164/api'  // Ticket Service
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
  }
};

export { setAuthToken };