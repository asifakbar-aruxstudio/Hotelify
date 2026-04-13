import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Whatsapp() {
  return (
    <>

     <Link
        to="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp className="w-6 h-6" />
      </Link>
    </>
  )
}

export default Whatsapp