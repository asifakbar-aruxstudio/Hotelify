import { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm here to help. Ask me about our hotels, rooms, amenities, or any other information you need!", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What hotels do you have?",
    "How to book a room?",
    "What amenities are available?",
    "Check my bookings"
  ];

  const hotelResponses = {
    "hotels": "We have a variety of hotels available! You can browse our Hotels page to see all options. Each hotel has different categories and pricing based on location and amenities.",
    "book": "To book a room: 1) Browse our Hotels or Rooms page, 2) Select your preferred room, 3) Choose your check-in/check-out dates, 4) Complete the payment. You'll need to create an account first!",
    "amenities": "Our hotels offer various amenities including: Free WiFi, Parking, Restaurant, Room Service, Swimming Pool, Gym, Spa, and 24/7 Customer Support. Specific amenities vary by hotel.",
    "price": "Our room prices vary based on hotel category, room type, and dates. You can check prices on the Rooms page. We also offer special discounts for longer stays!",
    "location": "Our hotels are located in prime locations across the city. Check each hotel's page for exact address and nearby attractions.",
    "check": "To check your bookings, go to 'My Bookings' page. You'll need to be logged in to see your reservation history.",
    "cancel": "To cancel a booking, please go to 'My Bookings' and select the booking you wish to cancel. Cancellation policies may apply based on your booking terms.",
    "contact": "You can reach us through this chat, or call our customer support. We're available 24/7 to assist you!",
    "default": "Thank you for your question! For more detailed information, please visit our Hotels or Rooms pages, or contact our customer support."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hotel') || lowerInput.includes('property')) {
      return hotelResponses.hotels;
    } else if (lowerInput.includes('book') || lowerInput.includes('booking') || lowerInput.includes('reserve')) {
      return hotelResponses.book;
    } else if (lowerInput.includes('amenit') || lowerInput.includes('facilit') || lowerInput.includes('service')) {
      return hotelResponses.amenities;
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate')) {
      return hotelResponses.price;
    } else if (lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('where')) {
      return hotelResponses.location;
    } else if (lowerInput.includes('check') && (lowerInput.includes('booking') || lowerInput.includes('reservation'))) {
      return hotelResponses.check;
    } else if (lowerInput.includes('cancel') || lowerInput.includes('refund')) {
      return hotelResponses.cancel;
    } else if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('help')) {
      return hotelResponses.contact;
    }
    
    return hotelResponses.default;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    handleSend();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-[#3B82F6] text-white p-4 rounded-full shadow-lg hover:bg-[#2563EB] transition-all duration-300 hover:scale-110 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[380px] max-w-[calc(100vw-40px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-slideUp">
          <div className="bg-[#3B82F6] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Hotel Assistant</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-[#3B82F6] text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-[#3B82F6] hover:text-white rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-[#3B82F6] text-white p-2 rounded-full hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;