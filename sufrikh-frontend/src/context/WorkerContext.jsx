// src/context/WorkerContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const WorkerContext = createContext();

export const WorkerProvider = ({ children }) => {
  const { token } = useAuth();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all workers
  const getWorkers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/workers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkers(response.data.workers || []);
      return response.data.workers;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch workers');
      toast.error('Failed to fetch workers');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Create a new worker
  const createWorker = useCallback(async (workerData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/admin/workers', workerData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkers(prev => [...prev, response.data.worker]);
      toast.success('Worker created successfully');
      return response.data.worker;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create worker');
      toast.error(err.response?.data?.error || 'Failed to create worker');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Update a worker
  const updateWorker = useCallback(async (id, workerData) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/admin/workers/${id}`, workerData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkers(prev => prev.map(w => 
        w.id === id ? { ...w, ...response.data.worker } : w
      ));
      toast.success('Worker updated successfully');
      return response.data.worker;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update worker');
      toast.error(err.response?.data?.error || 'Failed to update worker');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Delete a worker
  const deleteWorker = useCallback(async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/admin/workers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkers(prev => prev.filter(w => w.id !== id));
      toast.success('Worker deleted successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete worker');
      toast.error(err.response?.data?.error || 'Failed to delete worker');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Toggle worker status
  const toggleWorkerStatus = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/admin/workers/${id}/toggle-status`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkers(prev => prev.map(w => 
        w.id === id ? { ...w, is_active: !w.is_active } : w
      ));
      toast.success('Worker status updated');
      return response.data.worker;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to toggle worker status');
      toast.error('Failed to toggle worker status');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const value = {
    workers,
    loading,
    error,
    getWorkers,
    createWorker,
    updateWorker,
    deleteWorker,
    toggleWorkerStatus
  };

  return (
    <WorkerContext.Provider value={value}>
      {children}
    </WorkerContext.Provider>
  );
};

export const useWorker = () => {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error('useWorker must be used within a WorkerProvider');
  }
  return context;
};