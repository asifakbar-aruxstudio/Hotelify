import React from 'react'
import {Routes, Route, useLocation } from 'react-router-dom'   
import Navbar from './components/Navbar';
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