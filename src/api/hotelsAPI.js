import { apiGet, apiPost, apiPut, apiDelete } from './apiConfig';

export const hotelsAPI = {
  getAllHotels: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/hotels${queryString ? `?${queryString}` : ''}`;
    return await apiGet(endpoint);
  },

  getHotelById: async (id) => {
    return await apiGet(`/hotels/${id}`);
  },

  getHotelBySlug: async (slug) => {
    return await apiGet(`/hotels/slug/${slug}`);
  },

  searchHotels: async (searchParams) => {
    return await apiPost('/hotels/search', searchParams);
  },

  getFeaturedHotels: async () => {
    return await apiGet('/hotels/featured');
  },

  getHotelsByCity: async (city) => {
    return await apiGet(`/hotels/city/${city}`);
  },

  getHotelRooms: async (hotelId) => {
    return await apiGet(`/hotels/${hotelId}/rooms`);
  },

  createHotel: async (hotelData) => {
    return await apiPost('/hotels', hotelData);
  },

  updateHotel: async (id, hotelData) => {
    return await apiPut(`/hotels/${id}`, hotelData);
  },

  deleteHotel: async (id) => {
    return await apiDelete(`/hotels/${id}`);
  },

  uploadHotelImages: async (hotelId, images) => {
    const formData = new FormData();
    images.forEach(image => {
      formData.append('images', image);
    });
    
    const response = await fetch(`${ApiConfig.baseURL}/hotels/${hotelId}/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    return await response.json();
  },

  getHotelAmenities: async () => {
    return await apiGet('/hotels/amenities');
  },

  getHotelReviews: async (hotelId) => {
    return await apiGet(`/hotels/${hotelId}/reviews`);
  },

  addHotelReview: async (hotelId, reviewData) => {
    return await apiPost(`/hotels/${hotelId}/reviews`, reviewData);
  },
};

export const roomsAPI = {
  getAllRooms: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/rooms${queryString ? `?${queryString}` : ''}`;
    return await apiGet(endpoint);
  },

  getRoomById: async (id) => {
    return await apiGet(`/rooms/${id}`);
  },

  getAvailableRooms: async (checkIn, checkOut, guests) => {
    return await apiGet(`/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  },

  createRoom: async (hotelId, roomData) => {
    return await apiPost(`/hotels/${hotelId}/rooms`, roomData);
  },

  updateRoom: async (hotelId, roomId, roomData) => {
    return await apiPut(`/hotels/${hotelId}/rooms/${roomId}`, roomData);
  },

  deleteRoom: async (hotelId, roomId) => {
    return await apiDelete(`/hotels/${hotelId}/rooms/${roomId}`);
  },

  updateRoomAvailability: async (hotelId, roomId, availability) => {
    return await apiPut(`/hotels/${hotelId}/rooms/${roomId}/availability`, { available: availability });
  },
};

export default hotelsAPI;
