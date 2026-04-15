import { apiGet, apiPost, apiPut, apiDelete } from './apiConfig';

export const bookingsAPI = {
  getAllBookings: async () => {
    return await apiGet('/bookings');
  },

  getBookingById: async (id) => {
    return await apiGet(`/bookings/${id}`);
  },

  getMyBookings: async () => {
    return await apiGet('/bookings/my-bookings');
  },

  getUpcomingBookings: async () => {
    return await apiGet('/bookings/upcoming');
  },

  getPastBookings: async () => {
    return await apiGet('/bookings/past');
  },

  createBooking: async (bookingData) => {
    return await apiPost('/bookings', bookingData);
  },

  updateBooking: async (id, bookingData) => {
    return await apiPut(`/bookings/${id}`, bookingData);
  },

  cancelBooking: async (id) => {
    return await apiPost(`/bookings/${id}/cancel`);
  },

  confirmBooking: async (id) => {
    return await apiPost(`/bookings/${id}/confirm`);
  },

  checkIn: async (id) => {
    return await apiPost(`/bookings/${id}/check-in`);
  },

  checkOut: async (id) => {
    return await apiPost(`/bookings/${id}/check-out`);
  },

  getBookingByReference: async (reference) => {
    return await apiGet(`/bookings/reference/${reference}`);
  },

  getHotelBookings: async (hotelId) => {
    return await apiGet(`/bookings/hotel/${hotelId}`);
  },

  getOwnerBookings: async () => {
    return await apiGet('/bookings/owner');
  },

  getBookingStats: async () => {
    return await apiGet('/bookings/stats');
  },

  addPayment: async (bookingId, paymentData) => {
    return await apiPost(`/bookings/${bookingId}/payment`, paymentData);
  },

  getInvoice: async (bookingId) => {
    return await apiGet(`/bookings/${bookingId}/invoice`);
  },
};

export default bookingsAPI;
