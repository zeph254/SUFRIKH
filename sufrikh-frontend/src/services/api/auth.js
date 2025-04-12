import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  return {
    headers: {
      Authorization: `Bearer ${auth?.token}`,
    },
  };
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    if (!response.data.token) {
      throw new Error('No token received');
    }

    const authData = {
      token: response.data.token,
      user: {
        id: response.data.user.id,
        email: response.data.user.email,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        role: response.data.user.role,
        profile_picture: response.data.user.profile_picture || null // Explicitly set to null if not provided
      }
    };
    
    localStorage.setItem('auth', JSON.stringify(authData));
    return authData;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
const logout = () => {
  localStorage.removeItem('auth');
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/password/forgot`, { email });
  return response.data;
};

const resetPassword = async (token, password) => {
  const response = await axios.put(`${API_URL}/password/reset/${token}`, { password });
  return response.data;
};
// services/api/auth.js

// auth.js
const getUser = async (id, token) => {
  if (!id) throw new Error('User ID is required');
  
  const response = await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });

  if (response.status === 401) {
    throw new Error('Token expired or invalid');
  }

  // Ensure all fields are returned
  return {
    ...response.data,
    profile_picture: response.data.profile_picture || null,
    phone: response.data.phone || '',
    gender: response.data.gender || 'male',
    id_type: response.data.id_type || 'passport',
    id_number: response.data.id_number || '',
    prayer_in_room: response.data.prayer_in_room || false,
    no_alcohol: response.data.no_alcohol ?? true,
    zabihah_only: response.data.zabihah_only ?? true,
    special_requests: response.data.special_requests || ''
  };
};

const updateUser = async (id, userData, token) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Frontend API call
const uploadProfilePicture = async (userId, file, token) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(
    `${API_URL}/users/upload-profile`,  // Consistent endpoint
    formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};

const deleteUser = async (id, token) => {
  const response = await axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  uploadProfilePicture,
  getUser,
  updateUser,
  deleteUser
};