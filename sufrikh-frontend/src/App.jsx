import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Home from './pages/public/Home';
import Nopage from './pages/public/NoPage';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';
import BookNow from './pages/public/BookNow';
import Bookings from './pages/protected/Bookings';
import Orders from './pages/protected/Orders';
import AdminPanel from './pages/protected/admin/AdminPanel';
import Hotels from './pages/public/Hotels';
import Dashboard from './pages/protected/Dashboard';
import Restaurants from './pages/public/Restaurants';
import UserManagement from './pages/protected/admin/UserManagment';
import Account from './pages/public/Account';
import Unauthorized from './pages/public/Unauthorized'; // Add this import
import Layout from './components/common/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoutes'; // Make sure this path is correct
import './App.css';

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
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="account" element={<Account />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Admin-only routes */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="admin" element={<AdminPanel />} />
            <Route path="user-management" element={<UserManagement />} />
          </Route>

          {/* 404 page */}
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;