import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { adminAPI, bookingsAPI } from '../api';
import toast from 'react-hot-toast';
import { 
  UsersIcon, BuildingOffice2Icon, CurrencyDollarIcon,
  ChartBarIcon, CheckCircleIcon, XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (import.meta.env.VITE_USE_API === 'true') {
        const [dashboardData, usersData, hotelsData, bookingsData] = await Promise.all([
          adminAPI.getDashboard(),
          adminAPI.getUsers(),
          adminAPI.getPendingHotels(),
          adminAPI.getAllBookings()
        ]);
        setStats(dashboardData.stats);
        setUsers(usersData.users || []);
        setHotels(hotelsData.hotels || []);
        setBookings(bookingsData.bookings || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatus = async (userId, isActive) => {
    try {
      if (import.meta.env.VITE_USE_API === 'true') {
        await adminAPI.updateUserStatus(userId, isActive);
        toast.success(`User ${isActive ? 'activated' : 'deactivated'}`);
        loadData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleApproveHotel = async (hotelId) => {
    try {
      if (import.meta.env.VITE_USE_API === 'true') {
        await adminAPI.approveHotel(hotelId);
        toast.success('Hotel approved!');
        loadData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRejectHotel = async (hotelId) => {
    try {
      if (import.meta.env.VITE_USE_API === 'true') {
        await adminAPI.rejectHotel(hotelId, 'Does not meet requirements');
        toast.success('Hotel rejected');
        loadData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'hotels', label: 'Hotels', icon: BuildingOffice2Icon },
    { id: 'bookings', label: 'Bookings', icon: CurrencyDollarIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System management and analytics</p>
        </div>

        {user && (
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
                <p className="opacity-90">Administrator</p>
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

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && stats && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <UsersIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        <BuildingOffice2Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Hotels</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.hotels}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">${stats.revenue?.toLocaleString() || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <ChartBarIcon className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pending Hotels</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.pendingHotels}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {stats.recentBookings?.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">No bookings yet</div>
                    ) : (
                      stats.recentBookings?.map((booking) => (
                        <div key={booking._id} className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-gray-900">{booking.user?.name}</p>
                            <p className="text-sm text-gray-500">{booking.hotel?.name}</p>
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
                </div>
              </>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {users.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No users found</div>
                  ) : (
                    users.map((u) => (
                      <div key={u._id} className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium text-gray-900">{u.name}</p>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            u.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {u.role}
                          </span>
                          <button
                            onClick={() => handleUserStatus(u._id, !u.isActive)}
                            className={`p-2 rounded-lg transition ${
                              u.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {u.isActive ? <XCircleIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Pending Hotel Approvals</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {hotels.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No pending hotels</div>
                  ) : (
                    hotels.map((hotel) => (
                      <div key={hotel._id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={hotel.images?.[0] || 'https://via.placeholder.com/100'}
                            alt={hotel.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{hotel.name}</p>
                            <p className="text-sm text-gray-500">{hotel.location?.city}, {hotel.location?.country}</p>
                            <p className="text-sm text-gray-400">Owner: {hotel.owner?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveHotel(hotel._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleRejectHotel(hotel._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <XCircleIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">All Bookings</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {bookings.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No bookings found</div>
                  ) : (
                    bookings.map((booking) => (
                      <div key={booking._id} className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium text-gray-900">{booking.user?.name}</p>
                          <p className="text-sm text-gray-500">{booking.hotel?.name}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </p>
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
              </div>
            )}
          </>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
          <div className="border-b border-gray-100">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;