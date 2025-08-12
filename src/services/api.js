import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecommerce-backend-jd6l.onrender.com/api',
  withCredentials: true,
});

export default api;
