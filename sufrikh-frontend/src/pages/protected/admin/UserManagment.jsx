// src/pages/protected/admin/UserManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  FaUsers, FaUserPlus, FaSearch, FaUserEdit, FaUserTimes, FaPhone,
  FaUserShield, FaUserCog, FaUserTie, FaUser
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { useWorker } from '../../../context/WorkerContext';
import { useAdmin } from '../../../context/AdminContext';
import { useCustomer } from '../../../context/CustomerContext';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const { user: currentUser, token } = useAuth();
  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/').replace(/\/?$/, '/');

  // Context hooks for all user types
  const {
    workers,
    loading: workersLoading,
    getWorkers,
    createWorker,
    updateWorker,
    deleteWorker,
    toggleWorkerStatus
  } = useWorker();
  
  const {
    admins,
    loading: adminsLoading,
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    toggleAdminStatus
  } = useAdmin();

  const {
    customers: contextCustomers,
    loading: customersLoading,
    getCustomers: contextGetCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
  } = useCustomer();

  // State management
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('workers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',           // Add this
    confirmPassword: '',    // Add this
    gender: 'male',
    idType: 'passport',
    idNumber: '',
    prayerInRoom: false,
    noAlcohol: true,
    zabihahOnly: true,
    specialRequests: '',
    position: '',
    department: '',
    isSuperAdmin: false,
    notes: ''
  });

  // Local state for customers
  const [customers, setCustomers] = useState([]);

  // Enhanced getCustomers function with better error handling
  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });

      const receivedCustomers = response.data?.customers || 
                              (Array.isArray(response.data) ? response.data : []);
      
      const formattedCustomers = receivedCustomers.map(customer => ({
        ...customer,
        first_name: customer.firstName || customer.first_name,
        last_name: customer.lastName || customer.last_name,
        no_alcohol: customer.no_alcohol ?? true,
        zabihah_only: customer.zabihah_only ?? true
      }));

      setCustomers(formattedCustomers);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      toast.error(err.response?.data?.error || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch data based on active tab
  useEffect(() => {
    if (currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') {
      if (activeTab === 'workers') {
        getWorkers().catch(console.error);
      } else if (activeTab === 'admins') {
        getAdmins().catch(console.error);
      } else if (activeTab === 'customers') {
        getCustomers().catch(console.error);
      }
    }
  }, [currentUser, activeTab, getWorkers, getAdmins, getCustomers]);

  // Filter users based on search and active tab
  const filteredUsers = () => {
    const users = activeTab === 'workers' ? workers : 
                 activeTab === 'admins' ? admins : 
                 activeTab === 'customers' ? customers : [];
    
    return users.filter(user => {
      const userName = `${user.first_name || user.firstName} ${user.last_name || user.lastName}`.toLowerCase();
      return (
        userName.includes(searchTerm.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.position && user.position.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate permissions for admin management
      if (activeTab === 'admins' && currentUser.role !== 'SUPER_ADMIN') {
        toast.error('Only SUPER_ADMIN can manage admin accounts');
        return;
      }
  
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.error('First name, last name, and email are required');
        return;
      }
  
      // Password validation for new users
      if (!selectedUser) {
        if (!formData.password || !formData.confirmPassword) {
          toast.error('Both password fields are required');
          return;
        }
        
        if (formData.password.length < 8) {
          toast.error('Password must be at least 8 characters');
          return;
        }
  
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
      }
  
      // Prepare user data based on active tab
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || '',
        ...(activeTab === 'workers' && {
          position: formData.position.trim(),
          department: formData.department.trim()
        }),
        ...(activeTab === 'admins' && {
          isSuperAdmin: formData.isSuperAdmin
        }),
        ...(activeTab === 'customers' && {
          gender: formData.gender,
          idType: formData.idType,
          idNumber: formData.idNumber.trim(),
          prayerInRoom: formData.prayerInRoom,
          noAlcohol: formData.noAlcohol,
          zabihahOnly: formData.zabihahOnly,
          specialRequests: formData.specialRequests.trim(),
          notes: formData.notes.trim()
        }),
        ...(!selectedUser && { 
          password: formData.password 
        })
      };
  
      // Handle user creation/update
      if (selectedUser) {
        // Update existing user
        switch (activeTab) {
          case 'workers':
            await updateWorker(selectedUser.id, userData);
            break;
          case 'admins':
            await updateAdmin(selectedUser.id, userData);
            break;
          case 'customers':
            await updateCustomer(selectedUser.id, userData);
            break;
          default:
            throw new Error('Invalid user type');
        }
        toast.success(`${activeTab.slice(0, -1)} updated successfully!`);
      } else {
        // Create new user
        switch (activeTab) {
          case 'workers':
            await createWorker(userData);
            break;
          case 'admins':
            await createAdmin(userData);
            break;
          case 'customers':
            await createCustomer(userData);
            break;
          default:
            throw new Error('Invalid user type');
        }
        toast.success(`${activeTab.slice(0, -1)} created successfully!`);
      }
  
      // Reset form and close modal
      resetForm();
      setShowModal(false);
      
      // Refresh current tab's data
      switch (activeTab) {
        case 'workers':
          await getWorkers();
          break;
        case 'admins':
          await getAdmins();
          break;
        case 'customers':
          await getCustomers();
          break;
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      // Check for specific error cases
      let errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Operation failed';
      
      // Handle email already in use case
      if (error.response?.status === 400 && 
          (errorMessage.toLowerCase().includes('email') || 
           errorMessage.toLowerCase().includes('already'))) {
        errorMessage = 'This email address is already registered. Please use a different email.';
        
        // Focus on the email field if it exists in the modal
        const emailInput = document.querySelector('input[name="email"]');
        if (emailInput) {
          emailInput.focus();
        }
      }
      
      toast.error(errorMessage);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      idType: 'passport',
      idNumber: '',
      prayerInRoom: false,
      noAlcohol: true,
      zabihahOnly: true,
      specialRequests: '',
      position: '',
      department: '',
      isSuperAdmin: false,
      notes: ''
    });
  };

  // Toggle user active status
  const handleToggleStatus = async (userId) => {
    try {
      if (activeTab === 'workers') {
        await toggleWorkerStatus(userId);
      } else if (activeTab === 'admins') {
        await toggleAdminStatus(userId);
      }
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Open user modal for create/edit
  const openUserModal = (user = null) => {
    console.log('[DEBUG] Opening modal for:', activeTab);
    console.log('[DEBUG] Current user role:', currentUser?.role);
    console.log('[DEBUG] Selected user:', user);
    
    if (activeTab === 'admins' && currentUser.role !== 'SUPER_ADMIN') {
      console.log('[DEBUG] Blocked - insufficient permissions');
      toast.error('Only SUPER_ADMIN can manage admin accounts');
      return;
    }
    
    setSelectedUser(user);
    setFormData({
      firstName: user?.first_name || user?.firstName || '',
      lastName: user?.last_name || user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      password: '',
      confirmPassword: '',
      gender: user?.gender || 'male',
      idType: user?.id_type || user?.idType || 'passport',
      idNumber: user?.id_number || user?.idNumber || '',
      prayerInRoom: user?.prayer_in_room || user?.prayerInRoom || false,
      noAlcohol: user?.no_alcohol ?? user?.noAlcohol ?? true,
      zabihahOnly: user?.zabihah_only ?? user?.zabihahOnly ?? true,
      specialRequests: user?.special_requests || user?.specialRequests || '',
      position: user?.position || '',
      department: user?.department || '',
      isSuperAdmin: user?.is_super_admin || user?.isSuperAdmin || false,
      notes: user?.notes || ''
    });
    setShowModal(true);
  };

  // Render common fields for all user types

  // Render common fields for all user types
const renderCommonFields = () => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
        required
        disabled={!!selectedUser}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
        placeholder="+1234567890"
      />
    </div>
  </>
);

  // Render worker-specific fields
// Render worker-specific fields
const renderWorkerFields = () => (
  <>
    {!selectedUser && (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
            minLength="8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
            minLength="8"
          />
        </div>
      </>
    )}
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>
    </div>
  </>
);
  // Render admin-specific fields
// Render admin-specific fields
const renderAdminFields = () => (
  <>
    {!selectedUser && (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            required={!selectedUser}
            minLength="8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            required={!selectedUser}
            minLength="8"
          />
        </div>
      </>
    )}
    
    <div>
      <label className="flex items-center">
        <input
          type="checkbox"
          name="isSuperAdmin"
          checked={formData.isSuperAdmin}
          onChange={handleInputChange}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          disabled={currentUser.role !== 'SUPER_ADMIN'}
        />
        <span className="ml-2 text-sm text-gray-700">Super Admin Privileges</span>
      </label>
    </div>
  </>
);

  // Render customer-specific fields
  const renderCustomerFields = () => (
    <>

{!selectedUser && (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            required={!selectedUser}
            minLength="8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            required={!selectedUser}
            minLength="8"
          />
        </div>
      </>
    )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
          <select
            name="idType"
            value={formData.idType}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="passport">Passport</option>
            <option value="national-id">National ID</option>
            <option value="driving-license">Driving License</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Halal Preferences</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="prayerInRoom"
              checked={formData.prayerInRoom}
              onChange={handleInputChange}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Prayer amenities in room</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="noAlcohol"
              checked={formData.noAlcohol}
              onChange={handleInputChange}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">No alcohol</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="zabihahOnly"
              checked={formData.zabihahOnly}
              onChange={handleInputChange}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Zabihah-only meat</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          rows="3"
        />
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          rows="3"
        />
      </div> */}
    </>
  );

  // Render modal content based on active tab
  const renderModalContent = () => {
    return (
      <>
        {renderCommonFields()}
        {activeTab === 'workers' && renderWorkerFields()}
        {activeTab === 'admins' && renderAdminFields()}
        {activeTab === 'customers' && renderCustomerFields()}
      </>
    );
  };

  // Render customer preferences in table row
  const renderCustomerRow = (customer) => (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 text-xs rounded-full ${
          customer.no_alcohol ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {customer.no_alcohol ? 'Halal' : 'Standard'}
        </span>
        <span className={`px-2 py-1 text-xs rounded-full ${
          customer.zabihah_only ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {customer.zabihah_only ? 'Zabihah' : 'Any Meat'}
        </span>
      </div>
    </td>
  );

  // Render user table based on active tab
  const renderUserTable = () => {
    const users = filteredUsers();
    const loading = activeTab === 'workers' ? workersLoading : 
                  activeTab === 'admins' ? adminsLoading : 
                  customersLoading;

    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      );
    }

    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            {activeTab === 'workers' && (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
              </>
            )}
            {activeTab === 'admins' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            )}
            {activeTab === 'customers' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preferences
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      {(user.first_name?.charAt(0) || user.firstName?.charAt(0) || '')}{(user.last_name?.charAt(0) || user.lastName?.charAt(0) || '')}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.first_name || user.firstName} {user.last_name || user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center">
                    <FaPhone className="mr-2 text-gray-400" /> {user.phone || 'N/A'}
                  </div>
                </td>
                {activeTab === 'workers' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.position || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.department || 'N/A'}
                      </div>
                    </td>
                  </>
                )}
                {activeTab === 'admins' && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.is_super_admin || user.isSuperAdmin ? 'Super Admin' : 'Admin'}
                    </div>
                  </td>
                )}
                {activeTab === 'customers' && renderCustomerRow(user)}
                <td className="px-6 py-4 whitespace-nowrap">
                <button
                   onClick={() => handleToggleStatus(user.id)}
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  disabled={activeTab === 'admins' && currentUser.role !== 'SUPER_ADMIN'}
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => openUserModal(user)}
                    className="text-emerald-600 hover:text-emerald-900 mr-4"
                    title={`Edit ${activeTab.slice(0, -1)}`}
                    disabled={activeTab === 'admins' && currentUser.role !== 'SUPER_ADMIN'}
                  >
                    <FaUserEdit />
                  </button>
                  <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowDeleteConfirm(true);
                  }}
                  className="text-red-600 hover:text-red-900"
                  title={`Delete ${activeTab.slice(0, -1)}`}
                  disabled={user.id === currentUser?.id || 
                          (activeTab === 'admins' && currentUser.role !== 'SUPER_ADMIN')}
                >
                  <FaUserTimes />
                </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={activeTab === 'workers' ? 6 : activeTab === 'admins' ? 5 : 5}
                className="px-6 py-4 text-center text-gray-500">
                No {activeTab} found matching your search criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  // Check if user has admin privileges
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPER_ADMIN')) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-emerald-800 flex items-center">
              <FaUsers className="mr-2" /> User Management
            </h1>
            <p className="text-gray-600">
              Manage all user accounts for your organization
            </p>
          </div>
          <button
            onClick={() => {
              console.log('Add button clicked'); // Debug
              openUserModal();
            }}
            className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={activeTab === 'admins' && currentUser.role !== 'SUPER_ADMIN'}
          >
            <FaUserPlus className="mr-2" /> Add New {activeTab === 'workers' ? 'Worker' : activeTab === 'admins' ? 'Admin' : 'Customer'}
          </button>
        </div>    

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('workers')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'workers'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaUserTie className="mr-2" /> Workers
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'admins'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaUserShield className="mr-2" /> Admins
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'customers'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaUser className="mr-2" /> Customers
            </button>
          </nav>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${activeTab} by name, email...`}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {renderUserTable()}
          </div>
        </div>

        {/* User Edit/Create Modal */}
        {showModal && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={(e) => {
                // Only close if clicking directly on the backdrop
                if (e.target === e.currentTarget) {
                  setShowModal(false);
                }
              }}
  >   
          
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    {selectedUser ? <FaUserEdit className="mr-2" /> : <FaUserPlus className="mr-2" />}
                    {selectedUser ? `Edit ${activeTab.slice(0, -1)}` : `Create New ${activeTab === 'workers' ? 'Worker' : activeTab === 'admins' ? 'Admin' : 'Customer'}`}
                  </h2>
                  <div className="space-y-4">
                    {renderModalContent()}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      disabled={activeTab === 'admins' && currentUser.role !== 'SUPER_ADMIN'}
                    >
                      {selectedUser ? 'Update' : 'Create'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-red-600 flex items-center">
                  <FaUserTimes className="mr-2" /> Confirm Deletion
                </h2>
                <p className="mb-6">
                  Are you sure you want to delete {activeTab.slice(0, -1)} <strong>{selectedUser?.first_name || selectedUser?.firstName} {selectedUser?.last_name || selectedUser?.lastName}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                 
                  <button
                  // In the delete confirmation modal (replace the current onClick handler):
                  onClick={async () => {
                    try {
                      let success;
                      if (activeTab === 'workers') {
                        success = await deleteWorker(selectedUser.id);
                      } else if (activeTab === 'admins') {
                        success = await deleteAdmin(selectedUser.id);
                      } else {
                        success = await deleteCustomer(selectedUser.id);
                      }
                      
                      if (success) {
                        setShowDeleteConfirm(false);
                        // Refresh the current tab's data
                        if (activeTab === 'workers') {
                          await getWorkers();
                        } else if (activeTab === 'admins') {
                          await getAdmins();
                        } else {
                          await getCustomers();
                        }
                      }
                    } catch (error) {
                      console.error('Delete error:', error);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;