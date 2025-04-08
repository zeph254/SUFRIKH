import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react'; // Added `useContext`
import { jwtDecode } from 'jwt-decode';
import authService from '../services/api/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AUTH_KEY = 'auth';

// Export `useAuth` individually
export const useAuth = () => {
  const context = useContext(AuthContext); // Now `useContext` is defined
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

  // Check token validity
  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        authError: null
      });
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState(prev => ({ ...prev, authError: 'Failed to complete logout' }));
      toast.error('Logout failed.');
    }
  }, []);

  const persistAuth = useCallback(({ user, token }) => {
    if (!user || !token) {
      console.error('Invalid auth data');
      setAuthState(prev => ({ ...prev, isLoading: false, authError: 'Invalid authentication data' }));
      return;
    }

    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }));
      setAuthState({
        user,
        token,
        isLoading: false,
        authError: null
      });
    } catch (error) {
      console.error('Persist auth error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false, authError: 'Failed to save authentication data' }));
      toast.error('Failed to save authentication data.');
    }
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
        if (!parsed?.user || !parsed?.token || isTokenExpired(parsed.token)) {
          localStorage.removeItem(AUTH_KEY);
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return;
        }

        persistAuth(parsed);
      } catch (error) {
        console.error('Auth init error:', error);
        localStorage.removeItem(AUTH_KEY);
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          authError: 'Session expired. Please login again.'
        });
        toast.error('Session expired. Please login again.');
      }
    };

    initializeAuth();
  }, [persistAuth]);

  const login = useCallback(async (credentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, authError: null }));

    try {
      const data = await authService.login(credentials);
      if (!data?.token || !data?.user) {
        throw new Error('Invalid response from server');
      }
      persistAuth(data);
      toast.success('Logged in successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed.';
      setAuthState(prev => ({ ...prev, isLoading: false, authError: errorMessage }));
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
      const updatedUser = await authService.updateUser(
        authState.user.id,
        userData,
        authState.token
      );
      persistAuth({ user: updatedUser, token: authState.token });
      toast.success('Profile updated!');
      return updatedUser;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Update failed.';
      setAuthState(prev => ({ ...prev, authError: errorMessage }));
      toast.error(errorMessage);
      throw error;
    }
  }, [authState.token, authState.user?.id, persistAuth]);

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
      return await authService.getUserById(id, authState.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user.';
      setAuthState(prev => ({ ...prev, authError: errorMessage }));
      toast.error(errorMessage);
      throw error;
    }
  }, [authState.token]);

  const setAuthError = useCallback((error) => {
    setAuthState(prev => ({ ...prev, authError: error }));
  }, []);

  const contextValue = useMemo(() => ({
    user: authState.user,
    token: authState.token,
    isLoading: authState.isLoading,
    authError: authState.authError,
    login,
    register,
    updateUser,
    deleteAccount,
    getUserById,
    logout,
    setAuthError
  }), [
    authState.user,
    authState.token,
    authState.isLoading,
    authState.authError,
    login,
    register,
    updateUser,
    deleteAccount,
    getUserById,
    logout,
    setAuthError
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {authState.isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Export only `AuthContext` here
export { AuthContext };
export default AuthProvider;