import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  
    const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Hotels", path: "/Hotels" },
    { name: "Rooms", path: "/Rooms" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-900 text-white flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-4 z-50">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-wide">Hotelify</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="group flex flex-col gap-0.5"
          >
            {link.name}
            <span className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300" />
          </Link>
        ))}

        <button className="border px-4 py-1 text-sm rounded-full hover:bg-white hover:text-black transition">
          Register Hotel
        </button>
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(true)}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-800 
        flex flex-col items-center justify-center gap-6 transition-transform 
        duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg"
          >
            {link.name}
          </Link>
        ))}

        <button className="border px-4 py-1 rounded-full">
          New Launch
        </button>

        <button className="bg-black text-white px-6 py-2 rounded-full">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;