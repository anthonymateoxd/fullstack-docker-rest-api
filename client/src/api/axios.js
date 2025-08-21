import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.8:4000/api',
  withCredentials: true,
});

// const api = axios.create({
//   baseURL: 'http://localhost:4000/api',
//   withCredentials: true,
// });

export default api;
