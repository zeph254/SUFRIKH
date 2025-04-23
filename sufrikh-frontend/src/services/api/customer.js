import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getCustomers = (token) => {
  return axios.get(`${API_URL}customers`, getAuthHeaders(token));
};

export const createCustomer = (customerData, token) => {
  return axios.post(`${API_URL}customers`, customerData, getAuthHeaders(token));
};

export const updateCustomer = (id, customerData, token) => {
  return axios.put(`${API_URL}customers/${id}`, customerData, getAuthHeaders(token));
};

export const deleteCustomer = (id, token) => {
  return axios.delete(`${API_URL}customers/${id}`, getAuthHeaders(token));
};

export const toggleCustomerStatus = (id, token) => {
  return axios.put(`${API_URL}customers/${id}/toggle-status`, {}, getAuthHeaders(token));
};