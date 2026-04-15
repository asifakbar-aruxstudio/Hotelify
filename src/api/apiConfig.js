const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ApiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  
  getHeaders: () => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  handleResponse: async (response) => {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
  },

  handleError: (error) => {
    console.error('API Error:', error);
    throw error;
  },
};

export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${ApiConfig.baseURL}${endpoint}`, {
      method: 'GET',
      headers: ApiConfig.getHeaders(),
    });
    return await ApiConfig.handleResponse(response);
  } catch (error) {
    ApiConfig.handleError(error);
  }
};

export const apiPost = async (endpoint, data) => {
  try {
    const response = await fetch(`${ApiConfig.baseURL}${endpoint}`, {
      method: 'POST',
      headers: ApiConfig.getHeaders(),
      body: JSON.stringify(data),
    });
    return await ApiConfig.handleResponse(response);
  } catch (error) {
    ApiConfig.handleError(error);
  }
};

export const apiPut = async (endpoint, data) => {
  try {
    const response = await fetch(`${ApiConfig.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: ApiConfig.getHeaders(),
      body: JSON.stringify(data),
    });
    return await ApiConfig.handleResponse(response);
  } catch (error) {
    ApiConfig.handleError(error);
  }
};

export const apiDelete = async (endpoint) => {
  try {
    const response = await fetch(`${ApiConfig.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: ApiConfig.getHeaders(),
    });
    return await ApiConfig.handleResponse(response);
  } catch (error) {
    ApiConfig.handleError(error);
  }
};

export default ApiConfig;
