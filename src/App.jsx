import React from 'react'
import {Routes, Route, useLocation } from 'react-router-dom'   
import Navbar from './components/Navbar';
import { FaWhatsapp } from 'react-icons/fa';
import Home from './pages/Home';
import About from './pages/About';
import Hotels from './pages/Hotels';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyBooking from './pages/MyBooking';
import Footer from './components/Footer';

function App() {
  const ownerPath = useLocation().pathname.includes('/owner');
  return (
    <>
      {!ownerPath && <Navbar />}     
      
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>

      <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/single-room/:id" element={<SingleRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-booking" element={<MyBooking />} />
      
        </Routes>
         { !ownerPath && <Footer /> }
    </>
  )     
}
export default App;