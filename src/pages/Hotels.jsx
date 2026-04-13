import { useState, useMemo, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { AppContext } from '../context/AppContext';
import { 
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineUserGroup,
  HiOutlineStar,
  HiOutlineHeart,
  HiOutlineChatBubbleLeftRight,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineSparkles,
  HiOutlineWifi,
  HiOutlineCurrencyDollar,
  HiOutlineArrowTrendingUp,
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineChevronUp
} from 'react-icons/hi2';
import { FaWhatsapp, FaHeart, FaLocationDot } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';

const Hotels = () => {
  const { hotels } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('city') || '');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [favorites, setFavorites] = useState([]);

  const cities = [...new Set(hotels.map(h => h.city))];

  const filteredHotels = useMemo(() => {
    let result = [...hotels];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(hotel =>
        hotel.name.toLowerCase().includes(query) ||
        hotel.city.toLowerCase().includes(query) ||
        hotel.province.toLowerCase().includes(query) ||
        hotel.country.toLowerCase().includes(query)
      );
    }

    if (selectedCity) {
      result = result.filter(hotel => hotel.city === selectedCity);
    }

    result = result.filter(hotel => 
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [hotels, searchQuery, sortBy, priceRange, selectedCity]);

  const toggleFavorite = (hotelId) => {
    setFavorites(prev => 
      prev.includes(hotelId)
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
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
              Discover Luxury
              <span className="block text-emerald-400">Hotels Worldwide</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From iconic city landmarks to beachfront paradises, find your perfect stay
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hotels, cities, or destinations..."
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
                          <option value="rating">Highest Rated</option>
                          <option value="reviews">Most Reviewed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">City</label>
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:outline-none"
                        >
                          <option value="">All Cities</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
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
                          <option value="0-5000">All Prices</option>
                          <option value="0-500">Under $500</option>
                          <option value="500-1000">$500 - $1000</option>
                          <option value="1000-2000">$1000 - $2000</option>
                          <option value="2000-5000">$2000+</option>
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
              <span className="font-semibold text-gray-900">{filteredHotels.length}</span> hotels found
              {searchQuery && (
                <span> for "<span className="text-emerald-600">{searchQuery}</span>"</span>
              )}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="flex gap-2">
                {[
                  { value: 'featured', label: 'Featured' },
                  { value: 'price-low', label: 'Price' },
                  { value: 'rating', label: 'Rating' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {hotel.featured && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                          <HiOutlineSparkles className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(hotel.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        {favorites.includes(hotel.id) ? (
                          <FaHeart className="w-4 h-4 text-red-500" />
                        ) : (
                          <FaHeart className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-1 text-white">
                          <FaLocationDot className="w-3 h-3" />
                          <span className="text-sm font-medium">{hotel.city}, {hotel.province}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {hotel.name}
                      </h3>
                      {hotel.rating >= 4.8 && (
                        <MdVerified className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <HiOutlineStar className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="font-semibold text-gray-900">{hotel.rating}</span>
                      </div>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500 text-sm">{hotel.reviews} reviews</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {hotel.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map(amenity => (
                        <span 
                          key={amenity}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                        >
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                          +{hotel.amenities.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${hotel.price}</span>
                        <span className="text-gray-500 text-sm">/night</span>
                      </div>
                      <Link
                        to={`/single-room/${hotel.id}`}
                        className="px-5 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <HiOutlineMagnifyingGlass className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('');
                  setPriceRange([0, 5000]);
                }}
                className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Support */}
      <section className="py-12 bg-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need Help Finding Your Perfect Stay?</h3>
          <p className="text-white/90 mb-6">Our team is here to help you find the perfect hotel for your trip</p>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaWhatsapp className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default Hotels;