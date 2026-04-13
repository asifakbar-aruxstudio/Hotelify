import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { 
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineHomeModern,
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineCheck
} from 'react-icons/hi2';
import { FaHotel, FaBuildingColumns, FaWhatsapp } from 'react-icons/fa6';

const SignUp = () => {
  const navigate = useNavigate();
  const { addHotel, setUser } = useContext(AppContext);
  const [isHotelOwner, setIsHotelOwner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [hotelData, setHotelData] = useState({
    name: '',
    city: '',
    province: '',
    country: '',
    description: '',
    price: '',
    location: '',
    phone: '',
    email: '',
    amenities: [],
    rooms: []
  });

  const amenitiesList = [
    'WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Room Service', 
    'Parking', 'Concierge', 'Beach Access', 'Bar', 'Business Center'
  ];

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleHotelChange = (field, value) => {
    setHotelData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity) => {
    setHotelData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const ownerId = Date.now();
      const user = {
        id: ownerId,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        isHotelOwner,
        createdAt: new Date().toISOString()
      };

      if (isHotelOwner && hotelData.name) {
        const newHotel = {
          name: hotelData.name,
          city: hotelData.city,
          province: hotelData.province,
          country: hotelData.country,
          location: hotelData.location || `${hotelData.city}, ${hotelData.province}`,
          description: hotelData.description || `Welcome to ${hotelData.name}, a luxury hotel in ${hotelData.city}.`,
          price: parseInt(hotelData.price) || 200,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
          images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
          ],
          amenities: hotelData.amenities.length > 0 
            ? hotelData.amenities 
            : ['WiFi', 'Pool', 'Restaurant', 'Parking'],
          rooms: [
            { type: 'Standard Room', price: parseInt(hotelData.price) || 200, available: 10, maxGuests: 2 },
            { type: 'Deluxe Room', price: (parseInt(hotelData.price) || 200) + 100, available: 5, maxGuests: 2 },
            { type: 'Suite', price: (parseInt(hotelData.price) || 200) + 300, available: 3, maxGuests: 4 }
          ],
          phone: hotelData.phone || userData.phone,
          email: hotelData.email || userData.email,
        };
        addHotel(ownerId, newHotel);
        setUser(user);
        toast.success('Hotel registered successfully!');
        navigate('/owner/dashboard');
      } else {
        setUser(user);
        toast.success('Account created successfully!');
        navigate('/hotels');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {isHotelOwner ? 'Register Your Hotel' : 'Create Account'}
          </h1>
          <p className="text-gray-400">
            {isHotelOwner 
              ? 'List your hotel and reach millions of travelers' 
              : 'Join Hotelify and start booking luxury stays'
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsHotelOwner(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                !isHotelOwner 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <HiOutlineUser className="w-5 h-5 inline-block mr-2" />
              I'm a Guest
            </button>
            <button
              onClick={() => setIsHotelOwner(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                isHotelOwner 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <HiOutlineHomeModern className="w-5 h-5 inline-block mr-2" />
              Hotel Owner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Fields (Required for everyone) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (WhatsApp)</label>
              <div className="relative">
                <FaWhatsapp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={userData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Hotel Owner Fields */}
            {isHotelOwner && (
              <>
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaHotel className="w-5 h-5 text-emerald-500" />
                    Hotel Details
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                  <div className="relative">
                    <HiOutlineHomeModern className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={hotelData.name}
                      onChange={(e) => handleHotelChange('name', e.target.value)}
                      placeholder="Grand Plaza Hotel"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <div className="relative">
                      <HiOutlineMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={hotelData.city}
                        onChange={(e) => handleHotelChange('city', e.target.value)}
                        placeholder="New York"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <div className="relative">
                      <FaBuildingColumns className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={hotelData.province}
                        onChange={(e) => handleHotelChange('province', e.target.value)}
                        placeholder="New York"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    value={hotelData.country}
                    onChange={(e) => handleHotelChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select Country</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="Japan">Japan</option>
                    <option value="France">France</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price ($/night)</label>
                  <div className="relative">
                    <HiOutlineCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={hotelData.price}
                      onChange={(e) => handleHotelChange('price', e.target.value)}
                      placeholder="200"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map(amenity => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                          hotelData.amenities.includes(amenity)
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={hotelData.description}
                    onChange={(e) => handleHotelChange('description', e.target.value)}
                    placeholder="Tell guests about your hotel..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <HiOutlineCheck className="w-5 h-5" />
                  {isHotelOwner ? 'Register Hotel' : 'Create Account'}
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;