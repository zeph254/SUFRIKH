import React, { useState } from 'react';
import { 
  FaUsers, FaUserPlus, FaSearch, FaUserEdit, 
  FaUserShield, FaUserTimes, FaPrayingHands,
  FaQuran, FaIdCard, FaEnvelope, FaPhone
} from 'react-icons/fa';
import { GiPrayerBeads } from 'react-icons/gi';

const UserManagement = () => {
  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ahmed Khan',
      email: 'ahmed@sufrikh.com',
      role: 'Manager',
      phone: '+966 50 123 4567',
      status: 'active',
      prayerAccess: true,
      lastLogin: '2 hours ago'
    },
    {
      id: 2,
      name: 'Fatima Al-Mansoor',
      email: 'fatima@sufrikh.com',
      role: 'Receptionist',
      phone: '+966 50 765 4321',
      status: 'active',
      prayerAccess: false,
      lastLogin: '1 day ago'
    },
    {
      id: 3,
      name: 'Yusuf Abdullah',
      email: 'yusuf@sufrikh.com',
      role: 'Housekeeping',
      phone: '+966 50 987 6543',
      status: 'inactive',
      prayerAccess: true,
      lastLogin: '1 week ago'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user status change
  const toggleStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  // Handle prayer access change
  const togglePrayerAccess = (userId) => {
    setUsers(users.map(user =>
      user.id === userId 
        ? { ...user, prayerAccess: !user.prayerAccess }
        : user
    ));
  };

  // Handle user deletion
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteConfirm(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-emerald-800 flex items-center">
              <FaUsers className="mr-2" /> User Management
            </h1>
            <p className="text-gray-600">Manage all staff accounts and permissions</p>
          </div>
          <button 
            onClick={() => {
              setCurrentUser(null);
              setShowModal(true);
            }}
            className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaUserPlus className="mr-2" /> Add New User
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name, email or role..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <select className="border rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500">
                <option>All Roles</option>
                <option>Manager</option>
                <option>Receptionist</option>
                <option>Housekeeping</option>
                <option>Kitchen Staff</option>
              </select>
              <select className="border rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prayer Access
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaPhone className="mr-2 text-gray-400" /> {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => togglePrayerAccess(user.id)}
                          className={`p-1 rounded-full ${user.prayerAccess ? 'text-green-600 bg-green-100' : 'text-gray-400 bg-gray-100'}`}
                          title={user.prayerAccess ? 'Revoke prayer access' : 'Grant prayer access'}
                        >
                          <FaPrayingHands />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setCurrentUser(user);
                            setShowModal(true);
                          }}
                          className="text-emerald-600 hover:text-emerald-900 mr-4"
                          title="Edit user"
                        >
                          <FaUserEdit />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentUser(user);
                            setShowDeleteConfirm(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Delete user"
                        >
                          <FaUserTimes />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No users found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Edit/Create Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  {currentUser ? <FaUserEdit className="mr-2" /> : <FaUserPlus className="mr-2" />}
                  {currentUser ? 'Edit User' : 'Create New User'}
                </h2>
                
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.name || ''}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        defaultValue={currentUser?.email || ''}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter email address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue={currentUser?.phone || ''}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select 
                        defaultValue={currentUser?.role || ''}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="">Select role</option>
                        <option value="Manager">Manager</option>
                        <option value="Receptionist">Receptionist</option>
                        <option value="Housekeeping">Housekeeping</option>
                        <option value="Kitchen Staff">Kitchen Staff</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="prayerAccess"
                        defaultChecked={currentUser?.prayerAccess || false}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="prayerAccess" className="ml-2 block text-sm text-gray-700">
                        Grant prayer facility access
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      {currentUser ? 'Update User' : 'Create User'}
                    </button>
                  </div>
                </form>
              </div>
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
                  Are you sure you want to delete user <strong>{currentUser?.name}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteUser(currentUser.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete User
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