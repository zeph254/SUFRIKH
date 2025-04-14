import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './context/ProtectedRoutes';

// Import from correct paths - adjust these based on your actual file structure
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';
import Hotels from './pages/public/Hotels';
import Restaurants from './pages/public/Restaurants';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import BookNow from './pages/public/BookNow';
import Unauthorized from './pages/public/Unauthorized';
import Account from './pages/protected/Account';
import Dashboard from './pages/protected/Dashboard';
import Bookings from './pages/protected/Bookings';
import Orders from './pages/protected/Orders';
import AdminPanel from './pages/protected/admin/AdminPanel';
import UserManagement from './pages/protected/admin/UserManagment';
import WorkerDashboard from './pages/protected/worker/WorkerDashboard';
import TaskManagement from './pages/protected/worker/TaskManagement';
import Nopage from './pages/public/Nopage';

// If these don't exist yet, you'll need to create them:
import AdminSettings from './pages/protected/admin/AdminSettings';
import AuditLogs from './pages/protected/admin/AuditLogs';
import './App.css'; // Ensure you have your CSS imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="book-now" element={<BookNow />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="users" element={<UserManagement />} />
          
          {/* Authenticated user routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="account" element={<Account />} />
          </Route>

          {/* Customer routes */}
          <Route element={<ProtectedRoute allowedRoles={['CUSTOMER']} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Worker routes */}
          <Route element={<ProtectedRoute allowedRoles={['WORKER']} />}>
            <Route path="worker-dashboard" element={<WorkerDashboard />} />
            <Route path="tasks" element={<TaskManagement />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="admin" element={<AdminPanel />}>
            
              
            </Route>
          </Route>

          {/* Super Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
            <Route path="admin/settings" element={<AdminSettings />} />
            <Route path="admin/audit-logs" element={<AuditLogs />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;