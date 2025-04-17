import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const { token } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/').replace(/\/?$/, '/');

  // Enhanced getCustomers with pagination and filtering
  const getCustomers = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
        params: {
          ...params,
          role: 'CUSTOMER'
        }
      });
      setCustomers(response.data.customers || []);
      return response.data;
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.response?.data?.error || 'Failed to fetch customers');
      toast.error(err.response?.data?.error || 'Failed to fetch customers');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Enhanced createCustomer with full customer data support
  const createCustomer = useCallback(async (customerData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}customers`, {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        password: customerData.password,
        gender: customerData.gender || 'male',
        idType: customerData.idType || 'passport',
        idNumber: customerData.idNumber || '',
        prayerInRoom: customerData.prayerInRoom || false,
        noAlcohol: customerData.noAlcohol ?? true,
        zabihahOnly: customerData.zabihahOnly ?? true,
        specialRequests: customerData.specialRequests || ''
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setCustomers(prev => [...prev, response.data.customer]);
      toast.success('Customer created successfully');
      return response.data.customer;
    } catch (err) {
      console.error('Error creating customer:', err);
      const errorMessage = err.response?.data?.error || 'Failed to create customer';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Enhanced updateCustomer with all customer fields
  const updateCustomer = useCallback(async (id, customerData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}customers/${id}`, {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        gender: customerData.gender,
        idType: customerData.idType,
        idNumber: customerData.idNumber,
        prayerInRoom: customerData.prayerInRoom,
        noAlcohol: customerData.noAlcohol,
        zabihahOnly: customerData.zabihahOnly,
        specialRequests: customerData.specialRequests
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setCustomers(prev => prev.map(c => 
        c.id === id ? { ...c, ...response.data.customer } : c
      ));
      toast.success('Customer updated successfully');
      return response.data.customer;
    } catch (err) {
      console.error('Error updating customer:', err);
      const errorMessage = err.response?.data?.error || 'Failed to update customer';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Enhanced deleteCustomer with better error handling
  const deleteCustomer = useCallback(async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCustomers(prev => prev.filter(c => c.id !== id));
      toast.success('Customer deleted successfully');
    } catch (err) {
      console.error('Error deleting customer:', err);
      const errorMessage = err.response?.data?.error || 'Failed to delete customer';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Toggle customer status
  const toggleCustomerStatus = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}customers/${id}/toggle-status`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCustomers(prev => prev.map(c => 
        c.id === id ? { ...c, is_active: !c.is_active } : c
      ));
      toast.success(`Customer ${response.data.customer.is_active ? 'activated' : 'deactivated'}`);
      return response.data.customer;
    } catch (err) {
      console.error('Error toggling customer status:', err);
      const errorMessage = err.response?.data?.error || 'Failed to toggle status';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const value = {
    customers,
    loading,
    error,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    toggleCustomerStatus
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};