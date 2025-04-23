// src/services/api/admin.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Worker management
export const getWorkers = (token) => {
  return axios.get(`${API_URL}admin/workers`, getAuthHeaders(token));
};

export const createWorker = (workerData, token) => {
  return axios.post(`${API_URL}admin/workers`, workerData, getAuthHeaders(token));
};

export const updateWorker = (id, workerData, token) => {
  return axios.put(`${API_URL}admin/workers/${id}`, workerData, getAuthHeaders(token));
};

export const deleteWorker = (id, token) => {
  return axios.delete(`${API_URL}admin/workers/${id}`, getAuthHeaders(token));
};

export const toggleWorkerStatus = (id, token) => {
  return axios.put(`${API_URL}admin/workers/${id}/toggle-status`, {}, getAuthHeaders(token));
};

// Admin management
// src/services/api/admin.js
export const getAdmins = (token) => {
  return axios.get(`${API_URL}admin/admins`, getAuthHeaders(token));
};

export const createAdmin = (adminData, token) => {
  return axios.post(`${API_URL}admin/admins`, adminData, getAuthHeaders(token));
};

export const updateAdmin = (id, adminData, token) => {
  return axios.put(`${API_URL}admin/admins/${id}`, adminData, getAuthHeaders(token));
};

export const deleteAdmin = (id, token) => {
  return axios.delete(`${API_URL}admin/admins/${id}`, getAuthHeaders(token)); // Fixed path
};

export const toggleAdminStatus = (id, token) => {
  return axios.put(`${API_URL}admin/admins/${id}/toggle-status`, {}, getAuthHeaders(token)); // Fixed path
};