import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";


const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Hotels", path: "/hotels" },
  { name: "Rooms", path: "/rooms" }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Hotelify
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative py-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Register Hotel
              </Link>
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-medium rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-500/30"
              >
                Login
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="font-semibold text-emerald-600">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto p-4 border-t space-y-3">
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Register Hotel
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Login
                  </Link>
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