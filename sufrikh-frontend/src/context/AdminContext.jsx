// src/context/AdminContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all admins
  const getAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/admins', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAdmins(response.data.admins || []);
      return response.data.admins;
    } catch (err) {
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
      const response = await axios.post('/api/admin/admins', adminData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAdmins(prev => [...prev, response.data.admin]);
      toast.success('Admin created successfully');
      return response.data.admin;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create admin');
      toast.error(err.response?.data?.error || 'Failed to create admin');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Update an admin
  const updateAdmin = useCallback(async (id, adminData) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/admin/admins/${id}`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`
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
  const deleteAdmin = useCallback(async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/admin/admins/${id}`, {
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
      const response = await axios.put(`/api/admin/admins/${id}/toggle-status`, {}, {
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