import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isLoading, authError } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (authError || !user?.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Additional check for complete user data
  if (!user.first_name || !user.email) {
    return <LoadingSpinner />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // ... existing role handling
  }

  return children ? children : <Outlet />;
};;

export default ProtectedRoute;