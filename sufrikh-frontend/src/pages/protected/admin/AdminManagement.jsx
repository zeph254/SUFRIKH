import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/api/auth';

const AdminManagement = () => {
  const { user, token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    firstName: '',
    lastName: '',
    isSuperAdmin: false
  });

  useEffect(() => {
    if (user?.is_super_admin) {
      loadAdmins();
      loadWorkers();
    }
  }, [user]);

  const loadAdmins = async () => {
    try {
      const response = await authService.getAdmins(token);
      setAdmins(response.data.admins);
    } catch (error) {
      console.error('Failed to load admins', error);
    }
  };

  const handleCreateAdmin = async () => {
    try {
      await authService.createAdmin(newAdmin, token);
      toast.success('Admin created!');
      loadAdmins();
      setNewAdmin({ /* reset form */ });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Creation failed');
    }
  };

  return (
    <div className="p-6">
      {/* Admin Creation Form */}
      {user?.is_super_admin && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Create New Admin</h3>
          {/* Form fields here */}
          <button onClick={handleCreateAdmin}>Create Admin</button>
        </div>
      )}

      {/* Admins List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {admins.map(admin => (
          <AdminCard 
            key={admin.id} 
            admin={admin} 
            currentUser={user}
          />
        ))}
      </div>

      {/* Workers Management (similar structure) */}
    </div>
  );
};