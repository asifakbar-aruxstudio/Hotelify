import { apiGet, apiPost, apiPut } from './apiConfig';

export const bookingsAPI = {
  getAllBookings: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/bookings${queryString ? `?${queryString}` : ''}`;
    return await apiGet(endpoint);
  },

  getBookingById: async (id) => {
    return await apiGet(`/bookings/${id}`);
  },

  createBooking: async (bookingData) => {
    return await apiPost('/bookings', bookingData);
  },

  cancelBooking: async (id, reason) => {
    return await apiPut(`/bookings/${id}/cancel`, { cancellationReason: reason });
  },

  confirmBooking: async (id) => {
    return await apiPut(`/bookings/${id}/confirm`, {});
  },
};

export const paymentsAPI = {
  getPayments: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/payments${queryString ? `?${queryString}` : ''}`;
    return await apiGet(endpoint);
  },

  getPaymentById: async (id) => {
    return await apiGet(`/payments/${id}`);
  },

  processPayment: async (bookingId, paymentData) => {
    return await apiPost(`/payments/${bookingId}`, paymentData);
  },

  refundPayment: async (id) => {
    return await apiPost(`/payments/${id}/refund`, {});
  },
};

export const adminAPI = {
  getDashboard: async () => {
    return await apiGet('/admin/dashboard');
  },

  getUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/users${queryString ? `?${queryString}` : ''}`;
    return await apiGet(endpoint);
  },

  updateUserStatus: async (id, isActive) => {
    return await apiPut(`/admin/users/${id}/status`, { isActive });
  },

  deleteUser: async (id) => {
    return await apiDelete(`/admin/users/${id}`);
  },

  getPendingHotels: async () => {
    return await apiGet('/admin/hotels/pending');
  },

  approveHotel: async (id) => {
    return await apiPut(`/admin/hotels/${id}/approve`, {});
  },

  rejectHotel: async (id, reason) => {
    return await apiPut(`/admin/hotels/${id}/reject`, { reason });
  },

  getAllBookings: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/bookings${queryString ? `?${queryString}` : ''}`;
    return await apiGet(endpoint);
  },

  getAnalytics: async () => {
    return await apiGet('/admin/analytics');
  },
};

export default bookingsAPI;