import { useState, useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { AppContext } from '../context/AppContext';
import { 
  HiOutlineMapPin,
  HiOutlineStar,
  HiOutlineCalendarDays,
  HiOutlineUserGroup,
  HiOutlineCheck,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChatBubbleLeftRight
} from 'react-icons/hi2';
import { FaWhatsapp, FaHeart, FaLocationDot, FaStar } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';

const SingleRoom = () => {
  const { id } = useParams();
  const { hotels } = useContext(AppContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const hotel = useMemo(() => hotels.find(h => h.id === parseInt(id)), [id, hotels]);
  const selectedRoom = selectedRoomType || hotel?.rooms?.[0] || null;

  const toggleFavorite = () => {
    if (!hotel) return;
    setFavorites(prev => 
      prev.includes(hotel.id)
        ? prev.filter(hid => hid !== hotel.id)
        : [...prev, hotel.id]
    );
  };

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h2>
          <Link to="/hotels" className="text-emerald-600 hover:underline">
            Browse all hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <section className="relative h-[50vh] md:h-[60vh] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={hotel.images[currentImage]}
              alt={hotel.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute top-0 left-0 right-0 z-10 p-6">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors"
          >
            <HiOutlineChevronLeft className="w-4 h-4" />
            Back to Hotels
          </Link>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="flex items-end justify-between">
            <div>
              {hotel.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full mb-3">
                  <FaStar className="w-3 h-3" />
                  Featured Property
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-3 text-white/90">
                <span className="flex items-center gap-1">
                  <FaLocationDot className="w-4 h-4" />
                  {hotel.city}, {hotel.province}
                </span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <HiOutlineStar className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span>({hotel.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={toggleFavorite}
                className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors"
              >
                {favorites.includes(hotel.id) ? (
                  <FaHeart className="w-5 h-5 text-red-500" />
                ) : (
                  <FaHeart className="w-5 h-5" />
                )}
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors">
                <HiOutlineShare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {hotel.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentImage((prev) => 
            prev === 0 ? hotel.images.length - 1 : prev - 1
          )}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors z-10"
        >
          <HiOutlineChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentImage((prev) => 
            prev === hotel.images.length - 1 ? 0 : prev + 1
          )}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors z-10"
        >
          <HiOutlineChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2">
                    <HiOutlineCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedRoomType(room)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRoom?.type === room.type
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{room.type}</h3>
                        <p className="text-sm text-gray-500">
                          Up to {room.maxGuests} guests · {room.available} rooms left
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">${room.price}</span>
                        <span className="text-gray-500 text-sm">/night</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="flex items-start gap-3">
                <HiOutlineMapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-gray-700">{hotel.location}</p>
                  <p className="text-gray-500">{hotel.city}, {hotel.province}, {hotel.country}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <HiOutlinePhone className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">{hotel.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlineEnvelope className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">{hotel.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">${selectedRoom?.price || hotel.price}</span>
                <span className="text-gray-500">/night</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <div className="relative">
                    <HiOutlineCalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <div className="relative">
                    <HiOutlineCalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <div className="relative">
                    <HiOutlineUserGroup className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors mb-3">
                Book Now
              </button>

              <p className="text-center text-sm text-gray-500 mb-4">
                Free cancellation up to 24h before check-in
              </p>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 text-center mb-3">
                  Need help booking?
                </p>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white font-medium rounded-xl hover:bg-[#20BD5A] transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleRoom;