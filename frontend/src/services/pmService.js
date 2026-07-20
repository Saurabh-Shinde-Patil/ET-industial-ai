import apiClient from './apiClient';

export const pmService = {
  /**
   * Fetch PM Recommendations
   */
  async getPMRecommendations(params = {}) {
    const response = await apiClient.get('/pm-recommendations', { params });
    return response.data;
  },

  /**
   * Trigger AI PM Risk Analysis for asset
   */
  async analyzeAssetPM(assetId) {
    const response = await apiClient.post(`/pm-recommendations/analyze/${assetId}`);
    return response.data;
  },

  /**
   * Update PM Schedule Status
   */
  async updatePMStatus(id, status) {
    const response = await apiClient.put(`/pm-recommendations/${id}/status`, { status });
    return response.data;
  },

  /**
   * Seed Initial Ground-Truth PM Schedules
   */
  async seedPMRecommendations() {
    const response = await apiClient.post('/pm-recommendations/seed');
    return response.data;
  },
};
