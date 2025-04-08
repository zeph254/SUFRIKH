import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Helper to get the token from localStorage
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// auth.js
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  if (response.data.token && response.data.user) {
    // Ensure we only store what we need
    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify({ token, user }));
    return { token, user };
  }
  throw new Error('Invalid login response');
};

// Update other methods to match this pattern

const logout = () => {
  localStorage.removeItem('user');
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/password/forgot`, { email });
  return response.data;
};

const resetPassword = async (token, password) => {
  const response = await axios.put(`${API_URL}/password/reset/${token}`, { password });
  return response.data;
};

// ⭐ NEW FUNCTIONS

// Get a single user by ID
const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`, getAuthHeaders());
  return response.data;
};

// Update a user
const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData, getAuthHeaders());
  return response.data;
};

// Delete a user
const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`, getAuthHeaders());
  return response.data;
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  deleteUser
};
