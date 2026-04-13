import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { HiXMark, HiChatBubbleLeftRight } from 'react-icons/hi2';

const quickMessages = [
  "I need help with booking",
  "I have a question about rooms",
  "I want to know about prices",
  "I need to modify my reservation"
];

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '+923153933660';

  const handleQuickMessage = (message) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleCustomMessage = () => {
    const message = prompt('Enter your message:');
    if (message) {
      handleQuickMessage(message);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-[320px] sm:w-[360px] overflow-hidden mb-3"
          >
            <div className="bg-[#25D366] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FaWhatsapp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">Hotelify Support</h3>
                <p className="text-white/80 text-sm">We typically reply within minutes</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <HiXMark className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
              <p className="text-gray-600 text-sm mb-4">
                👋 Hi there! How can we help you today?
              </p>
              
              <div className="space-y-2">
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(msg)}
                    className="w-full p-3 text-left bg-white border border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-200 group"
                  >
                    <span className="text-gray-700 text-sm group-hover:text-[#25D366]">
                      {msg}
                    </span>
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleCustomMessage}
                className="w-full mt-3 p-3 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl hover:bg-[#20BD5A] transition-colors"
              >
                <HiChatBubbleLeftRight className="w-5 h-5" />
                <span className="font-medium">Custom Message</span>
              </button>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-center gap-2 border-t">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">Online now</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-3 mb-2 hidden sm:block"
          >
            <p className="text-gray-600 text-sm">Questions? We are here to help!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setShowTooltip(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <AnimatePresence>
          {!isOpen && showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap hidden sm:block"
            >
              Chat with us
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-800 rotate-90' 
            : 'bg-[#25D366] hover:bg-[#20BD5A] shadow-2xl shadow-[#25D366]/40'
        }`}>
          {isOpen ? (
            <HiXMark className="w-7 h-7 text-white" />
          ) : (
            <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          )}
        </div>
        
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </span>
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;