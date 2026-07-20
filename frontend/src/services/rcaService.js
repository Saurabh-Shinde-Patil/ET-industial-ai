import apiClient from './apiClient';

export const rcaService = {
  /**
   * Fetch incident RCA reports
   */
  async getIncidents(params = {}) {
    const response = await apiClient.get('/incidents', { params });
    return response.data;
  },

  /**
   * Log new incident
   */
  async createIncident(data) {
    const response = await apiClient.post('/incidents', data);
    return response.data;
  },

  /**
   * Trigger AI 5-Whys Root Cause Generation
   */
  async generateAI5Whys(id) {
    const response = await apiClient.post(`/incidents/${id}/generate-rca`);
    return response.data;
  },

  /**
   * Update Incident Status
   */
  async updateIncidentStatus(id, status) {
    const response = await apiClient.put(`/incidents/${id}/status`, { status });
    return response.data;
  },

  /**
   * Seed Initial Ground-Truth Incident RCAs
   */
  async seedIncidents() {
    const response = await apiClient.post('/incidents/seed');
    return response.data;
  },
};
