import { apiGet, apiPost } from './apiConfig';

export const locationsAPI = {
  getProvinces: async (search = '') => {
    const endpoint = `/locations/provinces${search ? `?search=${encodeURIComponent(search)}` : ''}`;
    return await apiGet(endpoint);
  },

  getProvinceById: async (id) => {
    return await apiGet(`/locations/provinces/${id}`);
  },

  getDistricts: async (provinceId = '', search = '') => {
    const params = new URLSearchParams();
    if (provinceId) params.append('provinceId', provinceId);
    if (search) params.append('search', search);
    const endpoint = `/locations/districts${params.toString() ? `?${params.toString()}` : ''}`;
    return await apiGet(endpoint);
  },

  getDistrictById: async (id) => {
    return await apiGet(`/locations/districts/${id}`);
  },

  getCities: async (districtId = '', search = '', type = '') => {
    const params = new URLSearchParams();
    if (districtId) params.append('districtId', districtId);
    if (search) params.append('search', search);
    if (type) params.append('type', type);
    const endpoint = `/locations/cities${params.toString() ? `?${params.toString()}` : ''}`;
    return await apiGet(endpoint);
  },

  getCityById: async (id) => {
    return await apiGet(`/locations/cities/${id}`);
  },

  createOrFind: async (data) => {
    return await apiPost('/locations/create-or-find', data);
  },

  searchAll: async (query) => {
    return await apiPost('/locations/search-all', { query });
  },
};

export default locationsAPI;