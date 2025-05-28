import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Register a new user
// In your auth.js service file, update the register function:


// Update the register function in auth.js:
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    
    // Return the response data but don't automatically persist auth
    return {
      success: true,
      requiresVerification: true,
      token: response.data.token,
      user: {
        ...response.data.user,
        is_verified: response.data.user.is_verified || false,
        profile_picture: response.data.user.profile_picture || null,
        phone: response.data.user.phone || '',
        gender: response.data.user.gender || 'male',
        id_type: response.data.user.id_type || 'passport',
        id_number: response.data.user.id_number || '',
        prayer_in_room: response.data.user.prayer_in_room || false,
        no_alcohol: response.data.user.no_alcohol ?? true,
        zabihah_only: response.data.user.zabihah_only ?? true,
        special_requests: response.data.user.special_requests || ''
      },
      redirectTo: '/verify-otp'
    };
  } catch (error) {
    console.error('Registration error:', {
      message: error.message,
      response: error.response?.data,
      config: error.config
    });
    throw error;
  }
};

// Login user and fetch complete user profile
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    console.log('Full login response:', response.data); // Debug log
    
    if (!response.data?.token || !response.data?.user?.id) {
      throw new Error('Invalid authentication response');
    }

    return {
      success: response.data.success,
      token: response.data.token,
      user: {
        ...response.data.user,
        profile_picture: response.data.user.profile_picture || null,
        phone: response.data.user.phone || '',
        gender: response.data.user.gender || 'male'
      },
      requiresVerification: response.data.requiresVerification // Ensure this is included
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
// Logout user
const logout = () => {
  localStorage.removeItem('auth');
};

// Forgot password request

// Helper function to get auth headers


// Forgot password request
const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/password/forgot`, { email });
    return response.data;
  } catch (error) {
    console.error('Forgot password error:', {
      url: error.config.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.error || 'Failed to send reset email');
  }
};

// Reset password
const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`${API_URL}/password/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.message || 
      'Failed to reset password. The link may have expired.'
    );
  }
};
// Get user details
const getUser = async (id, token) => {
  if (!id) throw new Error('User ID is required');
  if (!token) throw new Error('Token is required');

  try {
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
  } catch (error) {
    console.error('User fetch error:', {
      status: error.response?.status,
      message: error.message,
      config: error.config
    });
    throw error;
  }
};

// Update user details
const updateUser = async (id, userData, token) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData, getAuthHeaders(token));
  return response.data;
};

// Upload profile picture
const uploadProfilePicture = async (userId, file, token) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(
    `${API_URL}/users/upload-profile`,
    formData,
    {
      ...getAuthHeaders(token),
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

// Delete user
const deleteUser = async (id, token) => {
  const response = await axios.delete(`${API_URL}/users/${id}`, getAuthHeaders(token));
  return response.data;
};

// Create admin
const createAdmin = async (adminData, token) => {
  const response = await axios.post(`${API_URL}/admin/admins`, adminData, getAuthHeaders(token));
  return response.data;
};

// Create worker
const createWorker = async (workerData, token) => {
  const response = await axios.post(`${API_URL}/admin/workers`, workerData, getAuthHeaders(token));
  return response.data;
};

// Export all functions
export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  uploadProfilePicture,
  getUser,
  updateUser,
  deleteUser,
  createAdmin,
  createWorker,
  getAdmins: (token) => axios.get(`${API_URL}/admin/admins`, getAuthHeaders(token)),
  getWorkers: (token) => axios.get(`${API_URL}/admin/workers`, getAuthHeaders(token)),
};