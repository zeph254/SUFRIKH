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

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/').replace(/\/?$/, '/');

  // Get all workers
// src/context/WorkerContext.jsx
const getWorkers = useCallback(async () => {
  setLoading(true);
  try {
    const response = await axios.get(`${API_URL}admin/workers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      params: {
        t: Date.now() // Cache buster
      }
    });
    console.log('Workers response:', response.data); // Debug log
    setWorkers(response.data.workers || response.data || []);
    return response.data.workers || response.data || [];
  } catch (err) {
    console.error('Error fetching workers:', err);
    setError(err.response?.data?.error || 'Failed to fetch workers');
    toast.error('Failed to fetch workers');
    throw err;
  } finally {
    setLoading(false);
  }
}, [token]);


const toggleWorkerStatus = useCallback(async (id) => {
  setLoading(true);
  try {
    const response = await axios.put(`${API_URL}admin/workers/${id}/toggle-status`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setWorkers(prev => prev.map(w => 
      w.id === id ? { ...w, is_active: !w.is_active } : w
    ));
    return response.data;
  } catch (err) {
    console.error('Error toggling worker status:', err);
    throw err;
  } finally {
    setLoading(false);
  }
}, [token]);

  // Create a new worker
  const createWorker = useCallback(async (workerData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}admin/workers`, workerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      // Check for success flag in response
      if (!response.data.success) {
        throw new Error(response.data.error || 'Worker creation failed');
      }
  
      setWorkers(prev => [...prev, response.data.worker]);
      toast.success(response.data.message || 'Worker created successfully');
      return response.data.worker;
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to create worker';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Update a worker
// Update a worker
const updateWorker = useCallback(async (id, workerData) => {
  console.log('Updating worker:', id, workerData); // Debug log
  setLoading(true);
  try {
    const response = await axios.put(`${API_URL}admin/workers/${id}`, workerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Update response:', response.data); // Debug log
    
    setWorkers(prev => {
      const updatedWorkers = prev.map(w => 
        w.id === id ? { 
          ...w, 
          ...response.data.worker,
          position: response.data.worker.position,
          department: response.data.worker.department,
          is_active: response.data.worker.is_active
        } : w
      );
      console.log('Updated workers state:', updatedWorkers); // Debug log
      return updatedWorkers;
    });
    
    toast.success('Worker updated successfully');
    return response.data.worker;
  } catch (err) {
    console.error('Update error:', err.response?.data || err.message);
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
    console.log('Attempting to delete worker:', id);
    
    // Validate ID
    if (!id || isNaN(Number(id))) {
      throw new Error('Invalid worker ID');
    }

    const response = await axios.delete(`${API_URL}admin/workers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Only update state if deletion was successful
    if (response.data.success) {
      setWorkers(prev => prev.filter(w => w.id !== Number(id)));
      toast.success(response.data.message || 'Worker deleted successfully');
    }
    
    return response.data;
  } catch (err) {
    console.error('Full delete error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });

    let errorMessage = 'Failed to delete worker';
    if (err.response?.data?.error) {
      errorMessage = err.response.data.error;
    } else if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    }

    // Don't show toast for 404 errors (worker already gone)
    if (err.response?.status !== 404) {
      toast.error(errorMessage);
    }

    throw err;
  } finally {
    setLoading(false);
  }
}, [token]);
  // Toggle worker status
  // const toggleWorkerStatus = useCallback(async (id) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.put(`admin/workers/${id}/toggle-status`, {}, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     setWorkers(prev => prev.map(w => 
  //       w.id === id ? { ...w, is_active: !w.is_active } : w
  //     ));
  //     toast.success('Worker status updated');
  //     return response.data.worker;
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Failed to toggle worker status');
  //     toast.error('Failed to toggle worker status');
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [token]);

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