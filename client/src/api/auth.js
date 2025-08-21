import api from './axios.js';

export const getRequest = () => api.get('/user');

export const getRequestUser = id => api.get(`/user/${id}`);

export const putRequest = (user, id) => api.put(`/user/${id}`, user);

export const deleteRequest = id => api.delete(`/user/${id}`);

export const addRequest = user => api.post('/user', user);
