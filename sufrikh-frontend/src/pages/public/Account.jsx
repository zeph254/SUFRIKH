import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  AuthContext  from '../../context/AuthContext';
import { FaUser, FaHistory, FaPrayingHands, FaStar, FaCog, FaSignOutAlt, 
         FaCheckCircle, FaCamera, FaTrash, FaPhone, FaVenusMars, FaIdCard } from 'react-icons/fa';
import { GiMeal, GiPrayerBeads } from 'react-icons/gi';

const AccountPage = () => {
  const { 
    user, 
    logout, 
    updateUser, 
    deleteAccount,
    isLoading,
    authError,
    setAuthError
  } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male',
    idType: 'passport',
    idNumber: '',
    prayerInRoom: false,
    noAlcohol: true,
    zabihahOnly: true,
    specialRequests: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'male',
        idType: user.id_type || 'passport',
        idNumber: user.id_number || '',
        prayerInRoom: user.prayer_in_room || false,
        noAlcohol: user.no_alcohol !== undefined ? user.no_alcohol : true,
        zabihahOnly: user.zabihah_only !== undefined ? user.zabihah_only : true,
        specialRequests: user.special_requests || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (authError) setAuthError(null);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        gender: formData.gender,
        idType: formData.idType,
        idNumber: formData.idNumber,
        prayerInRoom: formData.prayerInRoom,
        noAlcohol: formData.noAlcohol,
        zabihahOnly: formData.zabihahOnly,
        specialRequests: formData.specialRequests
      };

      await updateUser(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      navigate('/');
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg">You need to be logged in to view this page</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-emerald-100">Manage your profile and preferences</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {authError && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {authError}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <img 
                    src={user.avatar || "https://via.placeholder.com/150"} 
                    alt={user.first_name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full">
                      <FaCamera />
                    </button>
                  )}
                </div>
                <h3 className="text-xl font-bold">{user.first_name} {user.last_name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2 px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  {user.role || 'Member'}
                </div>
              </div>

              <div className="space-y-1">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center px-4 py-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium w-full text-left"
                >
                  <FaUser className="mr-3" /> 
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </button>
                {isEditing ? (
                  <button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-3 rounded-lg bg-emerald-600 text-white font-medium w-full"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                ) : (
                  <>
                    <button className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 w-full text-left">
                      <FaHistory className="mr-3" /> Booking History
                    </button>
                    <button className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 w-full text-left">
                      <GiPrayerBeads className="mr-3" /> Preferences
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-red-500 w-full text-left"
                    >
                      <FaTrash className="mr-3" /> Delete Account
                    </button>
                    <button 
                      onClick={logout}
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-red-500 w-full text-left"
                    >
                      <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Prayer Times Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaPrayingHands className="text-emerald-600 mr-2" /> 
                Today's Prayer Times
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Fajr</span>
                  <span className="font-medium">5:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Dhuhr</span>
                  <span className="font-medium">1:15 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Asr</span>
                  <span className="font-medium">4:45 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Maghrib</span>
                  <span className="font-medium">6:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Isha</span>
                  <span className="font-medium">8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaUser className="text-emerald-600 mr-2" /> 
                {isEditing ? 'Edit Profile' : 'Profile Information'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3"
                    />
                  ) : (
                    <p className="text-gray-700">{user.first_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3"
                    />
                  ) : (
                    <p className="text-gray-700">{user.last_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-700">{user.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3"
                    />
                  ) : (
                    <p className="text-gray-700">{user.phone || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  {isEditing ? (
                    <div className="flex space-x-4">
                      {['male', 'female'].map(gender => (
                        <label key={gender} className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={formData.gender === gender}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-emerald-600"
                          />
                          <span className="ml-2 capitalize">{gender}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700 capitalize">{user.gender || 'Not specified'}</p>
                  )}
                </div>

                {isEditing && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                      <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3"
                      >
                        <option value="passport">Passport</option>
                        <option value="national_id">National ID</option>
                        <option value="driving_license">Driving License</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                      <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3"
                      />
                    </div>
                  </>
                )}
              </div>

              {isEditing && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Halal Preferences</h4>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="prayerInRoom"
                      checked={formData.prayerInRoom}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-emerald-600"
                    />
                    <span>Prayer amenities in room (mat, Quran, Qibla direction)</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="noAlcohol"
                      checked={formData.noAlcohol}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-emerald-600"
                    />
                    <span>No alcohol in room service or minibar</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="zabihahOnly"
                      checked={formData.zabihahOnly}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-emerald-600"
                    />
                    <span>Zabihah-only meat in all meals</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3"
                      placeholder="Any special requirements or preferences"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Delete Account Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h3>
              <div className="border border-red-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Delete Account</h4>
                <p className="text-sm text-gray-600 mb-4">
                  This will permanently delete your account and all associated data.
                  This action cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Account Deletion</h3>
            <p className="mb-6">Are you sure you want to permanently delete your account? All your data will be lost.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;