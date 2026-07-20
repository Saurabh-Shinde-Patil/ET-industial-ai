import apiClient from './apiClient';

export const userService = {
  /**
   * Get list of users with search, role, page filters
   */
  async getUsers(params = {}) {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  /**
   * Create new user account (Admin)
   */
  async createUser(userData) {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  /**
   * Update role for existing user
   */
  async updateUserRole(id, role) {
    const response = await apiClient.put(`/users/${id}/role`, { role });
    return response.data;
  },

  /**
   * Toggle active/deactive status for user
   */
  async toggleUserStatus(id) {
    const response = await apiClient.put(`/users/${id}/status`);
    return response.data;
  },

  /**
   * Fetch security audit trail logs
   */
  async getAuditLogs(params = {}) {
    const response = await apiClient.get('/audit-logs', { params });
    return response.data;
  },
};
