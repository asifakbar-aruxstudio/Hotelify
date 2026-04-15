import { apiGet, apiPost } from './apiConfig';

export const authAPI = {
  login: async (email, password) => {
    const data = await apiPost('/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  register: async (userData) => {
    const data = await apiPost('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const data = await apiGet('/auth/me');
    return data.user;
  },

  updateProfile: async (userData) => {
    const data = await apiPut('/auth/profile', userData);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  changePassword: async (currentPassword, newPassword) => {
    return await apiPost('/auth/change-password', { currentPassword, newPassword });
  },

  forgotPassword: async (email) => {
    return await apiPost('/auth/forgot-password', { email });
  },

  resetPassword: async (token, newPassword) => {
    return await apiPost('/auth/reset-password', { token, newPassword });
  },
};

export default authAPI;
