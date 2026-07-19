import apiClient from './apiClient';

export const authService = {
  /**
   * Login user with email/username and password
   */
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Register new plant account
   */
  async register(userData) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Get current authenticated user profile
   */
  async getMe() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Seed demo plant accounts
   */
  async seedDemoAccounts() {
    const response = await apiClient.post('/auth/seed');
    return response.data;
  },
};
