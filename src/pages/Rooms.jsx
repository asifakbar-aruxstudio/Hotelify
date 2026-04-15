import { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { AppContext } from '../context/AppContext';
import { 
  HiOutlineMagnifyingGlass,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineStar,
  HiOutlineHeart,
  HiOutlineCheck,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowTrendingUp
} from 'react-icons/hi2';
import { FaHeart, FaUser, FaBed, FaBath, FaMountain, FaWater } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';

const Rooms = () => {
  const { hotels } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedHotel, setSelectedHotel] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const allRooms = useMemo(() => {
    let rooms = [];
    if (!hotels || hotels.length === 0) return rooms;
    hotels.forEach(hotel => {
      if (!hotel.rooms) return;
      hotel.rooms.forEach(room => {
        rooms.push({
          ...room,
          hotelId: hotel.id,
          hotelName: hotel.name,
          hotelCity: hotel.city,
          hotelProvince: hotel.province,
          hotelImage: hotel.image,
          hotelRating: hotel.rating,
          hotelAmenities: hotel.amenities
        });
      });
    });
    return rooms;
  }, [hotels]);

  const filteredRooms = useMemo(() => {
    let result = [...allRooms];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(room =>
        room.type.toLowerCase().includes(query) ||
        room.hotelName.toLowerCase().includes(query) ||
        room.hotelCity.toLowerCase().includes(query)
      );
    }

    if (selectedHotel) {
      result = result.filter(room => room.hotelName === selectedHotel);
    }

    result = result.filter(room => 
      room.price >= priceRange[0] && room.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'guests':
        result.sort((a, b) => b.maxGuests - a.maxGuests);
        break;
      default:
        break;
    }

    return result;
  }, [allRooms, searchQuery, sortBy, priceRange, selectedHotel]);

  const toggleFavorite = (roomId) => {
    setFavorites(prev => 
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const hotelNames = [...new Set(allRooms.map(r => r.hotelName))];

  const getRoomIcon = (roomType) => {
    const type = roomType.toLowerCase();
    if (type.includes('suite') || type.includes('presidential') || type.includes('royal')) {
      return FaMountain;
    }
    if (type.includes('villa') || type.includes('beach') || type.includes('overwater')) {
      return FaWater;
    }
    return FaBed;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Luxury
              <span className="block text-emerald-400">Rooms & Suites</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover exquisite rooms and suites across the world's finest hotels
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rooms, hotels, or locations..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-4 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />
                  Filters
                </button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/20"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Sort By</label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:outline-none"
                        >
                          <option value="featured">Featured</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="guests">Guest Capacity</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Hotel</label>
                        <select
                          value={selectedHotel}
                          onChange={(e) => setSelectedHotel(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:outline-none"
                        >
                          <option value="">All Hotels</option>
                          {hotelNames.map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Price Range</label>
                        <select
                          value={`${priceRange[0]}-${priceRange[1]}`}
                          onChange={(e) => {
                            const [min, max] = e.target.value.split('-').map(Number);
                            setPriceRange([min, max]);
                          }}
                          className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:outline-none"
                        >
                          <option value="0-10000">All Prices</option>
                          <option value="0-300">Under $300</option>
                          <option value="300-600">$300 - $600</option>
                          <option value="600-1000">$600 - $1000</option>
                          <option value="1000-10000">$1000+</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredRooms.length}</span> rooms available
              {searchQuery && (
                <span> for "<span className="text-emerald-600">{searchQuery}</span>"</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room, index) => {
                const RoomIcon = getRoomIcon(room.type);
                return (
                  <motion.div
                    key={`${room.hotelId}-${room.type}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={room.hotelImage}
                        alt={room.type}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(`${room.hotelId}-${room.type}`);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        {favorites.includes(`${room.hotelId}-${room.type}`) ? (
                          <FaHeart className="w-4 h-4 text-red-500" />
                        ) : (
                          <FaHeart className="w-4 h-4 text-gray-400" />
                        )}
                      </button>

                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-1 text-white text-sm">
                          <span className="font-medium">{room.hotelName}</span>
                          {room.hotelRating >= 4.8 && (
                            <MdVerified className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <span>{room.hotelCity}, {room.hotelProvince}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <RoomIcon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{room.type}</h3>
                          <div className="flex items-center gap-1 text-amber-500">
                            <HiOutlineStar className="w-3 h-3 fill-current" />
                            <span className="text-sm font-medium">{room.hotelRating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaUser className="w-4 h-4" />
                          <span>{room.maxGuests} Guests</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaBed className="w-4 h-4" />
                          <span>{room.available} Left</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.hotelAmenities.slice(0, 3).map(amenity => (
                          <span 
                            key={amenity}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                          >
                            {amenity}
                          </span>
                        ))}
                        {room.hotelAmenities.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                            +{room.hotelAmenities.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">${room.price}</span>
                          <span className="text-gray-500 text-sm">/night</span>
                        </div>
                        <Link
                          to={`/single-room/${room.hotelId}`}
                          className="px-5 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FaBed className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedHotel('');
                  setPriceRange([0, 10000]);
                }}
                className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Are You a Hotel Owner?
          </h3>
          <p className="text-white/90 mb-6">
            List your rooms and suites on Hotelify and reach millions of travelers worldwide.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Register Your Hotel
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Rooms;