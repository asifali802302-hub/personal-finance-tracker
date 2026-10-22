import axios from 'axios'

// Use VITE_API_URL in production (e.g. Render backend URL), or localhost in development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach Bearer token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('pft_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  me: () => API.get('/auth/me'),
}

export const transactionAPI = {
  getAll: () => API.get('/transactions'),
  create: (data) => API.post('/transactions', data),
  delete: (id) => API.delete(`/transactions/${id}`),
  getSummary: () => API.get('/transactions/summary'),
}

export default API
