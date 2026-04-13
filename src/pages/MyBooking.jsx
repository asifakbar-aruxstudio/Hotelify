import { useState, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { 
  HiOutlineHomeModern,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineUserGroup,
  HiOutlineCurrencyDollar,
  HiOutlineStar,
  HiOutlineChartBar,
  HiOutlineArrowRightOnRectangle,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineClock
} from 'react-icons/hi2';
import { FaHotel, FaUserTie, FaRulerCombined } from 'react-icons/fa6';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, getHotelsByOwner, getStats, updateHotel, deleteHotel, addRoom, updateRoom, deleteRoom, getBookingsByCustomer, getCustomerStats, cancelBooking, hotels } = useContext(AppContext);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [editingHotel, setEditingHotel] = useState(null);
  const [showAddRoom, setShowAddRoom] = useState(null);
  const [showEditRoom, setShowEditRoom] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [customerTab, setCustomerTab] = useState('upcoming');

  const ownerHotels = useMemo(() => {
    return user ? getHotelsByOwner(user.id) : [];
  }, [user, getHotelsByOwner]);

  const stats = useMemo(() => {
    return user ? getStats(user.id) : { hotels: 0, rooms: 0, bookings: 0, rating: 0, revenue: 0 };
  }, [user, getStats]);

  // Customer bookings
  const myBookings = useMemo(() => {
    return user ? getBookingsByCustomer(user.id) : [];
  }, [user, getBookingsByCustomer]);

  const customerStats = useMemo(() => {
    return user ? getCustomerStats(user.id) : { totalBookings: 0, totalSpent: 0, upcoming: 0, completed: 0 };
  }, [user, getCustomerStats]);

  const getHotelDetails = (hotelId) => {
    return hotels.find(h => h.id === hotelId);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredBookings = useMemo(() => {
    const now = new Date();
    if (customerTab === 'upcoming') {
      return myBookings.filter(b => new Date(b.checkIn) >= now && b.status === 'confirmed');
    } else if (customerTab === 'completed') {
      return myBookings.filter(b => new Date(b.checkOut) < now || b.status === 'completed');
    } else if (customerTab === 'cancelled') {
      return myBookings.filter(b => b.status === 'cancelled');
    }
    return myBookings;
  }, [myBookings, customerTab]);

  const [hotelForm, setHotelForm] = useState({
    name: '',
    city: '',
    province: '',
    country: '',
    location: '',
    description: '',
    price: '',
    phone: '',
    email: '',
    image: ''
  });

  const [roomForm, setRoomForm] = useState({
    type: '',
    price: '',
    available: '',
    maxGuests: ''
  });

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
    toast.success('Booking cancelled successfully!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FaUserTie className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {user?.isHotelOwner ? 'Owner Dashboard' : 'My Bookings'}
          </h2>
          <p className="text-gray-600 mb-6">Please login to access your dashboard</p>
          <Link to="/login" className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }

  // Customer View (not hotel owner)
  if (!user.isHotelOwner) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Hotelify
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); toast.success('Logged out!'); }}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Bookings', value: customerStats.totalBookings, icon: HiOutlineHomeModern, color: 'bg-blue-500' },
              { label: 'Total Spent', value: formatCurrency(customerStats.totalSpent), icon: HiOutlineCurrencyDollar, color: 'bg-green-500' },
              { label: 'Upcoming', value: customerStats.upcoming, icon: HiOutlineClock, color: 'bg-purple-500' },
              { label: 'Completed', value: customerStats.completed, icon: HiOutlineCheck, color: 'bg-amber-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-2xl shadow-sm"
              >
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' },
              { id: 'all', label: 'All Bookings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCustomerTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  customerTab === tab.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => {
                const hotel = getHotelDetails(booking.hotelId);
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-40 h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={hotel?.image || booking.hotelImage}
                            alt={booking.hotelName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{booking.hotelName}</h3>
                              <p className="text-gray-500 flex items-center gap-1 mt-1">
                                <HiOutlineMapPin className="w-4 h-4" />
                                {booking.city}, {booking.province}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-6 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                              <HiOutlineCalendarDays className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                Check-in: <span className="font-medium text-gray-900">{formatDate(booking.checkIn)}</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiOutlineCalendarDays className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                Check-out: <span className="font-medium text-gray-900">{formatDate(booking.checkOut)}</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiOutlineUserGroup className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{booking.guests} Guests</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaRulerCombined className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{booking.roomType}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div>
                              <span className="text-2xl font-bold text-gray-900">${booking.totalPrice}</span>
                              <span className="text-gray-500 text-sm"> total</span>
                            </div>
                            {booking.status === 'confirmed' && new Date(booking.checkIn) >= new Date() && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-2"
                              >
                                <HiOutlineTrash className="w-4 h-4" />
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FaHotel className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No {customerTab} bookings</h3>
              <p className="text-gray-600 mb-6">
                {customerTab === 'all' ? "You haven't booked any hotels yet" : `No ${customerTab} bookings found`}
              </p>
              <Link 
                to="/hotels" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
              >
                Browse Hotels
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel.id);
    setHotelForm({
      name: hotel.name,
      city: hotel.city,
      province: hotel.province,
      country: hotel.country,
      location: hotel.location,
      description: hotel.description,
      price: hotel.price,
      phone: hotel.phone,
      email: hotel.email,
      image: hotel.image
    });
  };

  const handleSaveHotel = () => {
    updateHotel(editingHotel, {
      ...hotelForm,
      price: parseInt(hotelForm.price) || 200
    });
    setEditingHotel(null);
    toast.success('Hotel updated successfully!');
  };

  const handleDeleteHotel = (hotelId) => {
    deleteHotel(hotelId);
    setShowDeleteConfirm(null);
    toast.success('Hotel deleted successfully!');
  };

  const handleAddRoom = (hotelId) => {
    addRoom(hotelId, {
      type: roomForm.type,
      price: parseInt(roomForm.price) || 100,
      available: parseInt(roomForm.available) || 1,
      maxGuests: parseInt(roomForm.maxGuests) || 2
    });
    setShowAddRoom(null);
    setRoomForm({ type: '', price: '', available: '', maxGuests: '' });
    toast.success('Room added successfully!');
  };

  const handleUpdateRoom = (hotelId, roomType) => {
    updateRoom(hotelId, roomType, {
      price: parseInt(roomForm.price) || 100,
      available: parseInt(roomForm.available) || 1,
      maxGuests: parseInt(roomForm.maxGuests) || 2
    });
    setShowEditRoom(null);
    setRoomForm({ type: '', price: '', available: '', maxGuests: '' });
    toast.success('Room updated successfully!');
  };

  const handleDeleteRoom = (hotelId, roomType) => {
    deleteRoom(hotelId, roomType);
    toast.success('Room deleted successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <FaHotel className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Hotelify</span>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                Owner
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Hotels', value: stats.hotels, icon: FaHotel, color: 'bg-blue-500' },
            { label: 'Total Rooms', value: stats.rooms, icon: HiOutlineUserGroup, color: 'bg-purple-500' },
            { label: 'Est. Monthly Revenue', value: formatCurrency(stats.revenue), icon: HiOutlineCurrencyDollar, color: 'bg-green-500' },
            { label: 'Average Rating', value: stats.rating || 'N/A', icon: HiOutlineStar, color: 'bg-amber-500' },
            { label: 'Total Bookings', value: stats.bookings, icon: HiOutlineChartBar, color: 'bg-rose-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-2xl shadow-sm"
            >
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'My Hotels', icon: FaHotel },
            { id: 'analytics', label: 'Analytics', icon: HiOutlineChartBar },
            { id: 'settings', label: 'Settings', icon: HiOutlinePencil }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hotels List */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {ownerHotels.length > 0 ? (
              ownerHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <AnimatePresence>
                    {editingHotel === hotel.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b bg-gray-50"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Edit Hotel</h3>
                            <button
                              onClick={() => setEditingHotel(null)}
                              className="p-2 hover:bg-gray-200 rounded-lg"
                            >
                              <HiOutlineXMark className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={hotelForm.name}
                              onChange={(e) => setHotelForm({...hotelForm, name: e.target.value})}
                              placeholder="Hotel Name"
                              className="px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="text"
                              value={hotelForm.city}
                              onChange={(e) => setHotelForm({...hotelForm, city: e.target.value})}
                              placeholder="City"
                              className="px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="text"
                              value={hotelForm.province}
                              onChange={(e) => setHotelForm({...hotelForm, province: e.target.value})}
                              placeholder="Province/State"
                              className="px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="text"
                              value={hotelForm.country}
                              onChange={(e) => setHotelForm({...hotelForm, country: e.target.value})}
                              placeholder="Country"
                              className="px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="text"
                              value={hotelForm.location}
                              onChange={(e) => setHotelForm({...hotelForm, location: e.target.value})}
                              placeholder="Address"
                              className="px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="number"
                              value={hotelForm.price}
                              onChange={(e) => setHotelForm({...hotelForm, price: e.target.value})}
                              placeholder="Starting Price"
                              className="px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="tel"
                              value={hotelForm.phone}
                              onChange={(e) => setHotelForm({...hotelForm, phone: e.target.value})}
                              placeholder="Phone"
                              className="px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="email"
                              value={hotelForm.email}
                              onChange={(e) => setHotelForm({...hotelForm, email: e.target.value})}
                              placeholder="Email"
                              className="px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <textarea
                            value={hotelForm.description}
                            onChange={(e) => setHotelForm({...hotelForm, description: e.target.value})}
                            placeholder="Description"
                            rows={3}
                            className="w-full mt-4 px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500"
                          />
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={handleSaveHotel}
                              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center gap-2"
                            >
                              <HiOutlineCheck className="w-4 h-4" />
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingHotel(null)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {showDeleteConfirm === hotel.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b bg-red-50"
                      >
                        <div className="p-6 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-red-900">Delete Hotel?</h3>
                            <p className="text-red-600">Are you sure you want to delete {hotel.name}? This action cannot be undone.</p>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleDeleteHotel(hotel.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                            <p className="text-gray-500 flex items-center gap-1 mt-1">
                              <HiOutlineMapPin className="w-4 h-4" />
                              {hotel.city}, {hotel.province}, {hotel.country}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditHotel(hotel)}
                              className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"
                            >
                              <HiOutlinePencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(hotel.id)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <HiOutlineStar className="w-4 h-4 text-amber-500" />
                            <span className="font-medium">{hotel.rating || 'New'}</span>
                            <span className="text-gray-500">({hotel.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiOutlineCurrencyDollar className="w-4 h-4 text-green-500" />
                            <span className="font-medium">${hotel.price}</span>
                            <span className="text-gray-500">/night starting</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {hotel.amenities.slice(0, 5).map(am => (
                            <span key={am} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                              {am}
                            </span>
                          ))}
                        </div>

                        {/* Rooms Section */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">Rooms ({hotel.rooms.length})</h4>
                            <button
                              onClick={() => setShowAddRoom(hotel.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600"
                            >
                              <HiOutlinePlus className="w-4 h-4" />
                              Add Room
                            </button>
                          </div>
                          
                          {showAddRoom === hotel.id && (
                            <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <input
                                  type="text"
                                  value={roomForm.type}
                                  onChange={(e) => setRoomForm({...roomForm, type: e.target.value})}
                                  placeholder="Room Type"
                                  className="px-3 py-2 border rounded-lg"
                                />
                                <input
                                  type="number"
                                  value={roomForm.price}
                                  onChange={(e) => setRoomForm({...roomForm, price: e.target.value})}
                                  placeholder="Price"
                                  className="px-3 py-2 border rounded-lg"
                                />
                                <input
                                  type="number"
                                  value={roomForm.available}
                                  onChange={(e) => setRoomForm({...roomForm, available: e.target.value})}
                                  placeholder="Available"
                                  className="px-3 py-2 border rounded-lg"
                                />
                                <input
                                  type="number"
                                  value={roomForm.maxGuests}
                                  onChange={(e) => setRoomForm({...roomForm, maxGuests: e.target.value})}
                                  placeholder="Max Guests"
                                  className="px-3 py-2 border rounded-lg"
                                />
                              </div>
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() => handleAddRoom(hotel.id)}
                                  className="px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600"
                                >
                                  Add
                                </button>
                                <button
                                  onClick={() => setShowAddRoom(null)}
                                  className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            {hotel.rooms.map((room, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                  <p className="font-medium text-gray-900">{room.type}</p>
                                  <p className="text-sm text-gray-500">
                                    ${room.price}/night · {room.available} available · up to {room.maxGuests} guests
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setShowEditRoom(`${hotel.id}-${room.type}`);
                                      setRoomForm({
                                        type: room.type,
                                        price: room.price,
                                        available: room.available,
                                        maxGuests: room.maxGuests
                                      });
                                    }}
                                    className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg"
                                  >
                                    <HiOutlinePencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRoom(hotel.id, room.type)}
                                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg"
                                  >
                                    <HiOutlineTrash className="w-4 h-4" />
                                  </button>
                                </div>
                                
                                {showEditRoom === `${hotel.id}-${room.type}` && (
                                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                                      <h3 className="text-lg font-semibold mb-4">Edit {room.type}</h3>
                                      <div className="space-y-3">
                                        <input
                                          type="number"
                                          value={roomForm.price}
                                          onChange={(e) => setRoomForm({...roomForm, price: e.target.value})}
                                          placeholder="Price"
                                          className="w-full px-4 py-3 border rounded-xl"
                                        />
                                        <input
                                          type="number"
                                          value={roomForm.available}
                                          onChange={(e) => setRoomForm({...roomForm, available: e.target.value})}
                                          placeholder="Available"
                                          className="w-full px-4 py-3 border rounded-xl"
                                        />
                                        <input
                                          type="number"
                                          value={roomForm.maxGuests}
                                          onChange={(e) => setRoomForm({...roomForm, maxGuests: e.target.value})}
                                          placeholder="Max Guests"
                                          className="w-full px-4 py-3 border rounded-xl"
                                        />
                                      </div>
                                      <div className="flex gap-3 mt-4">
                                        <button
                                          onClick={() => handleUpdateRoom(hotel.id, room.type)}
                                          className="flex-1 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => setShowEditRoom(null)}
                                          className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaHotel className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Hotels Yet</h3>
                <p className="text-gray-600 mb-6">Start by registering your first hotel</p>
                <Link 
                  to="/signup" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  <HiOutlinePlus className="w-5 h-5" />
                  Register Hotel
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlineChartBar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Coming Soon</h3>
            <p className="text-gray-600">Detailed analytics and insights will be available here.</p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={user.phone || ''}
                  disabled
                  className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;