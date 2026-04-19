import React, { useContext } from 'react'
import {Routes, Route, useLocation, Navigate } from 'react-router-dom'   
import Navbar from './components/Navbar';
import WhatsAppWidget from './pages/Whatsapp';
import Home from './pages/Home';
import About from './pages/About';
import Hotels from './pages/Hotels';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyBooking from './pages/MyBooking';
import Footer from './components/Footer';
import Chatbot from './pages/Chatbot';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AppContext } from './context/AppContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AppContext);
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const location = useLocation();
  const isOwnerPage = location.pathname.startsWith('/owner') || location.pathname.startsWith('/admin');
  const isDashboard = location.pathname.includes('dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}     
      
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/single-room/:id" element={<SingleRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/owner/dashboard" element={
            <ProtectedRoute roles={['owner', 'admin']}>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute roles={['customer', 'owner', 'admin']}>
              <MyBooking />
            </ProtectedRoute>
          } />
      </Routes>

      {!isDashboard && <WhatsAppWidget />}
      {!isDashboard && <Chatbot />}
      {!isDashboard && <Footer />}
    </>
  )     
}
export default App;