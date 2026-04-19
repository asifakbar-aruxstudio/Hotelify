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

  getFeaturedHotels: async () => {
    return await apiGet('/hotels/featured');
  },

  getMyHotels: async () => {
    return await apiGet('/hotels/my-hotels');
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
};

export const roomsAPI = {
  getRoomsByHotel: async (hotelId) => {
    return await apiGet(`/rooms/hotel/${hotelId}`);
  },

  getRoomById: async (id) => {
    return await apiGet(`/rooms/${id}`);
  },

  checkAvailability: async (roomId, checkIn, checkOut) => {
    return await apiGet(`/rooms/availability/${roomId}?checkIn=${checkIn}&checkOut=${checkOut}`);
  },

  createRoom: async (hotelId, roomData) => {
    return await apiPost(`/rooms/hotel/${hotelId}`, roomData);
  },

  updateRoom: async (id, roomData) => {
    return await apiPut(`/rooms/${id}`, roomData);
  },

  deleteRoom: async (id) => {
    return await apiDelete(`/rooms/${id}`);
  },
};

export default hotelsAPI;