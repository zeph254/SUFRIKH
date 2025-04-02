import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Home from './pages/public/Home'
import Nopage from './pages/public/NoPage'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import ForgotPassword from './pages/public/ForgotPassword'
import ResetPassword from './pages/public/ResetPassword'
import BookNow from './pages/public/BookNow'
import Bookings from './pages/protected/Bookings'
import Orders from './pages/protected/Orders'
import Hotels from './pages/public/Hotels'
import Dashboard from './pages/protected/Dashboard'
import Restaurants from './pages/public/Restaurants'
import Account from './pages/public/Account'
import Layout from './components/common/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login/>} /> 
        <Route path="book-now" element={<BookNow/>} />
        <Route path="bookings" element={<Bookings/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="register" element={<Register/>} />
        <Route path="forgot-password" element={<ForgotPassword/>} />
        <Route path="reset-password/:token" element={<ResetPassword/>} />
        <Route path="account" element={<Account/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="hotels" element={<Hotels/>} />
        <Route path="restaurants" element={<Restaurants/>} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About/>} />
        <Route path="*" element={<Nopage/>} />
      </Route>
    </Routes>
  </BrowserRouter>

    
  )
}

export default App
