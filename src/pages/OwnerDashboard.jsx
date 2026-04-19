import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { hotelsAPI, bookingsAPI, roomsAPI } from '../api';
import toast from 'react-hot-toast';
import { 
  HomeIcon, BuildingOffice2Icon, CalendarDaysIcon, 
  CurrencyDollarIcon, PlusIcon, PencilIcon, 
  TrashIcon, EyeIcon, ArrowsUpDownIcon,
  ChartBarIcon, UserGroupIcon, StarIcon
} from '@heroicons/react/24/outline';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('hotels');
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: '', description: '', price: '', city: '', country: '',
    amenities: [], image: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'owner' && user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (import.meta.env.VITE_USE_API === 'true') {
        const [hotelsData, bookingsData] = await Promise.all([
          hotelsAPI.getMyHotels(),
          bookingsAPI.getAllBookings()
        ]);
        setHotels(hotelsData.hotels || []);
        setBookings(bookingsData.bookings || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const hotelData = {
        name: newHotel.name,
        description: newHotel.description,
        price: Number(newHotel.price),
        location: { city: newHotel.city, country: newHotel.country },
        images: [newHotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
        amenities: newHotel.amenities,
        contact: { email: user?.email, phone: user?.phone }
      };
      
      if (import.meta.env.VITE_USE_API === 'true') {
        await hotelsAPI.createHotel(hotelData);
        toast.success('Hotel added successfully!');
        setShowAddHotel(false);
        loadData();
      }
      
      setNewHotel({ name: '', description: '', price: '', city: '', country: '', amenities: [], image: '' });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;
    
    try {
      if (import.meta.env.VITE_USE_API === 'true') {
        await hotelsAPI.deleteHotel(hotelId);
        toast.success('Hotel deleted!');
        loadData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const stats = {
    totalHotels: hotels.length,
    totalBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: bookings
      .filter(b => b.paymentStatus === 'completed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    pendingBookings: bookings.filter(b => b.status === 'pending').length
  };

  const tabs = [
    { id: 'hotels', label: 'My Hotels', icon: BuildingOffice2Icon },
    { id: 'bookings', label: 'Bookings', icon: CalendarDaysIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon }
  ];

  const amenitiesList = ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Room Service', 'Parking', 'Concierge'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your hotels and bookings</p>
        </div>

        {user && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
                <p className="opacity-90">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <BuildingOffice2Icon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Hotels</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalHotels}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <ArrowsUpDownIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
              <div className="ml-auto px-4 py-3">
                <button
                  onClick={() => setShowAddHotel(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Hotel
                </button>
              </div>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              </div>
            ) : activeTab === 'hotels' && (
              <div className="space-y-4">
                {hotels.length === 0 ? (
                  <div className="text-center py-12">
                    <BuildingOffice2Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No hotels yet. Add your first hotel to get started!</p>
                  </div>
                ) : (
                  hotels.map((hotel) => (
                    <div key={hotel._id || hotel.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={hotel.images?.[0] || hotel.image || 'https://via.placeholder.com/150'}
                        alt={hotel.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
                        <p className="text-sm text-gray-500">{hotel.location?.city}, {hotel.location?.country}</p>
                        <p className="text-sm text-emerald-600 font-medium">${hotel.price}/night</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-emerald-600 transition">
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteHotel(hotel._id || hotel.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No bookings yet</p>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking._id || booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {booking.hotel?.name || 'Hotel Booking'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">Guest: {booking.guestDetails?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${booking.totalPrice}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Analytics coming soon</p>
              </div>
            )}
          </div>
        </div>

        {showAddHotel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Hotel</h2>
              <form onSubmit={handleAddHotel} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                  <input
                    type="text"
                    value={newHotel.name}
                    onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newHotel.description}
                    onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={newHotel.city}
                      onChange={(e) => setNewHotel({ ...newHotel, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={newHotel.country}
                      onChange={(e) => setNewHotel({ ...newHotel, country: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per night ($)</label>
                  <input
                    type="number"
                    value={newHotel.price}
                    onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newHotel.image}
                    onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddHotel(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Add Hotel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;