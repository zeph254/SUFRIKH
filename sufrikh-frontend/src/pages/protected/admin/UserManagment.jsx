// src/pages/protected/admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
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
  const { user: currentUser } = useAuth();
  
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
    customers,
    loading: customersLoading,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
  } = useCustomer();

  // State management
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
                
    return users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.position && user.position.toLowerCase().includes(searchTerm.toLowerCase()))
    );
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
      if (!selectedUser && formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
  
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        ...(activeTab === 'workers' && {
          position: formData.position,
          department: formData.department
        }),
        ...(activeTab === 'admins' && {
          isSuperAdmin: formData.isSuperAdmin
        }),
        ...(activeTab === 'customers' && {
          gender: formData.gender,
          idType: formData.idType,
          idNumber: formData.idNumber,
          prayerInRoom: formData.prayerInRoom,
          noAlcohol: formData.noAlcohol,
          zabihahOnly: formData.zabihahOnly,
          specialRequests: formData.specialRequests,
          notes: formData.notes
        }),
        ...(!selectedUser && { password: formData.password })
      };
  
      if (selectedUser) {
        // Update existing user
        if (activeTab === 'workers') {
          await updateWorker(selectedUser.id, userData);
        } else if (activeTab === 'admins') {
          await updateAdmin(selectedUser.id, userData);
        } else if (activeTab === 'customers') {
          await updateCustomer(selectedUser.id, userData);
        }
        toast.success(`${activeTab.slice(0, -1)} updated successfully!`);
      } else {
        // Create new user
        if (activeTab === 'workers') {
          await createWorker(userData);
        } else if (activeTab === 'admins') {
          await createAdmin(userData);
        } else if (activeTab === 'customers') {
          await createCustomer(userData);
        }
        toast.success(`${activeTab.slice(0, -1)} created successfully!`);
      }
  
      resetForm();
      setShowModal(false);
      
      // Refresh current tab's data
      if (activeTab === 'workers') {
        await getWorkers();
      } else if (activeTab === 'admins') {
        await getAdmins();
      } else if (activeTab === 'customers') {
        await getCustomers();
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Operation failed');
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
    setSelectedUser(user);
    setFormData({
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      password: '',
      confirmPassword: '',
      gender: user?.gender || 'male',
      idType: user?.id_type || 'passport',
      idNumber: user?.id_number || '',
      prayerInRoom: user?.prayer_in_room || false,
      noAlcohol: user?.no_alcohol ?? true,
      zabihahOnly: user?.zabihah_only ?? true,
      specialRequests: user?.special_requests || '',
      position: user?.position || '',
      department: user?.department || '',
      isSuperAdmin: user?.is_super_admin || false,
      notes: user?.notes || ''
    });
    setShowModal(true);
  };

  // Render customer-specific fields
  const renderCustomerFields = () => (
    <>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          rows="3"
        />
      </div>
    </>
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
                      {(user.first_name?.charAt(0) || '')}{(user.last_name?.charAt(0) || '')}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.first_name} {user.last_name}
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
                      {user.is_super_admin ? 'Super Admin' : 'Admin'}
                    </div>
                  </td>
                )}
                {activeTab === 'customers' && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {user.prayer_in_room && 'Prayer '}
                      {user.no_alcohol && 'No Alcohol '}
                      {user.zabihah_only && 'Zabihah '}
                      {!user.prayer_in_room && !user.no_alcohol && !user.zabihah_only && 'N/A'}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openUserModal(user)}
                    className="text-emerald-600 hover:text-emerald-900 mr-4"
                    title={`Edit ${activeTab.slice(0, -1)}`}
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
                    disabled={user.id === currentUser?.id}
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

  // Render modal content based on active tab
  const renderModalContent = () => {
    return (
      <>
        {/* Common fields */}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="+1234567890"
            pattern="\+?[0-9]{10,15}"
          />
          <p className="text-xs text-gray-500 mt-1">Format: +1234567890 (10-15 digits)</p>
        </div>

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
              />
            </div>
          </>
        )}

        {/* Role-specific fields */}
        {activeTab === 'workers' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
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
              />
            </div>
          </>
        )}

        {activeTab === 'admins' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isSuperAdmin"
              id="isSuperAdmin"
              checked={formData.isSuperAdmin}
              onChange={handleInputChange}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="isSuperAdmin" className="ml-2 block text-sm text-gray-700">
              Super Admin Privileges
            </label>
          </div>
        )}

        {activeTab === 'customers' && renderCustomerFields()}
      </>
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
            onClick={() => openUserModal()}
            className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                  Are you sure you want to delete {activeTab.slice(0, -1)} <strong>{selectedUser?.first_name} {selectedUser?.last_name}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        if (activeTab === 'workers') {
                          await deleteWorker(selectedUser.id);
                        } else if (activeTab === 'admins') {
                          await deleteAdmin(selectedUser.id);
                        } else if (activeTab === 'customers') {
                          await deleteCustomer(selectedUser.id);
                        }
                        setShowDeleteConfirm(false);
                        toast.success(`${activeTab.slice(0, -1)} deleted successfully`);
                      } catch (error) {
                        toast.error(error.message || 'Deletion failed');
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