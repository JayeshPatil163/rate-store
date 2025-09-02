import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const createInitialAdmin = (adminData) => {
  return apiClient.post('/auth/add-initial-admin', adminData);
};

export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const loginUser = (loginData) => {
  return apiClient.post('/auth/login', loginData);
};

export const updatePassword = (passwordData) => {
  return apiClient.put('/auth/password', passwordData);
};

export const addUserByAdmin = (userData) => {
  return apiClient.post('/users', userData);
};

export const getUsers = (filters = {}) => {
  return apiClient.get('/users', { params: filters });
};

export const getUserDetails = (userId) => {
  return apiClient.get(`/users/${userId}`);
};

export const addStore = (storeData) => {
  return apiClient.post('/stores', storeData);
};

export const getStores = (filters = {}) => {
  return apiClient.get('/stores', { params: filters });
};

export const getStoreOwnerDashboard = () => {
  return apiClient.get('/stores/my-dashboard');
};

export const submitRating = (ratingData) => {
  return apiClient.post('/ratings', ratingData);
};

export const updateRating = (ratingId, ratingData) => {
  return apiClient.put(`/ratings/${ratingId}`, ratingData);
};

export const getDashboardStats = () => {
  return apiClient.get('/admin/stats');
};