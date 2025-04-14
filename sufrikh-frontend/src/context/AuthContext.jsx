import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/api/auth';
import { toast } from 'react-toastify';
// At the top of AuthContext.jsx, add:
import axios from 'axios';
// At the top of AuthContext.jsx
const API_URL = import.meta.env.VITE_API_URL;


export const AuthContext = createContext();
const AUTH_KEY = 'auth';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isLoading: true,
    authError: null
  });
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);

  const isTokenExpired = useCallback((token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }, []);

// AuthContext.jsx
const persistAuth = useCallback(({ token, user }) => {
  if (!token) {
    console.error('No token provided');
    setAuthState(prev => ({ ...prev, isLoading: false, authError: 'Authentication failed' }));
    return;
  }

  const completeUser = {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    profile_picture: user.profile_picture || null,
    phone: user.phone || '',
    gender: user.gender || 'male',
    id_type: user.id_type || 'passport',
    id_number: user.id_number || '',
    prayer_in_room: user.prayer_in_room || false,
    no_alcohol: user.no_alcohol ?? true,
    zabihah_only: user.zabihah_only ?? true,
    special_requests: user.special_requests || ''
  };

  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ token, user: completeUser }));
    setAuthState({
      user: completeUser,
      token,
      isLoading: false,
      authError: null
    });
  } catch (error) {
    console.error('Persist auth error:', error);
    setAuthState(prev => ({ ...prev, isLoading: false, authError: 'Failed to save session' }));
    toast.error('Failed to save authentication data');
  }
}, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        authError: null
      });
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState(prev => ({ ...prev, authError: 'Failed to logout' }));
      toast.error('Logout failed');
    }
  }, []);

  const setAuthError = useCallback((error) => {
    setAuthState(prev => ({ ...prev, authError: error }));
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const stored = localStorage.getItem(AUTH_KEY);
        if (!stored) {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return;
        }
  
        const parsed = JSON.parse(stored);
        
        // Add additional validation checks
        if (!parsed?.token || !parsed?.user || isTokenExpired(parsed.token)) {
          localStorage.removeItem(AUTH_KEY);
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return;
        }
  
        // Verify token is still valid with backend
        try {
          await authService.getUser(parsed.user.id, parsed.token);
        } catch (error) {
          console.log('Token validation failed', error);
          localStorage.removeItem(AUTH_KEY);
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return;
        }
  
        setAuthState({
          user: parsed.user,
          token: parsed.token,
          isLoading: false,
          authError: null
        });
      } catch (error) {
        console.error('Auth init error:', error);
        localStorage.removeItem(AUTH_KEY);
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          authError: 'Session expired. Please login again.'
        });
      }
    };
  
    initializeAuth();
  }, [isTokenExpired]);

// Add to your existing context
const handleRoleBasedRedirect = (role) => {
  switch(role) {
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return '/admin';
    case 'WORKER':
      return '/worker-dashboard';
    default:
      return '/dashboard';
  }
};

// Update your login function// Modify the login function in AuthContext

// In AuthContext.jsx
const login = useCallback(async (credentials) => {
  setAuthState(prev => ({ ...prev, isLoading: true, authError: null }));
  
  try {
    // 1. Get auth token and user data
    const { token, user } = await authService.login(credentials);
    
    console.log('Auth service response:', { token, user }); // Debug log
    
    if (!token || !user?.id) {
      throw new Error('Authentication failed - invalid response format');
    }

    // 2. Persist the auth data
    persistAuth({ token, user });
    
    return { 
      success: true,
      user 
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Login failed. Please try again.';
    
    console.error('Login error:', errorMessage); // Debug log
    
    setAuthState(prev => ({ 
      ...prev, 
      isLoading: false, 
      authError: errorMessage
    }));
    
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
}, [persistAuth]);

  const register = useCallback(async (userData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, authError: null }));

    try {
      const data = await authService.register(userData);
      if (!data?.token || !data?.user) {
        throw new Error('Invalid response from server');
      }
      persistAuth(data);
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed.';
      setAuthState(prev => ({ ...prev, isLoading: false, authError: errorMessage }));
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [persistAuth]);

  const updateUser = useCallback(async (userData) => {
    if (!authState.token || !authState.user?.id) throw new Error('Not authenticated');
    
    try {
      const response = await authService.updateUser(
        authState.user.id,
        userData,
        authState.token
      );
      
      // Ensure the backend returns the complete updated user object
      const updatedUser = response.data?.user || response.data;
      
      if (!updatedUser) {
        throw new Error('No user data returned from server');
      }
  
      // Create the new user data by merging existing and updated fields
      const newUserData = {
        ...authState.user,
        first_name: updatedUser.first_name || userData.firstName || authState.user.first_name,
        last_name: updatedUser.last_name || userData.lastName || authState.user.last_name,
        phone: updatedUser.phone || userData.phone || authState.user.phone,
        gender: updatedUser.gender || userData.gender || authState.user.gender,
        id_type: updatedUser.id_type || userData.idType || authState.user.id_type,
        id_number: updatedUser.id_number || userData.idNumber || authState.user.id_number,
        prayer_in_room: updatedUser.prayer_in_room ?? userData.prayerInRoom ?? authState.user.prayer_in_room,
        no_alcohol: updatedUser.no_alcohol ?? userData.noAlcohol ?? authState.user.no_alcohol,
        zabihah_only: updatedUser.zabihah_only ?? userData.zabihahOnly ?? authState.user.zabihah_only,
        special_requests: updatedUser.special_requests || userData.specialRequests || authState.user.special_requests
      };
  
      // Update both state and localStorage
      persistAuth({
        user: newUserData,
        token: authState.token
      });
      
      toast.success('Profile updated!');
      return newUserData;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Update failed.';
      setAuthState(prev => ({ ...prev, authError: errorMessage }));
      toast.error(errorMessage);
      throw error;
    }
  }, [authState.token, authState.user, persistAuth]);

  const updateUserProfilePicture = useCallback((newProfilePictureUrl) => {
    setAuthState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        profile_picture: newProfilePictureUrl
      }
    }));
    
    // Also update localStorage
    const stored = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (stored) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        ...stored,
        user: {
          ...stored.user,
          profile_picture: newProfilePictureUrl
        }
      }));
    }
  }, []);

  // 2. Then define updateProfilePicture which uses it
  const updateProfilePicture = useCallback(async (file) => {
    if (!authState.token) {
      throw new Error('Not authenticated - no token found');
    }
    
    try {
      setIsUploadingProfile(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        `${API_URL}/users/upload-profile`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${authState.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data?.data?.profilePicture) {
        updateUserProfilePicture(response.data.data.profilePicture);
      }

      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setIsUploadingProfile(false);
    }
  }, [authState.token, updateUserProfilePicture]);

  const deleteAccount = useCallback(async () => {
    if (!authState.token || !authState.user?.id) throw new Error('Not authenticated');

    try {
      await authService.deleteUser(authState.user.id, authState.token);
      logout();
      toast.success('Account deleted successfully.');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Deletion failed.';
      setAuthState(prev => ({ ...prev, authError: errorMessage }));
      toast.error(errorMessage);
      throw error;
    }
  }, [authState.token, authState.user?.id, logout]);

  const getUserById = useCallback(async (id) => {
    if (!authState.token) throw new Error('Not authenticated');
  
    try {
      console.log("Fetching user data for ID:", id); // Add this
      const userData = await authService.getUser(id, authState.token);
      console.log("Received user data:", userData); // Add this
      
      const completeUser = {
        ...emptyUser, // Start with empty defaults
        ...userData   // Override with actual data
      };
  
      setAuthState(prev => ({
        ...prev,
        user: completeUser
      }));
      
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        token: authState.token,
        user: completeUser
      }));
      
      return completeUser;
    } catch (error) {
      console.error("User fetch error:", error);
      throw error;
    }
  }, [authState.token]);

  const contextValue = useMemo(() => ({
    user: authState.user,
    token: authState.token,
    isLoading: authState.isLoading,
    authError: authState.authError,
    login,
    register,
    updateUser,
    deleteAccount,
    updateProfilePicture,
    getUserById,  // Add this line
    logout,
    setAuthError,
    updateUserProfilePicture
  }), [
    authState.user,
    authState.token,
    authState.isLoading,
    authState.authError,
    login,
    register,
    updateUser,
    deleteAccount,
    updateProfilePicture,
    getUserById,  // Add this line
    logout,
    setAuthError,
    updateUserProfilePicture,

  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {authState.isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg font-medium">Loading, please wait...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;