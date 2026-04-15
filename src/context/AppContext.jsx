import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, hotelsAPI, bookingsAPI } from '../api';

const USE_API = import.meta.env.VITE_USE_API === 'true';

const initialHotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    city: 'New York',
    province: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    ],
    description: 'Experience luxury at its finest in the heart of Manhattan. Our 5-star hotel offers world-class amenities, stunning city views, and impeccable service.',
    price: 450,
    rating: 4.8,
    reviews: 324,
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Room Service', 'Parking', 'Concierge'],
    rooms: [
      { type: 'Deluxe King', price: 450, available: 5, maxGuests: 2 },
      { type: 'Executive Suite', price: 750, available: 3, maxGuests: 4 },
      { type: 'Presidential Suite', price: 1500, available: 1, maxGuests: 6 }
    ],
    location: 'Manhattan, New York',
    phone: '+1-212-555-0100',
    email: 'reservations@grandplaza.com',
    featured: true
  },
  {
    id: 2,
    name: 'Seaside Paradise Resort',
    city: 'Miami',
    province: 'Florida',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a308379f?w=800&q=80'
    ],
    description: 'Wake up to breathtaking ocean views at our beachfront paradise. Enjoy pristine beaches, infinity pools, and world-class dining.',
    price: 380,
    rating: 4.9,
    reviews: 512,
    amenities: ['WiFi', 'Beach Access', 'Pool', 'Spa', 'Water Sports', 'Restaurant', 'Bar', 'Kids Club'],
    rooms: [
      { type: 'Ocean View Room', price: 380, available: 8, maxGuests: 2 },
      { type: 'Beach Villa', price: 650, available: 4, maxGuests: 4 },
      { type: 'Royal Beach Suite', price: 1200, available: 2, maxGuests: 6 }
    ],
    location: 'Miami Beach, Florida',
    phone: '+1-305-555-0200',
    email: 'bookings@seasideparadise.com',
    featured: true
  },
  {
    id: 3,
    name: 'The Ritz-Carlton Dubai',
    city: 'Dubai',
    province: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    ],
    description: 'Indulge in unparalleled luxury at our iconic Dubai hotel. Experience opulent suites, private beach, and breathtaking views of the Arabian Gulf.',
    price: 850,
    rating: 4.9,
    reviews: 728,
    amenities: ['WiFi', 'Private Beach', 'Infinity Pool', 'Luxury Spa', 'Helipad', 'Fine Dining', 'Butler Service', 'Business Center'],
    rooms: [
      { type: 'Deluxe Room', price: 850, available: 10, maxGuests: 2 },
      { type: 'Club Suite', price: 1400, available: 5, maxGuests: 3 },
      { type: 'Royal Suite', price: 3500, available: 1, maxGuests: 8 }
    ],
    location: 'JBR Walk, Dubai',
    phone: '+971-4-555-0300',
    email: 'reservations@ritzdubai.com',
    featured: true
  },
  {
    id: 4,
    name: 'Tokyo Grand Hyatt',
    city: 'Tokyo',
    province: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    ],
    description: 'Discover the perfect blend of Japanese tradition and modern luxury. Located in the heart of Shinjuku with stunning city views.',
    price: 520,
    rating: 4.7,
    reviews: 456,
    amenities: ['WiFi', 'Onsen', 'Fitness Center', 'Multiple Restaurants', 'Tea Lounge', 'Business Center', 'Concierge'],
    rooms: [
      { type: 'Standard Room', price: 520, available: 12, maxGuests: 2 },
      { type: ' Tatami Suite', price: 900, available: 4, maxGuests: 4 },
      { type: 'Imperial Suite', price: 1800, available: 1, maxGuests: 4 }
    ],
    location: 'Shinjuku, Tokyo',
    phone: '+81-3-5555-0400',
    email: 'stay@tokyogrand.com',
    featured: true
  },
  {
    id: 5,
    name: 'Parisian Elegance',
    city: 'Paris',
    province: 'Île-de-France',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    ],
    description: 'Experience classic French sophistication steps from the Eiffel Tower. Our boutique hotel offers timeless elegance and exceptional service.',
    price: 620,
    rating: 4.8,
    reviews: 389,
    amenities: ['WiFi', 'Rooftop Terrace', 'Fine Dining', 'Wine Cellar', 'Spa', 'Concierge', 'Limousine Service'],
    rooms: [
      { type: 'Classic Room', price: 620, available: 6, maxGuests: 2 },
      { type: 'Chambre Suite', price: 1100, available: 3, maxGuests: 3 },
      { type: 'Suite Eiffel', price: 2200, available: 1, maxGuests: 4 }
    ],
    location: '7th Arrondissement, Paris',
    phone: '+33-1-55-55-0500',
    email: 'contact@parisianelegance.com',
    featured: true
  },
  {
    id: 6,
    name: 'Maldives Ocean Villa',
    city: 'Malé',
    province: 'Kaafu Atoll',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a308379f?w=800&q=80'
    ],
    description: 'Escape to paradise with overwater villas featuring glass floors, private infinity pools, and direct lagoon access. Ultimate luxury redefined.',
    price: 1200,
    rating: 5.0,
    reviews: 267,
    amenities: ['WiFi', 'Overwater Villa', 'Private Pool', 'Butler Service', 'Spa', 'Diving Center', 'Gourmet Dining', 'Sunset Cruises'],
    rooms: [
      { type: 'Beach Villa', price: 1200, available: 4, maxGuests: 2 },
      { type: 'Overwater Villa', price: 1800, available: 3, maxGuests: 2 },
      { type: 'Royal Residence', price: 5000, available: 1, maxGuests: 8 }
    ],
    location: 'North Malé Atoll',
    phone: '+960-555-0600',
    email: 'paradise@maldivesvilla.com',
    featured: true
  }
];

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [hotels, setHotels] = useState(() => {
    const stored = localStorage.getItem('hotels');
    return stored ? JSON.parse(stored) : initialHotels;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = async (userData) => {
    if (USE_API) {
      setLoading(true);
      try {
        const response = await authAPI.login(userData.email, userData.password);
        setUser(response.user);
        return response;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      setUser(userData);
      return userData;
    }
  };

  const logout = () => {
    if (USE_API) {
      authAPI.logout();
    }
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const fetchHotels = useCallback(async (params = {}) => {
    if (USE_API) {
      setLoading(true);
      try {
        const data = await hotelsAPI.getAllHotels(params);
        setHotels(data.hotels || data);
        return data;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const fetchHotelById = async (id) => {
    if (USE_API) {
      setLoading(true);
      try {
        return await hotelsAPI.getHotelById(id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      return hotels.find(h => h.id === parseInt(id));
    }
  };

  const addHotel = async (hotel, ownerId) => {
    if (USE_API) {
      setLoading(true);
      try {
        const newHotel = await hotelsAPI.createHotel({ ...hotel, ownerId });
        setHotels([newHotel, ...hotels]);
        return newHotel;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      const newHotel = {
        ...hotel,
        id: Date.now(),
        ownerId,
        rating: 0,
        reviews: 0,
        featured: true,
        createdAt: new Date().toISOString()
      };
      setHotels([newHotel, ...hotels]);
      return newHotel;
    }
  };

  const updateHotel = async (hotelId, updates) => {
    if (USE_API) {
      setLoading(true);
      try {
        const updated = await hotelsAPI.updateHotel(hotelId, updates);
        setHotels(hotels.map(h => h.id === hotelId ? updated : h));
        return updated;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      setHotels(hotels.map(h => 
        h.id === hotelId ? { ...h, ...updates } : h
      ));
    }
  };

  const deleteHotel = async (hotelId) => {
    if (USE_API) {
      setLoading(true);
      try {
        await hotelsAPI.deleteHotel(hotelId);
        setHotels(hotels.filter(h => h.id !== hotelId));
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      setHotels(hotels.filter(h => h.id !== hotelId));
    }
  };

  const addRoom = async (hotelId, room) => {
    const newRoom = { ...room, available: parseInt(room.available) || 1 };
    if (USE_API) {
      setLoading(true);
      try {
        const created = await hotelsAPI.createRoom(hotelId, newRoom);
        setHotels(hotels.map(h => 
          h.id === hotelId 
            ? { ...h, rooms: [...h.rooms, created] }
            : h
        ));
        return created;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      setHotels(hotels.map(h => 
        h.id === hotelId 
          ? { ...h, rooms: [...h.rooms, newRoom] }
          : h
      ));
    }
  };

  const updateRoom = async (hotelId, roomType, updates) => {
    if (USE_API) {
      setLoading(true);
      try {
        const updated = await hotelsAPI.updateRoom(hotelId, roomType, updates);
        setHotels(hotels.map(h => 
          h.id === hotelId 
            ? { 
                ...h, 
                rooms: h.rooms.map(r => 
                  r.type === roomType ? { ...r, ...updates } : r
                )
              }
            : h
        ));
        return updated;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      setHotels(hotels.map(h => 
        h.id === hotelId 
          ? { 
              ...h, 
              rooms: h.rooms.map(r => 
                r.type === roomType ? { ...r, ...updates } : r
              )
            }
          : h
      ));
    }
  };

  const deleteRoom = async (hotelId, roomType) => {
    if (USE_API) {
      setLoading(true);
      try {
        await hotelsAPI.deleteRoom(hotelId, roomType);
        setHotels(hotels.map(h => 
          h.id === hotelId 
            ? { ...h, rooms: h.rooms.filter(r => r.type !== roomType) }
            : h
        ));
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      setHotels(hotels.map(h => 
        h.id === hotelId 
          ? { ...h, rooms: h.rooms.filter(r => r.type !== roomType) }
          : h
      ));
    }
  };

  const getHotelsByOwner = (ownerId) => {
    return hotels.filter(h => h.ownerId === ownerId);
  };

  const getStats = (ownerId) => {
    const ownerHotels = hotels.filter(h => h.ownerId === ownerId);
    const totalRooms = ownerHotels.reduce((sum, h) => sum + h.rooms.length, 0);
    const totalBookings = ownerHotels.reduce((sum, h) => sum + h.reviews * 12, 0);
    const avgRating = ownerHotels.length > 0 
      ? (ownerHotels.reduce((sum, h) => sum + h.rating, 0) / ownerHotels.length).toFixed(1)
      : 0;
    const totalRevenue = ownerHotels.reduce((sum, h) => {
      return sum + h.rooms.reduce((s, r) => s + (r.price * r.available * 30), 0);
    }, 0);
    
    return {
      hotels: ownerHotels.length,
      rooms: totalRooms,
      bookings: totalBookings,
      rating: avgRating,
      revenue: totalRevenue
    };
  };

  const [bookings, setBookings] = useState(() => {
    const stored = localStorage.getItem('bookings');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = async (bookingData) => {
    if (USE_API) {
      setLoading(true);
      try {
        const newBooking = await bookingsAPI.createBooking(bookingData);
        setBookings([newBooking, ...bookings]);
        return newBooking;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      const newBooking = {
        ...bookingData,
        id: Date.now(),
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      setBookings([newBooking, ...bookings]);
      return newBooking;
    }
  };

  const getBookingsByCustomer = (customerId) => {
    return bookings.filter(b => b.customerId === customerId);
  };

  const getCustomerStats = (customerId) => {
    const customerBookings = bookings.filter(b => b.customerId === customerId);
    const totalBookings = customerBookings.length;
    const totalSpent = customerBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const upcoming = customerBookings.filter(b => 
      new Date(b.checkIn) >= new Date() && b.status === 'confirmed'
    ).length;
    const completed = customerBookings.filter(b => 
      new Date(b.checkOut) < new Date() || b.status === 'completed'
    ).length;
    
    return {
      totalBookings,
      totalSpent,
      upcoming,
      completed
    };
  };

  const cancelBooking = async (bookingId) => {
    if (USE_API) {
      setLoading(true);
      try {
        await bookingsAPI.cancelBooking(bookingId);
        setBookings(bookings.map(b => 
          b.id === bookingId ? { ...b, status: 'cancelled' } : b
        ));
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
    }
  };

  const contextValue = { 
    navigate, 
    user, 
    setUser: login, 
    logout,
    hotels, 
    setHotels,
    addHotel,
    updateHotel,
    deleteHotel,
    addRoom,
    updateRoom,
    deleteRoom,
    getHotelsByOwner,
    getStats,
    bookings,
    createBooking,
    getBookingsByCustomer,
    getCustomerStats,
    cancelBooking,
    loading,
    error,
    fetchHotels,
    fetchHotelById
  };
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
