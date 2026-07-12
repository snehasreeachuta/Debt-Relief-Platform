import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', new URLSearchParams(data)),
  register: (data) => API.post('/auth/register', data),
  getMe: () => API.get('/auth/me'),
};

export const loanAPI = {
  getLoans: () => API.get('/loans/'),
  createLoan: (data) => API.post('/loans/', data),
  deleteLoan: (id) => API.delete(`/loans/${id}`),
};

export const financialAPI = {
  getHealth: () => API.get('/financial/health'),
};

export const negotiationAPI = {
  predict: (loanId) => API.get(`/negotiation/predict/${loanId}`),
  generateLetter: (data) => API.post('/negotiation/generate-letter', data),
  getHistory: () => API.get('/negotiation/history'),
};