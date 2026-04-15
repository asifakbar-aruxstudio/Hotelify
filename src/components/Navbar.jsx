import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { AppContext } from "../context/AppContext";
import { FaHotel, FaUserTie } from "react-icons/fa6";
import toast from "react-hot-toast";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Hotels", path: "/hotels" },
  { name: "Rooms", path: "/rooms" }
];

const Navbar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully!');
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
               <img src="/logo.png" alt="Hotelify" className="w-20 h-20" />
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="relative py-2 text-gray-600 hover:text-emerald-600 
                  transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user?.isHotelOwner ? (
                <Link
                  to="/owner/dashboard"
                  className="px-5 py-2 text-sm font-medium rounded-full 
                  bg-emerald-500 text-white hover:bg-emerald-600 transition-all 
                  duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                >
                  <FaHotel className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : user ? (
                <Link
                  to="/my-bookings"
                  className="px-5 py-2 text-sm font-medium rounded-full 
                  bg-emerald-500 text-white hover:bg-emerald-600 transition-all 
                  duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                >
                  <FaUserTie className="w-4 h-4" />
                  My Bookings
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-gray-600 
                    hover:text-emerald-600 transition-colors">
                    Register Hotel
                  </Link>

                  <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-medium rounded-full 
                    bg-emerald-500 text-white hover:bg-emerald-600 transition-all 
                    duration-200 shadow-lg shadow-emerald-500/30">
                    Login
                  </Link>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                      Hotelify
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {user && (
                  <div className="p-4 bg-emerald-50 border-b">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {user.isHotelOwner && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs rounded-full">
                        Hotel Owner
                      </span>
                    )}
                  </div>
                )}

                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Navigation</p>
                    <div className="space-y-1">
                      {navLinks.map((link) => (
                        <button
                          key={link.path}
                          onClick={() => handleNavClick(link.path)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors w-full text-left"
                        >
                          {link.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t space-y-3">
                  {user ? (
                    <>
                      {user.isHotelOwner ? (
                        <Link
                          to="/owner/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                        >
                          <FaHotel className="w-5 h-5" />
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/my-bookings"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                        >
                          <FaUserTie className="w-5 h-5" />
                          My Bookings
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 border border-emerald-500 text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-colors"
                      >
                        Register Hotel
                      </Link>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;