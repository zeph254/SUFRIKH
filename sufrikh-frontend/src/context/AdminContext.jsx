// src/context/AdminContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/').replace(/\/?$/, '/');

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all admins
// src/context/AdminContext.jsx
const getAdmins = useCallback(async () => {
  setLoading(true);
  try {
    const response = await axios.get(`${API_URL}admin/admins`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Admins response:', response.data); // Debug log
    setAdmins(response.data.admins || response.data || []);
    return response.data.admins || response.data || [];
  } catch (err) {
    console.error('Error fetching admins:', err);
    setError(err.response?.data?.error || 'Failed to fetch admins');
    toast.error('Failed to fetch admins');
    throw err;
  } finally {
    setLoading(false);
  }
}, [token]);

  // Create a new admin


  const createAdmin = useCallback(async (adminData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}admin/admins`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setAdmins(prev => [...prev, response.data.admin]);
      toast.success('Admin created successfully');
      return response.data.admin;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         err.response?.data?.message || 
                         err.message || 
                         'Failed to create admin';
      
      // Specific handling for email conflict
      if (err.response?.status === 400 && 
          (errorMessage.toLowerCase().includes('email') || 
           errorMessage.toLowerCase().includes('already'))) {
        toast.error('This email address is already registered. Please use a different email.');
      } else {
        toast.error(errorMessage);
      }
      
      console.error('Admin creation error:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Update an admin
  const updateAdmin = useCallback(async (id, adminData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}admin/admins/${id}`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setAdmins(prev => prev.map(a => 
        a.id === id ? { ...a, ...response.data.admin } : a
      ));
      toast.success('Admin updated successfully');
      return response.data.admin;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update admin');
      toast.error(err.response?.data?.error || 'Failed to update admin');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);
  // Delete an admin
// Delete an admin
const deleteAdmin = useCallback(async (id) => {
  setLoading(true);
  try {
    await axios.delete(`${API_URL}admin/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAdmins(prev => prev.filter(a => a.id !== id));
    toast.success('Admin deleted successfully');
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to delete admin');
    toast.error(err.response?.data?.error || 'Failed to delete admin');
    throw err;
  } finally {
    setLoading(false);
  }
}, [token]);

// Toggle admin status
const toggleAdminStatus = useCallback(async (id) => {
  setLoading(true);
  try {
    const response = await axios.put(`${API_URL}admin/admins/${id}/toggle-status`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAdmins(prev => prev.map(a => 
      a.id === id ? { ...a, is_active: !a.is_active } : a
    ));
    toast.success('Admin status updated');
    return response.data.admin;
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to toggle admin status');
    toast.error('Failed to toggle admin status');
    throw err;
  } finally {
    setLoading(false);
  }
}, [token]);

  const value = {
    admins,
    loading,
    error,
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    toggleAdminStatus
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};